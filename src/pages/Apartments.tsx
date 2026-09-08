import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useRouter } from '../components/Router';
import { ApartmentRepository } from '../services/apartmentRepository';
import { ApartmentCard } from '../components/ApartmentCard';
import { EmptyState } from '../components/EmptyState';
import { SearchBar } from '../components/SearchBar';
import { MapPin, Calendar, Users, SlidersHorizontal, ArrowUpDown, Shield, CheckCircle } from 'lucide-react';
import { SearchFilters, Apartment } from '../types';
import { trackEvent } from '../services/analytics';

export const Apartments = () => {
  const { language, t } = useLanguage();
  const { queryParams, search, navigate } = useRouter();

  // Primary filtering states
  const [location, setLocation] = useState('all');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState('any');
  const [apartmentType, setApartmentType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(0); // 0 means no limit
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const stayType = 'all';

  // Sorting
  const [sortBy, setSortBy] = useState('recommended');

  // Sync URL query params with state
  useEffect(() => {
    setLocation(queryParams.location || 'all');
    setCheckIn(queryParams.checkIn || '');
    setCheckOut(queryParams.checkOut || '');
    setGuests(parseInt(queryParams.guests, 10) || 1);
    setBedrooms(queryParams.bedrooms || 'any');
    setApartmentType(queryParams.apartmentType || 'all');
    setMaxPrice(parseInt(queryParams.maxPrice, 10) || 0);
    if (queryParams.amenities) {
      setSelectedAmenities(queryParams.amenities.split(','));
    } else {
      setSelectedAmenities([]);
    }
  }, [search]);

  // Handle live filters and matching
  const filters: Partial<SearchFilters> = {
    location,
    checkIn,
    checkOut,
    guests,
    bedrooms,
    apartmentType,
    maxPrice,
    stayType,
    amenities: selectedAmenities
  };

  let apartments = ApartmentRepository.getApartments(filters);

  // Apply sorting
  if (sortBy === 'price-low-high') {
    apartments.sort((a, b) => a.nightlyPrice - b.nightlyPrice);
  } else if (sortBy === 'price-high-low') {
    apartments.sort((a, b) => b.nightlyPrice - a.nightlyPrice);
  } else if (sortBy === 'newest') {
    apartments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === 'featured') {
    apartments.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  const handleResetFilters = () => {
    setLocation('all');
    setCheckIn('');
    setCheckOut('');
    setGuests(1);
    setBedrooms('any');
    setApartmentType('all');
    setMaxPrice(0);
    setSelectedAmenities([]);
    setSortBy('recommended');
    
    // Reset URL
    navigate('/apartments', { scroll: false });
    trackEvent('Filters reset');
  };

  const toggleAmenity = (amenity: string) => {
    let next: string[];
    if (selectedAmenities.includes(amenity)) {
      next = selectedAmenities.filter(item => item !== amenity);
    } else {
      next = [...selectedAmenities, amenity];
    }
    setSelectedAmenities(next);

    // Sync to URL
    const params = new URLSearchParams(window.location.search);
    if (next.length > 0) {
      params.set('amenities', next.join(','));
    } else {
      params.delete('amenities');
    }
    navigate(`/apartments?${params.toString()}`, { scroll: false });
  };

  const amenitiesList = [
    { key: 'wifi', label: 'Wi-Fi' },
    { key: 'ac', label: language === 'en' ? 'Air Conditioning' : 'Climatisation' },
    { key: 'generator', label: language === 'en' ? 'Backup Generator' : 'Groupe de Secours' },
    { key: 'security', label: language === 'en' ? '24/7 Security' : 'Sécurité' },
    { key: 'pool', label: language === 'en' ? 'Swimming Pool' : 'Piscine' },
    { key: 'parking', label: language === 'en' ? 'Secure Parking' : 'Parking Privé' },
    { key: 'kitchen', label: language === 'en' ? 'Kitchen' : 'Cuisine Équipée' },
    { key: 'washer', label: language === 'en' ? 'Washing Machine' : 'Lave-Linge' },
    { key: 'desk', label: language === 'en' ? 'Dedicated Desk' : 'Espace de Bureau' }
  ];

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocation(value);
    const params = new URLSearchParams(window.location.search);
    if (value !== 'all' && value !== '') {
      params.set('location', value);
    } else {
      params.delete('location');
    }
    navigate(`/apartments?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
      
      {/* Intro Header */}
      <div className="border-b border-[#EDE7DC]/60 pb-6">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6922E] block mb-2">
          {t('descriptor')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight mb-2">
          {t('navStays')}
        </h1>
        <p className="text-sm text-[#172033]/60 max-w-2xl">
          {language === 'en'
            ? 'Browse premium furnished apartments for short stays, extended stays, business trips and vacations across Cotonou.'
            : 'Découvrez nos appartements meublés de standing pour courts séjours, longs séjours, séjours professionnels ou vacances à Cotonou.'}
        </p>
      </div>

      {/* Primary Search bar on top for quick date adjustments */}
      <div className="bg-[#FAF9F6] p-4 rounded-3xl border border-[#EDE7DC]/40">
        <SearchBar compact={true} />
      </div>

      {/* Grid Layout (Filters side bar + Results panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl border border-[#EDE7DC]/60 shadow-xs h-fit sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-gold">
          
          <div className="flex items-center justify-between border-b border-[#EDE7DC]/60 pb-4">
            <h2 className="font-serif text-lg font-bold text-[#102A43] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#C6922E]" />
              <span>{t('filtersTitle')}</span>
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-[10px] uppercase font-bold tracking-widest text-[#C6922E] hover:underline"
            >
              {language === 'en' ? 'Reset All' : 'Tout effacer'}
            </button>
          </div>

          {/* Location filter */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-[#102A43]/60 uppercase tracking-wider">
              {t('fieldLocation')}
            </label>
            <select
              value={location}
              onChange={handleLocationChange}
              className="w-full bg-[#FAF9F6] border border-[#EDE7DC]/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
            >
              <option value="all">{t('anyLocation')}</option>
              <option value="haie-vive">Haie Vive</option>
              <option value="fidjrosse">Fidjrossè</option>
              <option value="cadjehoun">Cadjèhoun</option>
              <option value="agla">Agla</option>
              <option value="akpakpa">Akpakpa</option>
              <option value="vodje">Vodjè</option>
            </select>
          </div>

          {/* Apartment Type */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-[#102A43]/60 uppercase tracking-wider">
              {t('fieldApartmentType')}
            </label>
            <select
              value={apartmentType}
              onChange={(e) => {
                setApartmentType(e.target.value);
                const params = new URLSearchParams(window.location.search);
                if (e.target.value !== 'all') params.set('apartmentType', e.target.value);
                else params.delete('apartmentType');
                navigate(`/apartments?${params.toString()}`, { scroll: false });
              }}
              className="w-full bg-[#FAF9F6] border border-[#EDE7DC]/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
            >
              <option value="all">{t('anyType')}</option>
              <option value="apartment">{language === 'en' ? 'Apartment' : 'Appartement'}</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>

          {/* Bedrooms count */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-[#102A43]/60 uppercase tracking-wider">
              {t('fieldBedrooms')}
            </label>
            <select
              value={bedrooms}
              onChange={(e) => {
                setBedrooms(e.target.value);
                const params = new URLSearchParams(window.location.search);
                if (e.target.value !== 'any') params.set('bedrooms', e.target.value);
                else params.delete('bedrooms');
                navigate(`/apartments?${params.toString()}`, { scroll: false });
              }}
              className="w-full bg-[#FAF9F6] border border-[#EDE7DC]/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
            >
              <option value="any">{t('anyBedrooms')}</option>
              <option value="1">1 {language === 'en' ? 'Bedroom' : 'Chambre'}</option>
              <option value="2">2 {language === 'en' ? 'Bedrooms' : 'Chambres'}</option>
              <option value="3+">3+ {language === 'en' ? 'Bedrooms' : 'Chambres'}</option>
            </select>
          </div>

          {/* Nightly price ceiling range */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-[#102A43]/60 uppercase tracking-wider flex items-center justify-between">
              <span>{language === 'en' ? 'Max Budget' : 'Budget Max'}</span>
              <span className="text-[#C6922E]">
                {maxPrice > 0 
                  ? `${new Intl.NumberFormat().format(maxPrice)} FCFA` 
                  : (language === 'en' ? 'No limit' : 'Illimité')}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="150000"
              step="5000"
              value={maxPrice}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setMaxPrice(val);
                const params = new URLSearchParams(window.location.search);
                if (val > 0) params.set('maxPrice', val.toString());
                else params.delete('maxPrice');
                navigate(`/apartments?${params.toString()}`, { scroll: false });
              }}
              className="w-full h-1 bg-[#EDE7DC] rounded-lg appearance-none cursor-pointer accent-[#C6922E]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold">
              <span>0 FCFA</span>
              <span>150,000 FCFA</span>
            </div>
          </div>

          {/* Amenities checklist */}
          <div className="flex flex-col space-y-2 pt-2 border-t border-[#EDE7DC]/40">
            <label className="text-xs font-bold text-[#102A43]/60 uppercase tracking-wider mb-2">
              {language === 'en' ? 'Amenities' : 'Équipements'}
            </label>
            <div className="space-y-2">
              {amenitiesList.map((item) => (
                <label key={item.key} className="flex items-center gap-2.5 text-xs text-[#172033]/85 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(item.key)}
                    onChange={() => toggleAmenity(item.key)}
                    className="w-4 h-4 rounded-md border-gray-300 text-[#C6922E] focus:ring-[#C6922E] accent-[#C6922E]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* Results Panel */}
        <main className="lg:col-span-3 space-y-8">
          
          {/* Sorting & Stats block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EDE7DC]/60 pb-4 gap-4">
            <div className="text-sm font-semibold text-[#102A43]">
              {language === 'en'
                ? t('apartmentAvailableCount', { count: apartments.length.toString() })
                : t('apartmentAvailableCount', { count: apartments.length.toString() })}
            </div>

            {/* Sorting trigger */}
            <div className="flex items-center gap-2 text-xs">
              <label className="font-bold text-[#102A43]/60 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#C6922E]" />
                <span>{t('sortByLabel')}</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#EDE7DC] rounded-lg px-3 py-1.5 font-semibold text-[#102A43] focus:outline-none"
              >
                <option value="recommended">{t('sortRecommended')}</option>
                <option value="price-low-high">{t('sortPriceLowHigh')}</option>
                <option value="price-high-low">{t('sortPriceHighLow')}</option>
                <option value="newest">{t('sortNewest')}</option>
                <option value="featured">{t('sortFeatured')}</option>
              </select>
            </div>
          </div>

          {/* Grid list or empty status */}
          {apartments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {apartments.map((apt) => (
                <ApartmentCard key={apt.id} apartment={apt} />
              ))}
            </div>
          ) : (
            <EmptyState type="apartments" onResetFilters={handleResetFilters} />
          )}

        </main>

      </div>
    </div>
  );
};
