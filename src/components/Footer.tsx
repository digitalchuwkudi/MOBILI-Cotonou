import { useLanguage } from './LanguageContext';
import { useRouter, Link } from './Router';
import { Phone, Mail, Instagram, Facebook, ShieldCheck, Globe } from 'lucide-react';
import { WHATSAPP_CONFIG, buildWhatsAppLink } from '../services/whatsappService';
import { trackEvent } from '../services/analytics';

export const Footer = () => {
  const { language, setLanguage, t } = useLanguage();
  const { navigate } = useRouter();

  const locationsList = [
    { name: 'Haie Vive', slug: 'haie-vive', aptSlug: 'executive-penthouse-haie-vive' },
    { name: 'Fidjrossè', slug: 'fidjrosse', aptSlug: 'beachside-luxury-villa-fidjrosse' },
    { name: 'Cadjèhoun', slug: 'cadjehoun', aptSlug: 'business-executive-suite-cadjehoun' },
    { name: 'Agla', slug: 'agla', aptSlug: 'cozy-family-haven-agla' },
    { name: 'Akpakpa', slug: 'akpakpa', aptSlug: 'stylish-ocean-breeze-duplex-akpakpa' },
    { name: 'Vodjè', slug: 'vodje', aptSlug: 'chic-smart-studio-vodje' }
  ];

  const stayTypes = [
    { label: t('navShortStays'), path: '/short-stays' },
    { label: t('navExtendedStays'), path: '/extended-stays' },
    { label: t('navBusinessStays'), path: '/business-stays' },
    { label: t('navVacationStays'), path: '/vacation-stays' }
  ];

  const handleSocialClick = (platform: string) => {
    trackEvent('Social Click', { platform });
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'fr' : 'en';
    setLanguage(nextLang);
    trackEvent('Language changed', { language: nextLang, source: 'Footer' });
  };

  return (
    <footer className="bg-[#102A43] text-white/80 border-t border-[#C6922E]/20 mt-auto pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand & Summary */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white">
                MOBILI COTONOU
              </span>
              <span className="text-xs tracking-widest text-[#C6922E] uppercase font-semibold mt-1">
                {t('descriptor')}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              {t('footerText')}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 pt-2 flex-wrap">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => handleSocialClick('instagram')}
                className="p-2 rounded-full bg-white/5 hover:bg-[#C6922E] hover:text-white text-white/60 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => handleSocialClick('facebook')}
                className="p-2 rounded-full bg-white/5 hover:bg-[#C6922E] hover:text-white text-white/60 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => handleSocialClick('tiktok')}
                className="p-2 rounded-full bg-white/5 hover:bg-[#C6922E] hover:text-white text-white/60 transition-all flex items-center justify-center"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95.12 1.93-.11 2.82-.45.01 1.25-.01 2.5.02 3.75-.81.34-1.69.41-2.54.21-.92-.23-1.78-.71-2.45-1.39-.02 2.62-.01 5.24-.02 7.86-.03.95-.29 1.92-.81 2.72-.88 1.41-2.52 2.29-4.17 2.18-1.5-.04-2.98-.82-3.79-2.07-.98-1.42-1.12-3.37-.36-4.9 1.01-2.11 3.52-3.21 5.75-2.57.01 1.27-.01 2.53-.01 3.8-.75-.27-1.6-.14-2.22.34-.7.49-1.07 1.34-.96 2.19.11.95.84 1.76 1.79 1.9 1 .19 2.06-.33 2.45-1.25.13-.3.17-.63.16-.96-.02-5.32-.01-10.64-.02-15.96z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-white/5 pb-2">
              {language === 'en' ? 'Mobili' : 'Mobili'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#C6922E] text-white/60 hover:pl-1 transition-all">
                  {language === 'en' ? 'Home' : 'Accueil'}
                </Link>
              </li>
              <li>
                <Link to="/apartments" className="hover:text-[#C6922E] text-white/60 hover:pl-1 transition-all">
                  {language === 'en' ? 'Stays' : 'Hébergements'}
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-[#C6922E] text-white/60 hover:pl-1 transition-all">
                  {language === 'en' ? 'Locations' : 'Quartiers'}
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="hover:text-[#C6922E] text-white/60 hover:pl-1 transition-all">
                  {language === 'en' ? 'How It Works' : 'Comment ça marche'}
                </Link>
              </li>
              <li>
                <Link to="/list-your-apartment" className="hover:text-[#C6922E] text-white/60 hover:pl-1 transition-all">
                  {language === 'en' ? 'List Your Apartment' : 'Devenir partenaire'}
                </Link>
              </li>
              <li>
                <Link to="/?scrollTo=faq" className="hover:text-[#C6922E] text-white/60 hover:pl-1 transition-all">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Neighborhoods */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-white/5 pb-2">
              {t('navLocations')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {locationsList.map((loc, i) => (
                <li key={i}>
                  <Link to={`/apartments/${loc.aptSlug}`} className="hover:text-[#C6922E] text-white/60 hover:pl-1 transition-all">
                    {loc.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/apartments" className="hover:text-[#C6922E] text-white/60 hover:pl-1 transition-all font-semibold">
                  {t('allLocations')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Verification */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-white/5 pb-2">
              Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                <a href="tel:+2290192206612" className="flex flex-col group">
                  <span className="text-white/40 text-xs uppercase font-semibold">Phone</span>
                  <span className="text-white/70 group-hover:text-[#C6922E] font-medium transition-colors">+229 01 92 20 66 12</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                <a 
                  href={buildWhatsAppLink(language === 'en' ? 'Hello Mobili Cotonou, I would like to query about available apartments.' : 'Bonjour Mobili Cotonou, je souhaiterais me renseigner sur vos appartements disponibles.')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col group"
                >
                  <span className="text-white/40 text-xs uppercase font-semibold">WhatsApp</span>
                  <span className="text-white/70 group-hover:text-[#C6922E] font-medium transition-colors">+229 01 92 20 66 12</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                <a href="mailto:digitalchukwudi@gmail.com" className="flex flex-col group">
                  <span className="text-white/40 text-xs uppercase font-semibold">Email</span>
                  <span className="text-white/70 group-hover:text-[#C6922E] font-medium font-mono text-xs transition-colors">digitalchukwudi@gmail.com</span>
                </a>
              </li>
            </ul>

            {/* Language Switcher moved under Contact column */}
            <div className="pt-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#C6922E] hover:border-[#C6922E] transition-all py-1.5 px-2.5 rounded-md border border-white/10 w-fit"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-[#C6922E]" />
                <span>{language === 'en' ? 'FR' : 'EN'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Legal & Disclaimer Warning */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-white/40">
          <div className="flex flex-col space-y-2 text-center lg:text-left max-w-2xl">
            <p>{t('allRightsReserved')}</p>
          </div>
          
          {/* Legal Links */}
          <div className="flex items-center gap-6 font-medium">
            <Link to="/privacy" className="hover:text-white transition-colors">
              {t('privacyPolicy')}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              {t('termsOfUse')}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
