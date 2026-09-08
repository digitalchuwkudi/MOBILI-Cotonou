import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useRouter, Link } from '../components/Router';
import { ApartmentRepository } from '../services/apartmentRepository';
import { ApartmentCard } from '../components/ApartmentCard';
import { EmptyState } from '../components/EmptyState';
import { ChevronLeft, MapPin } from 'lucide-react';

export const LocationDetail = ({ routeParams }: { routeParams?: Record<string, string> }) => {
  const { language, t } = useLanguage();
  const slug = routeParams?.slug || '';

  // Simple mapping of slug to exact neighborhood string
  const slugMap: Record<string, { name: string; desc: string; image: string }> = {
    'haie-vive': {
      name: 'Haie Vive',
      desc: language === 'en'
        ? 'Haie Vive is Cotonou’s premium commercial and diplomatic heart. Renowned for its unparalleled security, clean avenues, and vibrant, upscale atmosphere with cafés, retail shops, and international embassies.'
        : 'La Haie Vive est le cœur diplomatique, résidentiel et gastronomique de Cotonou. Réputé pour sa sécurité, ses rues pavées agréables et son atmosphère internationale haut de gamme.',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=50'
    },
    'fidjrossè': {
      name: 'Fidjrossè',
      desc: language === 'en'
        ? 'Fidjrossè blends vibrant coastal relaxation with modern residential growth. Boasting a beautiful sandy shoreline, breezy palm-fringed pathways, and seaside restaurants, it is perfect for digital nomads and vacation stays.'
        : 'Fidjrossè offre un cadre de vie balnéaire unique à Cotonou. Entre la plage de sable fin, ses restaurants côtiers de poisson braisé et ses résidences modernes, c’est le quartier privilégié des vacanciers.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=50'
    },
    'cadjèhoun': {
      name: 'Cadjèhoun',
      desc: language === 'en'
        ? 'Cadjèhoun is a secure, central, and prestigious district near the international airport. Known for hosting executive ministries and corporate head offices, it provides prime professional convenience.'
        : 'Cadjèhoun est un quartier hautement sécurisé, central et prestigieux abritant l’aéroport de Cotonou, plusieurs ministères et des sièges sociaux d’entreprises d’envergure.',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=50'
    },
    'agla': {
      name: 'Agla',
      desc: language === 'en'
        ? 'Agla is a rapid-growth, authentic residential sector offering vibrant local life, great convenience, and spacious modern layouts.'
        : 'Agla est une zone résidentielle conviviale et animée, idéale pour s’immerger dans la vie authentique de Cotonou tout en bénéficiant de logements neufs spacieux.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=50'
    },
    'akpakpa': {
      name: 'Akpakpa',
      desc: language === 'en'
        ? 'Akpakpa serves as the eastern gateway of Cotonou. Positioned near the lagune and port, it provides excellent accessibility for logistics and industrial operations.'
        : 'Akpakpa constitue la principale porte d’entrée Est de la ville. Proche de la lagune et de la zone portuaire, c’est un quartier stratégique très dynamique.',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=50'
    },
    'vodjè': {
      name: 'Vodjè',
      desc: language === 'en'
        ? 'Vodjè is a highly accessible, central crossroads. Ideal for quick commutes to Cadjèhoun and commercial core hubs.'
        : 'Vodjè est un carrefour central stratégique et très accessible de Cotonou, facilitant les trajets vers les sièges d’affaires et Cadjèhoun.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=50'
    }
  };

  const neighborhood = slugMap[slug.toLowerCase()] || {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    desc: language === 'en' ? 'Boutique stay opportunities in Cotonou.' : 'Découvrez nos appartements meublés dans ce quartier.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=50'
  };

  // Filter apartments by resolved neighborhood name
  const apartments = ApartmentRepository.getApartmentsByNeighborhood(neighborhood.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12 animate-fade-in">
      
      {/* Back button */}
      <Link
        to="/locations"
        className="text-xs uppercase font-extrabold tracking-widest text-[#102A43] hover:text-[#C6922E] flex items-center gap-1.5 transition-colors self-start"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>{t('exploreOtherLocations')}</span>
      </Link>

      {/* Hero Banner card for neighborhood */}
      <div className="bg-[#102A43] text-white rounded-3xl overflow-hidden relative border border-[#C6922E]/30 min-h-[300px] flex flex-col justify-end p-8 sm:p-12">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={neighborhood.image}
            alt={neighborhood.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/70 to-[#102A43]/40 z-0"></div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-[#C6922E] font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Cotonou, Benin</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF9F6]">
            {neighborhood.name}
          </h1>
          <p className="text-sm text-white/80 leading-relaxed">
            {neighborhood.desc}
          </p>
        </div>
      </div>

      {/* Catalog listing */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#102A43] border-b border-[#EDE7DC]/40 pb-2">
          {language === 'en' ? `Certified Stays in ${neighborhood.name}` : `Séjours certifiés à ${neighborhood.name}`}
        </h2>

        {apartments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apt) => (
              <ApartmentCard key={apt.id} apartment={apt} />
            ))}
          </div>
        ) : (
          <EmptyState type="location" />
        )}
      </div>

    </div>
  );
};
