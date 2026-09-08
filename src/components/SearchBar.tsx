import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { useRouter } from './Router';
import { MapPin, Calendar, Bed } from 'lucide-react';
import { trackEvent } from '../services/analytics';

interface SearchBarProps {
  compact?: boolean;
}

export const SearchBar = ({ compact = false }: SearchBarProps) => {
  const { language, t } = useLanguage();
  const { queryParams, search, navigate } = useRouter();

  // Initialize from URL parameters if present, or defaults
  const [location, setLocation] = useState('all');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [bedrooms, setBedrooms] = useState('any');

  // Sync state with URL params
  useEffect(() => {
    setLocation(queryParams.location || 'all');
    setCheckIn(queryParams.checkIn || '');
    setCheckOut(queryParams.checkOut || '');
    setBedrooms(queryParams.bedrooms || 'any');
  }, [search]);

  const neighborhoods = [
    { value: 'all', label: language === 'en' ? 'All Locations' : 'Tous les quartiers' },
    { value: 'haie-vive', label: 'Haie Vive' },
    { value: 'fidjrosse', label: 'Fidjrossè' },
    { value: 'cadjehoun', label: 'Cadjèhoun' },
    { value: 'agla', label: 'Agla' },
    { value: 'akpakpa', label: 'Akpakpa' },
    { value: 'vodje', label: 'Vodjè' }
  ];

  // Live synchronizer of search fields to URL parameters
  const updateUrlParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== 'any') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    navigate(`/apartments?${params.toString()}`, { scroll: false });
  };

  const handleLocationChange = (val: string) => {
    setLocation(val);
    updateUrlParams({ location: val });
  };

  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    updateUrlParams({ checkIn: val });
  };

  const handleCheckOutChange = (val: string) => {
    setCheckOut(val);
    updateUrlParams({ checkOut: val });
  };

  const handleBedroomsChange = (val: string) => {
    setBedrooms(val);
    updateUrlParams({ bedrooms: val });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('Search', { location, checkIn, checkOut, bedrooms });
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`bg-white rounded-2xl sm:rounded-3xl border border-[#EDE7DC] shadow-lg ${
        compact ? 'p-4 gap-4' : 'p-6 sm:p-8 gap-6'
      } flex flex-col w-full max-w-5xl mx-auto`}
    >
      {!compact && (
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#102A43] text-center mb-1">
          {t('searchHeading')}
        </h2>
      )}

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        
        {/* Location Dropdown */}
        <div className="flex flex-col relative">
          <label className="text-xs font-bold text-[#102A43]/60 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>{t('fieldLocation')}</span>
          </label>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#EDE7DC]/80 rounded-xl px-4 py-3 text-sm text-[#172033] font-medium appearance-none focus:outline-none focus:border-[#C6922E] focus:ring-1 focus:ring-[#C6922E] transition-all"
            >
              {neighborhoods.map((n) => (
                <option key={n.value} value={n.value}>
                  {n.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#102A43]/60">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Check In Date */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-[#102A43]/60 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>{t('fieldCheckIn')}</span>
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => handleCheckInChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-[#FAF9F6] border border-[#EDE7DC]/80 rounded-xl px-4 py-3 text-sm text-[#172033] font-medium focus:outline-none focus:border-[#C6922E] focus:ring-1 focus:ring-[#C6922E] transition-all"
          />
        </div>

        {/* Check Out Date */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-[#102A43]/60 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>{t('fieldCheckOut')}</span>
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => handleCheckOutChange(e.target.value)}
            min={checkIn || new Date().toISOString().split('T')[0]}
            className="w-full bg-[#FAF9F6] border border-[#EDE7DC]/80 rounded-xl px-4 py-3 text-sm text-[#172033] font-medium focus:outline-none focus:border-[#C6922E] focus:ring-1 focus:ring-[#C6922E] transition-all"
          />
        </div>

        {/* Bedrooms selector */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-[#102A43]/60 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>{language === 'en' ? 'Bedrooms' : 'Chambres'}</span>
          </label>
          <div className="relative">
            <select
              value={bedrooms}
              onChange={(e) => handleBedroomsChange(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#EDE7DC]/80 rounded-xl px-4 py-3 text-sm text-[#172033] font-medium appearance-none focus:outline-none focus:border-[#C6922E] focus:ring-1 focus:ring-[#C6922E] transition-all"
            >
              <option value="any">{language === 'en' ? 'Any Bedrooms' : 'Chambres (Toutes)'}</option>
              <option value="1">1 {language === 'en' ? 'Bedroom' : 'Chambre'}</option>
              <option value="2">2 {language === 'en' ? 'Bedrooms' : 'Chambres'}</option>
              <option value="3+">3+ {language === 'en' ? 'Bedrooms' : 'Chambres'}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#102A43]/60">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
};
