import React from 'react';
import { Apartment } from '../types';
import { useLanguage } from './LanguageContext';
import { Link } from './Router';
import { VerificationBadge } from './VerificationBadge';
import { Users, Bed, ShieldAlert, Award, Bath, ArrowRight } from 'lucide-react';
import { trackEvent } from '../services/analytics';

interface ApartmentCardProps {
  apartment: Apartment;
  key?: string | number;
}

export const ApartmentCard = ({ apartment }: ApartmentCardProps) => {
  const { language, formatPrice, t } = useLanguage();

  const titleText = apartment.title[language] || apartment.title['en'];
  const typeText = apartment.apartmentType.charAt(0).toUpperCase() + apartment.apartmentType.slice(1);
  const detailUrl = `/apartments/${apartment.slug}`;

  const hasGenerator = apartment.amenities.includes('generator');
  const hasFiber = apartment.amenities.includes('wifi');

  const handleViewDetails = () => {
    trackEvent('Apartment view', { id: apartment.id, title: titleText, slug: apartment.slug });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDE7DC]/60 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full relative">
      
      {/* Media Cover */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={apartment.coverImage}
          alt={apartment.imageAltText[language] || apartment.imageAltText['en']}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loops
            e.currentTarget.src = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80";
          }}
        />
        
        {/* Verification Tag Top Left */}
        {apartment.verificationStatus === 'verified' && (
          <div className="absolute top-4 left-4 z-10">
            <VerificationBadge status="verified" showLabel={true} />
          </div>
        )}

        {/* Premium Badges: Generator and Fiber Overlay */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 items-end">
          {hasGenerator && (
            <span className="bg-[#143D2A] text-[#FAF9F6] border border-[#C6922E]/40 px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
              ⚡ {language === 'en' ? '24/7 Power' : 'Élec 24h/24'}
            </span>
          )}
          {hasFiber && (
            <span className="bg-[#102A43] text-[#FAF9F6] border border-[#C6922E]/40 px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
              🌐 {language === 'en' ? 'Fiber WiFi' : 'Fibre Optique'}
            </span>
          )}
        </div>

        {/* Starting price tag bottom-right */}
        <div className="absolute bottom-4 right-4 bg-[#102A43] text-[#FAF9F6] px-3.5 py-1.5 rounded-xl border border-[#C6922E]/30 font-semibold text-sm shadow-md">
          <span className="text-[#C6922E] font-medium text-xs mr-1">{t('startingAt')}</span>
          {formatPrice(apartment.nightlyPrice)}
          <span className="text-white/60 text-xs font-normal"> {t('perNight')}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Neighborhood & Type info */}
        <div className="flex items-center justify-between text-xs font-bold tracking-wider uppercase text-white/40 mb-2">
          <span className="text-[#C6922E] bg-[#EDE7DC]/40 px-2.5 py-1 rounded-md">{apartment.neighborhood}</span>
          <span className="text-white bg-[#102A43]/70 px-2.5 py-1 rounded-md">{typeText}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-[#102A43] leading-snug mb-3 hover:text-[#C6922E] transition-colors">
          <Link to={detailUrl} onClick={handleViewDetails}>
            {titleText}
          </Link>
        </h3>

        {/* Key Details (Guests, Bedrooms, Beds) */}
        <div className="flex items-center gap-4 text-xs font-medium text-[#172033]/60 mb-4 border-y border-[#EDE7DC]/40 py-2.5">
          <div className="flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>
              {apartment.bedrooms} {apartment.bedrooms > 1 ? (language === 'en' ? 'Bedrooms' : 'Chambres') : (language === 'en' ? 'Bedroom' : 'Chambre')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>
              {apartment.maxGuests} {apartment.maxGuests > 1 ? (language === 'en' ? 'Guests' : 'Voyageurs') : (language === 'en' ? 'Guest' : 'Voyageur')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>
              {apartment.bathrooms} {apartment.bathrooms > 1 ? 'Baths' : 'Bath'}
            </span>
          </div>
        </div>

        {/* Featured Amenities pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {apartment.amenities.slice(0, 4).map((amenity) => {
            const label = amenity === 'wifi' ? 'Wi-Fi' 
                        : amenity === 'ac' ? 'AC' 
                        : amenity === 'generator' ? (language === 'en' ? 'Generator' : 'Groupe élec') 
                        : amenity === 'security' ? (language === 'en' ? '24/7 Security' : 'Sécurité') 
                        : amenity === 'pool' ? (language === 'en' ? 'Pool' : 'Piscine') 
                        : amenity;
            return (
              <span key={amenity} className="text-[10px] uppercase font-bold tracking-wider text-[#102A43]/70 bg-[#FAF9F6] border border-[#EDE7DC]/80 px-2 py-0.5 rounded-md">
                {label}
              </span>
            );
          })}
        </div>

        {/* View Details button */}
        <div className="mt-auto pt-3 border-t border-[#EDE7DC]/30 flex items-center justify-between group-hover:text-[#C6922E] transition-colors">
          <span className="text-xs font-bold uppercase tracking-wider text-[#102A43] group-hover:text-[#C6922E] transition-colors flex items-center gap-1">
            {t('viewApartment')}
          </span>
          <div className="w-8 h-8 rounded-full bg-[#FAF9F6] group-hover:bg-[#C6922E] group-hover:text-white flex items-center justify-center text-[#102A43] transition-all duration-300">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>
      
      {/* Route click tracker link */}
      <Link 
        to={detailUrl} 
        onClick={handleViewDetails}
        className="absolute inset-0 z-0 pointer-events-auto cursor-pointer"
        aria-label={titleText}
        style={{ content: '""' }}
      />
    </div>
  );
};
