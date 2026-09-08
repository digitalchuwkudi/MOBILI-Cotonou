import { useLanguage } from './LanguageContext';
import { useRouter, Link } from './Router';
import { ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { buildWhatsAppLink } from '../services/whatsappService';
import { trackEvent } from '../services/analytics';

export const Hero = () => {
  const { language, t } = useLanguage();
  const { navigate } = useRouter();

  const waLink = buildWhatsAppLink(
    language === 'en'
      ? 'Hello Mobili Cotonou, I am looking for a furnished apartment stay. Can you guide me?'
      : 'Bonjour Mobili Cotonou, je recherche un appartement meublé. Pouvez-vous m’accompagner ?'
  );

  const handleCTAClick = () => {
    trackEvent('Find Apartment click', { source: 'Hero' });
  };

  return (
    <section className="relative overflow-hidden bg-[#102A43] text-white py-24 lg:py-32">
      {/* Visual background pattern/overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=50"
          alt="Premium luxury interior backdrop"
          className="w-full h-full object-cover filter blur-xs"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/90 to-[#102A43]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Verified Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-[#C6922E]/40 text-xs font-semibold tracking-wide text-[#C6922E]">
              <ShieldCheck className="w-4 h-4 text-[#C6922E]" />
              <span>{t('heroBadge')}</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF9F6] leading-[1.1] animate-fade-in">
              {t('heroTitle')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              {t('heroSubtitle')}
            </p>

            {/* Stay Categories Badges */}
            <div className="text-xs sm:text-sm font-semibold tracking-wide text-[#C6922E] flex flex-wrap gap-2 pt-2">
              {t('heroCategories').split(' · ').map((cat, idx) => (
                <span key={idx} className="bg-white/5 px-3 py-1 rounded-md border border-white/10">
                  {cat}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/apartments"
                onClick={handleCTAClick}
                className="px-8 py-4 bg-[#C6922E] hover:bg-[#FAF9F6] text-[#102A43] font-bold rounded-xl text-sm tracking-wide uppercase shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                <span>{t('findApartment')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('WhatsApp click', { source: 'Hero' })}
                className="px-8 py-4 bg-white hover:bg-[#C6922E] text-[#102A43] font-bold rounded-xl text-sm tracking-wide border border-transparent hover:border-[#C6922E] transition-all duration-300 text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg uppercase"
              >
                <span>{t('chatOnWhatsApp')}</span>
                <Phone className="w-4 h-4 text-[#143D2A] shrink-0" />
              </a>
            </div>

          </div>

          {/* Right Column: Premium Hero Image */}
          <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Mobili Cotonou luxury residential architecture"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Visual gradient overlay inside the image frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
            
            {/* Premium caption badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg">
              <p className="text-xs font-bold text-white leading-relaxed">
                {language === 'en' 
                  ? 'All units hand-audited with active generator back-up complexes & clean water.' 
                  : 'Chaque bien est certifié avec groupe électrogène & filtration d’eau.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
