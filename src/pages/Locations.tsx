import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useRouter, Link } from '../components/Router';
import { ApartmentRepository } from '../services/apartmentRepository';
import { MapPin, ArrowRight } from 'lucide-react';
import { trackEvent } from '../services/analytics';

export const Locations = () => {
  const { language, t } = useLanguage();

  const neighborhoods = [
    {
      name: 'Haie Vive',
      slug: 'haie-vive',
      desc: language === 'en' 
        ? 'The ultimate high-end culinary and business hub of Cotonou. Loaded with international cafés, fine-dining restaurants, boutiques, and embassies.' 
        : 'Le quartier résidentiel et commercial le plus huppé de Cotonou. Bordé de cafés branchés, de restaurants gastronomiques, de boutiques et d’ambassades.',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=50',
    },
    {
      name: 'Fidjrossè',
      slug: 'fidjrossè',
      desc: language === 'en'
        ? 'Scenic coastal breeze and beachside lifestyle. Perfect for leisure travelers, vacation stays, surf spots, and lively seaside evening bars.'
        : 'Bercé par la brise marine et le long de la plage. Idéal pour les vacanciers, amateurs de détente, de surf, de bars de plage animés et d’ambiance côtière.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=50',
    },
    {
      name: 'Cadjèhoun',
      slug: 'cadjèhoun',
      desc: language === 'en'
        ? 'Central, historic and extremely secure. Home to ministries, government assets, corporate HQs and Cotonou international airport.'
        : 'Central, historique et hautement sécurisé. Proche des ministères, des sièges d’entreprises et de l’aéroport international de Cotonou.',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=50',
    },
    {
      name: 'Agla',
      slug: 'agla',
      desc: language === 'en'
        ? 'Charming, vibrant local atmosphere. Fast-growing residential area offering authentic local life with modern properties.'
        : 'Ambiance locale chaleureuse et dynamique. Zone résidentielle en pleine expansion offrant une vie de quartier authentique et des biens modernes.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=50',
    },
    {
      name: 'Akpakpa',
      slug: 'akpakpa',
      desc: language === 'en'
        ? 'Strategic eastern gateway of the city. Industrial roots transition into modern waterside residences close to the port.'
        : 'Porte d’entrée Est de Cotonou. Une zone dynamique mêlant commodités urbaines et résidences récentes à proximité de la lagune et du port.',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=50',
    },
    {
      name: 'Vodjè',
      slug: 'vodjè',
      desc: language === 'en'
        ? 'Accessible, central and balanced. Excellent road connections and practical access to both Cadjèhoun and downtown business centers.'
        : 'Accessible, central et équilibré. Excellente connexion routière et accès pratique à Cadjèhoun et aux quartiers d’affaires du centre.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=50',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12 animate-fade-in">
      
      {/* Page Header */}
      <div className="border-b border-[#EDE7DC]/60 pb-6 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6922E] block mb-2">
          {t('navLocations')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight mb-3">
          {language === 'en' ? 'Boutique Neighborhoods of Cotonou' : 'Les Quartiers Clés de Cotonou'}
        </h1>
        <p className="text-sm text-[#172033]/60">
          {language === 'en'
            ? 'We personally curate properties in Cotonou’s safest, most connected and sought-after neighborhoods to guarantee top security and comfort.'
            : 'Nous sélectionnons avec soin nos résidences dans les zones les plus sûres, connectées et agréables de Cotonou.'}
        </p>
      </div>

      {/* Grid of Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {neighborhoods.map((loc) => {
          const count = ApartmentRepository.getApartmentsByNeighborhood(loc.name).length;
          return (
            <div 
              key={loc.name} 
              className="bg-white rounded-2xl border border-[#EDE7DC]/60 overflow-hidden shadow-xs hover:shadow-md hover:border-[#C6922E]/30 transition-all duration-300 flex flex-col group h-full"
            >
              <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                <img
                  src={loc.image}
                  alt={loc.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#102A43] text-[#FAF9F6] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10">
                  {count} {count === 1 ? (language === 'en' ? 'Stay' : 'Séjour') : (language === 'en' ? 'Stays' : 'Séjours')}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-serif text-xl font-bold text-[#102A43] group-hover:text-[#C6922E] transition-colors mb-2.5">
                  {loc.name}
                </h2>
                <p className="text-xs text-[#172033]/60 leading-relaxed mb-6 flex-grow">
                  {loc.desc}
                </p>

                <Link
                  to={`/locations/${loc.slug}`}
                  onClick={() => trackEvent('Location clicked', { name: loc.name })}
                  className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#102A43] hover:text-[#C6922E] transition-colors group-hover:underline"
                >
                  <span>{language === 'en' ? 'Browse Apartments' : 'Voir les appartements'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C6922E]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
