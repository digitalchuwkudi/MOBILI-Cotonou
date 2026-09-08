import React, { useEffect } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useRouter, Link } from '../components/Router';
import { Hero } from '../components/Hero';
import { SearchBar } from '../components/SearchBar';
import { WhyMobili } from '../components/WhyMobili';
import { HowItWorks } from '../components/HowItWorks';
import { ApartmentCard } from '../components/ApartmentCard';
import { ApartmentRepository } from '../services/apartmentRepository';
import { MapPin, ArrowRight, ShieldCheck, Phone, CheckCircle } from 'lucide-react';
import { trackEvent } from '../services/analytics';
import { buildWhatsAppLink } from '../services/whatsappService';

import { FAQSection } from '../components/FAQSection';
import { Testimonials } from '../components/Testimonials';
import { ContactUs } from '../components/ContactUs';

export const Home = () => {
  const { language, t } = useLanguage();
  const { navigate, queryParams, search } = useRouter();

  // Scroll to FAQ if query parameter is set
  useEffect(() => {
    if (queryParams && queryParams.scrollTo === 'faq') {
      const element = document.getElementById('faq');
      if (element) {
        // Use a short timeout to ensure the DOM is fully rendered
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [search, queryParams]);

  // Load featured apartments from abstraction repository
  const featured = ApartmentRepository.getFeaturedApartments();

  const locations = [
    { name: 'Haie Vive', count: ApartmentRepository.getApartmentsByNeighborhood('Haie Vive').length, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=50', slug: 'haie-vive' },
    { name: 'Fidjrossè', count: ApartmentRepository.getApartmentsByNeighborhood('Fidjrossè').length, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=50', slug: 'fidjrossè' },
    { name: 'Cadjèhoun', count: ApartmentRepository.getApartmentsByNeighborhood('Cadjèhoun').length, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=50', slug: 'cadjèhoun' },
    { name: 'Agla', count: ApartmentRepository.getApartmentsByNeighborhood('Agla').length, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=50', slug: 'agla' },
    { name: 'Akpakpa', count: ApartmentRepository.getApartmentsByNeighborhood('Akpakpa').length, image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&q=50', slug: 'akpakpa' },
    { name: 'Vodjè', count: ApartmentRepository.getApartmentsByNeighborhood('Vodjè').length, image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=50', slug: 'vodjè' }
  ];

  const stayCategories = [
    {
      title: t('navShortStays'),
      desc: t('shortStaysDesc'),
      path: '/short-stays',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=60'
    },
    {
      title: t('navExtendedStays'),
      desc: t('extendedStaysDesc'),
      path: '/extended-stays',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=60'
    },
    {
      title: t('navBusinessStays'),
      desc: t('businessStaysDesc'),
      path: '/business-stays',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=60'
    },
    {
      title: t('navVacationStays'),
      desc: t('vacationStaysDesc'),
      path: '/vacation-stays',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=60'
    }
  ];

  const finalWaLink = buildWhatsAppLink(
    language === 'en'
      ? 'Hello Mobili Cotonou, I would like to get custom help finding an apartment in Cotonou.'
      : 'Bonjour Mobili Cotonou, j’aimerais recevoir une aide personnalisée pour trouver un appartement à Cotonou.'
  );

  return (
    <div className="space-y-20 pb-12">
      
      {/* 2. Hero */}
      <Hero />

      {/* 3. Search Bar Block */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-28 relative z-20">
        <SearchBar compact={false} />
      </div>

      {/* 4. Featured Apartments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6922E] block mb-2">
              {language === 'en' ? 'Boutique Collection' : 'La Collection Boutique'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#102A43] tracking-tight">
              {language === 'en' ? 'Featured Stays' : 'Nos Coups de Cœur'}
            </h2>
          </div>
          <Link
            to="/apartments"
            onClick={() => trackEvent('Stays page click', { source: 'Featured header' })}
            className="text-xs uppercase font-bold text-[#C6922E] hover:text-[#102A43] flex items-center gap-1 transition-colors self-start"
          >
            <span>{language === 'en' ? 'View All Apartments' : 'Voir tous les appartements'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((apt) => (
            <ApartmentCard key={apt.id} apartment={apt} />
          ))}
        </div>
      </section>

      {/* 5. Browse by Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6922E] block mb-2">
            {t('navLocations')}
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#102A43] tracking-tight">
            {t('locationsSubtitle')}
          </h2>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {locations.map((loc) => (
            <Link
              key={loc.name}
              to={`/locations/${loc.slug}`}
              onClick={() => trackEvent('Location viewed', { name: loc.name })}
              className="bg-white rounded-2xl border border-[#EDE7DC]/80 overflow-hidden shadow-xs hover:shadow-md hover:border-[#C6922E]/30 transition-all duration-300 group flex flex-col items-center p-4 text-center"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 mb-4 border-2 border-[#EDE7DC]/50 group-hover:border-[#C6922E] transition-colors duration-300">
                <img
                  src={loc.image}
                  alt={loc.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#102A43] group-hover:text-[#C6922E] transition-colors">
                {loc.name}
              </h3>
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mt-1">
                {loc.count} {loc.count === 1 ? (language === 'en' ? 'Stay' : 'Séjour') : (language === 'en' ? 'Stays' : 'Séjours')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Why Mobili */}
      <WhyMobili />

      {/* Testimonials Marquee Scroll */}
      <Testimonials />

      {/* 7. For Every Kind of Stay */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6922E] block mb-2">
            {language === 'en' ? 'Our stay types' : 'Types d’hébergement'}
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#102A43] tracking-tight">
            {language === 'en' ? 'Designed for Every Journey' : 'Conçu pour tous les types de séjours'}
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stayCategories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              onClick={() => trackEvent('Stay type viewed', { path: cat.path })}
              className="bg-white rounded-2xl border border-[#EDE7DC]/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col h-full"
            >
              <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#102A43]/10"></div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-serif text-base font-bold text-[#102A43] group-hover:text-[#C6922E] transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#172033]/60 leading-relaxed mb-4 flex-grow">
                  {cat.desc}
                </p>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C6922E] group-hover:underline flex items-center gap-1 mt-auto">
                  <span>{language === 'en' ? 'Explore Stays' : 'Explorer les séjours'}</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. How It Works */}
      <HowItWorks showCTA={false} />

      {/* 9. List Your Apartment CTA block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102A43] text-white rounded-3xl p-8 sm:p-12 border border-[#C6922E]/30 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=50"
              alt="Background pattern"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6922E] block">
              {language === 'en' ? 'List Your Property' : 'Devenir Partenaire'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF9F6] tracking-tight">
              {t('ownerTitle')}
            </h2>
            <p className="text-sm text-white/75 leading-relaxed">
              {t('ownerText')}
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full lg:w-auto text-center lg:text-right">
            <Link
              to="/list-your-apartment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C6922E] hover:bg-[#FAF9F6] text-[#102A43] font-bold rounded-xl text-xs tracking-wider uppercase transition-colors"
            >
              <span>{t('navListYourApartment')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 py-10">
        <h2 className="font-serif text-3xl font-bold text-[#102A43]">
          {language === 'en' ? 'Ready to find your furnished stay?' : 'Prêt à trouver votre appartement meublé ?'}
        </h2>
        <p className="text-sm text-[#172033]/60 max-w-md mx-auto leading-relaxed">
          {language === 'en'
            ? 'Whether you stay for days or months, enjoy premium boutique comfort in Cotonou’s finest neighborhoods.'
            : 'Que ce soit pour quelques jours ou plusieurs mois, profitez d’un hébergement meublé de standing dans les plus beaux quartiers de Cotonou.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link
            to="/apartments"
            className="px-8 py-4 bg-[#102A43] hover:bg-[#C6922E] text-white font-semibold rounded-xl text-sm uppercase tracking-wide transition-colors"
          >
            {t('findApartment')}
          </Link>
          <a
            href={finalWaLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('WhatsApp click', { source: 'Final CTA Home' })}
            className="px-8 py-4 bg-white hover:bg-[#C6922E] text-[#102A43] hover:text-white border border-[#EDE7DC] hover:border-[#C6922E] font-semibold rounded-xl text-sm uppercase tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 group"
          >
            <span className="uppercase">{t('chatOnWhatsApp')}</span>
            <Phone className="w-4 h-4 text-[#143D2A] group-hover:text-white transition-colors" />
          </a>
        </div>
      </section>

      {/* 12. Contact Us Section */}
      <ContactUs />

      {/* 11. FAQ Accordion Section */}
      <section id="faq" className="bg-white border-y border-[#EDE7DC]/60 py-20 px-4 sm:px-6 lg:px-8">
        <FAQSection showHeader={true} />
      </section>

    </div>
  );
};
