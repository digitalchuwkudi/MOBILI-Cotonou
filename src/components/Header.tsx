import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { useRouter, Link } from './Router';
import { Menu, X, Phone, Globe, Coins } from 'lucide-react';
import { buildWhatsAppLink } from '../services/whatsappService';
import { trackEvent } from '../services/analytics';

export const Header = () => {
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();
  const { path, navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll handler to make header sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'fr' : 'en';
    setLanguage(nextLang);
    trackEvent('Language changed', { language: nextLang });
  };

  const navItems = [
    { label: t('navHome'), path: '/', exact: true },
    { label: t('navStays'), path: '/apartments' },
    { label: t('navLocations'), path: '/locations' },
    { label: t('navHowItWorks'), path: '/#how-it-works' },
    { label: language === 'en' ? 'Contact Us' : 'Contactez-nous', path: '/#contact-us' },
    { label: t('navListYourApartment'), path: '/list-your-apartment' },
  ];

  const waLink = buildWhatsAppLink(
    language === 'en' 
      ? 'Hello Mobili Cotonou, I would like to inquire about furnished apartments.' 
      : 'Bonjour Mobili Cotonou, je souhaite me renseigner sur vos appartements meublés.'
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md border-b border-[#EDE7DC]/40 py-1.5' 
          : 'bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EDE7DC]/10 py-2.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#102A43] group-hover:text-[#C6922E] transition-colors duration-200">
              MOBILI COTONOU
            </span>
            <span className="text-[10px] tracking-widest text-[#C6922E] uppercase font-semibold leading-none mt-0.5">
              {language === 'en' ? 'Furnished Apartments' : 'Appartements Meublés'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-6 text-[11px] xl:text-xs font-bold uppercase tracking-wider flex-1 ml-12 mr-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                exact={item.exact}
                className="text-[#102A43]/80 hover:text-[#C6922E] transition-all duration-150 relative py-1 border-b-2 border-transparent hover:border-[#C6922E]/30"
                activeClassName="text-[#C6922E] !border-[#C6922E]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions Desk */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#102A43] hover:text-[#C6922E] transition-colors py-1.5 px-2.5 rounded-md border border-[#EDE7DC] h-8"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>{language === 'en' ? 'FR' : 'EN'}</span>
            </button>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-white border border-[#EDE7DC] px-2 rounded-md h-8 text-[#102A43]">
              <Coins className="w-3.5 h-3.5 text-[#C6922E]" />
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value as any);
                  trackEvent('Currency changed', { currency: e.target.value });
                }}
                className="bg-transparent text-xs font-semibold uppercase tracking-wider focus:outline-none cursor-pointer pr-1"
                aria-label="Change currency"
              >
                <option value="XOF">XOF</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>

            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('WhatsApp click', { source: 'Header' })}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#102A43] hover:text-[#C6922E] transition-colors uppercase group"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>WHATSAPP</span>
            </a>

            {/* CTA button */}
            <Link
              to="/apartments"
              onClick={() => trackEvent('Find Apartment click', { source: 'Header' })}
              className="text-xs font-semibold tracking-wide uppercase px-6 py-3.5 bg-[#102A43] hover:bg-[#C6922E] text-white rounded-lg transition-all duration-300"
            >
              {t('findApartment')}
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Currency Selector Mobile */}
            <div className="flex items-center gap-1 bg-white border border-[#EDE7DC] px-1.5 py-0.5 rounded text-[#102A43]">
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value as any);
                  trackEvent('Currency changed', { currency: e.target.value });
                }}
                className="bg-transparent text-[10px] font-bold uppercase tracking-wider focus:outline-none cursor-pointer"
                aria-label="Change currency"
              >
                <option value="XOF">FCFA</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>

            {/* Language Switcher Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-semibold uppercase px-2 py-1 rounded border border-[#EDE7DC]"
            >
              <Globe className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>{language === 'en' ? 'FR' : 'EN'}</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#102A43] hover:bg-[#EDE7DC]/30 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#EDE7DC] shadow-lg animate-fade-in-down">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                exact={item.exact}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#172033] hover:bg-[#FAF9F6] hover:text-[#C6922E] transition-all"
                activeClassName="bg-[#FAF9F6] text-[#C6922E] pl-5 border-l-4 border-[#C6922E]"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-[#EDE7DC]/50 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('WhatsApp click', { source: 'Header Mobile' })}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#143D2A]/10 hover:bg-[#143D2A]/20 text-[#143D2A] rounded-xl text-sm font-semibold transition-all uppercase"
              >
                <Phone className="w-4 h-4" />
                <span>WHATSAPP CHAT</span>
              </a>
              
              <Link
                to="/apartments"
                className="flex items-center justify-center px-4 py-3 bg-[#102A43] hover:bg-[#C6922E] text-white rounded-xl text-sm font-semibold tracking-wide uppercase transition-all"
              >
                {t('findApartment')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
