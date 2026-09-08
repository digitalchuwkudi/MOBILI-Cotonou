import { useLanguage } from './LanguageContext';
import { MessageSquareCode, Phone } from 'lucide-react';
import { buildWhatsAppLink } from '../services/whatsappService';
import { trackEvent } from '../services/analytics';

export const WhatsAppButton = ({ 
  message, 
  variant = 'floating',
  label 
}: { 
  message?: string; 
  variant?: 'floating' | 'button' | 'outline';
  label?: string;
}) => {
  const { language, t } = useLanguage();
  
  const defaultMsg = language === 'en' 
    ? 'Hello Mobili Cotonou, I would like to get more information about furnished apartments.' 
    : 'Bonjour Mobili Cotonou, je souhaiterais obtenir des informations sur vos appartements meublés.';

  const activeMessage = message || defaultMsg;
  const link = buildWhatsAppLink(activeMessage);

  const handleClick = () => {
    trackEvent('WhatsApp click', { variant, message: activeMessage });
  };

  if (variant === 'floating') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-[#C6922E] hover:bg-white text-white hover:text-[#102A43] border border-transparent hover:border-[#C6922E] rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group focus-visible:ring-4 focus-visible:ring-[#C6922E]"
        aria-label={t('whatsappCTA')}
      >
        <div className="absolute right-14 bg-[#102A43] text-[#FAF9F6] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md border border-[#EDE7DC]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap uppercase">
          {t('whatsappCTA')}
        </div>
        <Phone className="w-6 h-6 animate-pulse" />
      </a>
    );
  }

  if (variant === 'outline') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#C6922E] bg-[#C6922E] text-white hover:bg-white hover:text-[#102A43] hover:border-[#C6922E] rounded-xl font-medium tracking-wide transition-all duration-300 uppercase text-xs"
      >
        <Phone className="w-4 h-4" />
        <span>{label || t('chatOnWhatsApp')}</span>
      </a>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C6922E] hover:bg-white text-white hover:text-[#102A43] border border-transparent hover:border-[#C6922E] rounded-xl font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg focus-visible:ring-4 focus-visible:ring-[#C6922E] uppercase text-xs"
    >
      <Phone className="w-4 h-4" />
      <span>{label || t('chatOnWhatsApp')}</span>
    </a>
  );
};
