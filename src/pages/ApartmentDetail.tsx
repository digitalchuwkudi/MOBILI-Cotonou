import { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useRouter, Link } from '../components/Router';
import { ApartmentRepository } from '../services/apartmentRepository';
import { BookingRequestForm } from '../components/BookingRequestForm';
import { ErrorState } from '../components/ErrorState';
import { VerificationBadge } from '../components/VerificationBadge';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { 
  Bed, Users, Bath, Shield, Share2, MapPin, CheckCircle2, 
  HelpCircle, ChevronLeft, ChevronRight, X, Sparkles, Clock, AlertTriangle 
} from 'lucide-react';
import { trackEvent } from '../services/analytics';

export const ApartmentDetail = ({ routeParams }: { routeParams?: Record<string, string> }) => {
  const { language, formatPrice, t } = useLanguage();
  const { navigate } = useRouter();
  
  const slug = routeParams?.slug || '';
  const apartment = ApartmentRepository.getApartmentBySlug(slug);

  // Gallery slider states
  const [activeImage, setActiveImage] = useState(apartment?.coverImage || '');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Sync active cover image when apartment changes
  useEffect(() => {
    if (apartment) {
      setActiveImage(apartment.coverImage);
    }
  }, [apartment]);

  if (!apartment) {
    return <ErrorState />;
  }

  const titleText = apartment.title[language] || apartment.title['en'];
  const descText = apartment.description[language] || apartment.description['en'];
  const locationDesc = apartment.locationDescription[language] || apartment.locationDescription['en'];
  const cancelPolicy = apartment.cancellationPolicy[language] || apartment.cancellationPolicy['en'];

  // Handle Share link
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      trackEvent('Share click', { id: apartment.id, title: titleText });
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      const nextIdx = (lightboxIndex + 1) % apartment.galleryImages.length;
      setLightboxIndex(nextIdx);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      const prevIdx = (lightboxIndex - 1 + apartment.galleryImages.length) % apartment.galleryImages.length;
      setLightboxIndex(prevIdx);
    }
  };

  const amenitiesListMap: Record<string, { label: string; icon: string }> = {
    wifi: { label: 'Unlimited Wi-Fi', icon: '📶' },
    ac: { label: language === 'en' ? 'Air Conditioning' : 'Climatisation', icon: '❄️' },
    generator: { label: language === 'en' ? 'Standby Generator' : 'Groupe Électrogène', icon: '🔌' },
    security: { label: language === 'en' ? '24/7 Security Patrol' : 'Sécurité 24h/24', icon: '🛡️' },
    pool: { label: language === 'en' ? 'Private Swimming Pool' : 'Piscine Privée', icon: '🏊' },
    parking: { label: language === 'en' ? 'Secure Gated Parking' : 'Parking Sécurisé', icon: '🚗' },
    kitchen: { label: language === 'en' ? 'Fully Stocked Kitchen' : 'Cuisine Équipée', icon: '🍳' },
    tv: { label: 'Smart TV with Netflix', icon: '📺' },
    washer: { label: language === 'en' ? 'In-unit Washing Machine' : 'Machine à Laver', icon: '🧺' },
    desk: { label: language === 'en' ? 'Dedicated Workspace' : 'Bureau de Travail', icon: '💻' }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
      
      {/* Back navigation & Share action */}
      <div className="flex items-center justify-between">
        <Link
          to="/apartments"
          className="text-xs uppercase font-extrabold tracking-widest text-[#102A43] hover:text-[#C6922E] flex items-center gap-1.5 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('backToApartments')}</span>
        </Link>
        
        {/* Share Button with toast feedback */}
        <div className="relative">
          <button
            onClick={handleShare}
            className="p-3 bg-white hover:bg-[#FAF9F6] border border-[#EDE7DC] rounded-xl text-xs font-bold uppercase tracking-wider text-[#102A43] flex items-center gap-2 transition-all shadow-xs"
          >
            <Share2 className="w-4 h-4 text-[#C6922E]" />
            <span>{t('share')}</span>
          </button>
          {shareSuccess && (
            <div className="absolute top-full right-0 mt-2 bg-[#102A43] text-white text-[10px] font-bold px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap z-30">
              {t('copied')}
            </div>
          )}
        </div>
      </div>

      {/* Main Title Section */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <VerificationBadge status={apartment.verificationStatus} />
          <span className="text-xs font-bold text-[#C6922E] bg-[#EDE7DC]/50 px-3 py-1 rounded-full uppercase tracking-wider">
            {apartment.neighborhood}
          </span>
          {apartment.amenities.includes('generator') && (
            <span className="bg-[#143D2A] text-[#FAF9F6] border border-[#C6922E]/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
              ⚡ {language === 'en' ? '24/7 Power' : 'Élec 24h/24'}
            </span>
          )}
          {apartment.amenities.includes('wifi') && (
            <span className="bg-[#102A43] text-[#FAF9F6] border border-[#C6922E]/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
              🌐 {language === 'en' ? 'Fiber WiFi' : 'Fibre Optique'}
            </span>
          )}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight leading-tight">
          {titleText}
        </h1>
        <div className="flex items-center gap-1 text-xs text-white/50">
          <MapPin className="w-4 h-4 text-[#C6922E]" />
          <span>{apartment.address}</span>
        </div>
      </div>

      {/* Dynamic Image Gallery with Thumbnails & Lightbox */}
      <div className="space-y-4">
        {/* Large active stage */}
        <div 
          onClick={() => setLightboxIndex(apartment.galleryImages.indexOf(activeImage))}
          className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in relative group border border-[#EDE7DC]"
        >
          <img
            src={activeImage}
            alt={apartment.imageAltText[language] || apartment.imageAltText['en']}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors"></div>
          <div className="absolute bottom-4 left-4 bg-black/60 text-white/90 text-xs px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
            {language === 'en' ? 'Click to enlarge gallery' : 'Cliquer pour agrandir'}
          </div>
        </div>

        {/* Thumbnails rail */}
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          {apartment.galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`aspect-[3/2] w-28 sm:w-36 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                activeImage === img ? 'border-[#C6922E] scale-102 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80";
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Grid details (Features + Booking form) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Apartment features */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Quick facts row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-[#EDE7DC]/60 shadow-xs">
            <div className="flex flex-col items-center justify-center p-3 text-center border-r border-[#EDE7DC]/30 last:border-0">
              <Bed className="w-5 h-5 text-[#C6922E] mb-2" />
              <span className="text-xs font-bold text-[#102A43]">
                {apartment.bedrooms} {apartment.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 text-center border-r border-[#EDE7DC]/30 last:border-0">
              <Users className="w-5 h-5 text-[#C6922E] mb-2" />
              <span className="text-xs font-bold text-[#102A43]">
                {apartment.maxGuests} {t('guestsMax').replace(' max guests', '')}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 text-center border-r border-[#EDE7DC]/30 last:border-0">
              <Bath className="w-5 h-5 text-[#C6922E] mb-2" />
              <span className="text-xs font-bold text-[#102A43]">
                {apartment.bathrooms} {apartment.bathrooms > 1 ? 'Baths' : 'Bath'}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 text-center last:border-0">
              <Clock className="w-5 h-5 text-[#C6922E] mb-2" />
              <span className="text-xs font-bold text-[#102A43]">
                Min {apartment.minimumNights} {apartment.minimumNights > 1 ? 'Nights' : 'Night'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#102A43] border-b border-[#EDE7DC]/40 pb-2">
              {language === 'en' ? 'About this stay' : 'À propos de ce séjour'}
            </h2>
            <p className="text-sm text-[#172033]/75 leading-relaxed whitespace-pre-wrap">
              {descText}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#102A43] border-b border-[#EDE7DC]/40 pb-2">
              {language === 'en' ? 'Premium Amenities' : 'Équipements inclus'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {apartment.amenities.map((amenity) => {
                const config = amenitiesListMap[amenity] || { label: amenity, icon: '✨' };
                return (
                  <div key={amenity} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#EDE7DC]/40">
                    <span className="text-lg">{config.icon}</span>
                    <span className="text-xs font-semibold text-[#102A43]">{config.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location description */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#102A43] border-b border-[#EDE7DC]/40 pb-2">
              {language === 'en' ? 'Neighborhood Guide' : 'Guide du quartier'}
            </h2>
            <p className="text-sm text-[#172033]/75 leading-relaxed mb-4">
              {locationDesc}
            </p>
            <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#EDE7DC]/60 text-xs text-[#172033]/60 flex items-start gap-2 leading-relaxed">
              <MapPin className="w-5 h-5 text-[#C6922E] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#102A43] block mb-0.5">{t('approximateLocation')}</span>
                <span>{apartment.approximateLocation}</span>
              </div>
            </div>
          </div>

          {/* Pricing options if available (weekly or monthly discounts) */}
          {(apartment.weeklyPrice || apartment.monthlyPrice || apartment.pricingNotes) && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#102A43] border-b border-[#EDE7DC]/40 pb-2">
                {language === 'en' ? 'Extended Stay Options' : 'Tarifs dégressifs de séjour'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {apartment.weeklyPrice && (
                  <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#EDE7DC]/60 flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C6922E]">{t('perWeek')}</span>
                    <span className="font-serif text-lg font-bold text-[#102A43]">
                      {formatPrice(apartment.weeklyPrice)}
                    </span>
                  </div>
                )}
                {apartment.monthlyPrice && (
                  <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#EDE7DC]/60 flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C6922E]">{t('perMonth')}</span>
                    <span className="font-serif text-lg font-bold text-[#102A43]">
                      {formatPrice(apartment.monthlyPrice)}
                    </span>
                  </div>
                )}
              </div>
              {apartment.pricingNotes && (
                <p className="text-xs text-[#172033]/60 leading-relaxed italic bg-white p-3.5 rounded-lg border border-[#EDE7DC]/40">
                  * {apartment.pricingNotes[language] || apartment.pricingNotes['en']}
                </p>
              )}
            </div>
          )}

          {/* House Rules */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#102A43] border-b border-[#EDE7DC]/40 pb-2">
              {t('houseRules')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(apartment.houseRules[language] || apartment.houseRules['en']).map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#172033]/75 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#102A43] border-b border-[#EDE7DC]/40 pb-2">
              {t('cancellationPolicy')}
            </h2>
            <div className="flex items-start gap-2.5 p-4 bg-amber-50/50 rounded-xl border border-amber-200/50 text-xs text-amber-900 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
              <span>{cancelPolicy}</span>
            </div>
          </div>

        </div>

        {/* Right Side: Sticky Booking sidebar panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-1 scrollbar-gold">
            <BookingRequestForm apartment={apartment} />
          </div>
        </div>

      </div>

      {/* Lightbox Modal overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-[#172033]/95 z-55 flex flex-col justify-between p-4 sm:p-6 select-none animate-fade-in">
          
          {/* Header */}
          <div className="flex items-center justify-between text-white pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
              {titleText}
            </span>
            <button 
              onClick={() => setLightboxIndex(null)}
              className="p-2 hover:bg-white/10 rounded-full text-white transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image slide viewer */}
          <div className="flex-grow flex items-center justify-between relative max-w-5xl mx-auto w-full">
            <button
              onClick={prevLightbox}
              className="p-3 bg-white/5 hover:bg-white/15 rounded-full text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={apartment.galleryImages[lightboxIndex]}
              alt={`Lightbox slide ${lightboxIndex}`}
              className="max-h-[70vh] max-w-[80vw] object-contain rounded-lg border border-white/5 shadow-2xl"
              referrerPolicy="no-referrer"
            />

            <button
              onClick={nextLightbox}
              className="p-3 bg-white/5 hover:bg-white/15 rounded-full text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation indicator */}
          <div className="text-center text-white/50 text-xs py-3">
            {lightboxIndex + 1} / {apartment.galleryImages.length}
          </div>

        </div>
      )}

    </div>
  );
};
