import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useRouter } from '../components/Router';
import { ApartmentRepository } from '../services/apartmentRepository';
import { ApartmentCard } from '../components/ApartmentCard';
import { EmptyState } from '../components/EmptyState';
import { Compass, Sparkles, Briefcase, Sun, CheckCircle } from 'lucide-react';

export const StayTypePage = ({ type }: { type: 'short' | 'extended' | 'business' | 'vacation' }) => {
  const { language, t } = useLanguage();
  const { navigate } = useRouter();

  // Load relevant apartments based on tag matching
  const apartments = ApartmentRepository.getApartments({ stayType: type });

  const categoryConfigs = {
    short: {
      title: t('navShortStays'),
      subtitle: language === 'en' ? 'Boutique hospitality for days or weeks' : 'L’hospitalité haut de gamme pour quelques jours ou semaines',
      desc: language === 'en'
        ? 'Perfect for tourists, short family visits, and transient professionals. Enjoy fully furnished turnkey comfort with 24/7 power, security, and top-tier amenities.'
        : 'Idéal pour les touristes, les courtes visites familiales ou les professionnels de passage. Profitez d’un hébergement clé en main, de l’électricité garantie 24h/24 et d’un confort hôtelier.',
      icon: Sparkles,
      bannerColor: 'from-[#143D2A]/20 via-transparent'
    },
    extended: {
      title: t('navExtendedStays'),
      subtitle: language === 'en' ? 'Comfortable home-bases for months or years' : 'Votre chez-vous équipé pour plusieurs mois ou années',
      desc: language === 'en'
        ? 'Designed for expats, researchers, long-term workers, and digital nomads. Features discounted monthly structures, fully equipped kitchens, dedicated workspaces, and in-unit laundry.'
        : 'Conçu pour les expatriés, chercheurs, professionnels de longue durée et nomades digitaux. Bénéficiez de tarifs dégressifs mensuels, de cuisines tout équipées et d’espaces bureaux.',
      icon: Compass,
      bannerColor: 'from-[#C6922E]/10 via-transparent'
    },
    business: {
      title: t('navBusinessStays'),
      subtitle: language === 'en' ? 'Optimized for modern corporate travelers' : 'Optimisé pour les voyageurs d’affaires et cadres d’entreprises',
      desc: language === 'en'
        ? 'Premium executive hubs near Cadjèhoun business sectors. Offers uninterrupted high-speed Wi-Fi, dedicated workspaces, backup generators, and reliable airport commute proximity.'
        : 'Des logements de standing à proximité des centres d’affaires. Connexion Wi-Fi stable de haut débit, bureaux aménagés, groupes électrogènes et proximité avec l’aéroport.',
      icon: Briefcase,
      bannerColor: 'from-blue-500/10 via-transparent'
    },
    vacation: {
      title: t('navVacationStays'),
      subtitle: language === 'en' ? 'Beachside retreats and luxury leisure' : 'Retraites de rêve près de la plage et loisirs de standing',
      desc: language === 'en'
        ? 'Premium beachfront penthouses and villas in Fidjrossè. Features swimming pools, scenic outdoor terraces, local guide hooks, and premium lounging setups.'
        : 'Villas exclusives et penthouses d’exception face à l’océan à Fidjrossè. Profitez de piscines privées, terrasses de détente et services de conciergerie locale.',
      icon: Sun,
      bannerColor: 'from-amber-500/10 via-transparent'
    }
  };

  const config = categoryConfigs[type];
  const IconComponent = config.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12 animate-fade-in">
      
      {/* Intro Header */}
      <div className={`p-8 sm:p-12 rounded-3xl bg-gradient-to-r ${config.bannerColor} to-transparent border border-[#EDE7DC]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6`}>
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-1.5 text-xs text-[#C6922E] font-bold uppercase tracking-widest">
            <IconComponent className="w-4 h-4" />
            <span>{config.subtitle}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
            {config.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#172033]/65 leading-relaxed">
            {config.desc}
          </p>
        </div>

        {/* Certified Badge */}
        <div className="shrink-0 bg-[#FAF9F6] border border-[#EDE7DC] px-5 py-4 rounded-2xl flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-[#143D2A]/10 text-[#143D2A] flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#C6922E] block">{language === 'en' ? 'Mobili Standard' : 'Norme Mobili'}</span>
            <span className="text-xs font-bold text-[#102A43]">{language === 'en' ? '100% Verified' : '100% Vérifié'}</span>
          </div>
        </div>
      </div>

      {/* Listing results */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#102A43] border-b border-[#EDE7DC]/40 pb-2">
          {language === 'en' ? 'Available Listings' : 'Appartements Disponibles'}
        </h2>

        {apartments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apt) => (
              <ApartmentCard key={apt.id} apartment={apt} />
            ))}
          </div>
        ) : (
          <EmptyState type="apartments" onResetFilters={() => navigate('/apartments')} />
        )}
      </div>

    </div>
  );
};
export const ShortStays = () => <StayTypePage type="short" />;
export const ExtendedStays = () => <StayTypePage type="extended" />;
export const BusinessStays = () => <StayTypePage type="business" />;
export const VacationStays = () => <StayTypePage type="vacation" />;
