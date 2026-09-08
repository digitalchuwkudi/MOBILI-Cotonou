import { useLanguage } from './LanguageContext';
import { useRouter, Link } from './Router';
import { HelpCircle, SearchX, Compass } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { buildWhatsAppLink } from '../services/whatsappService';

interface EmptyStateProps {
  type: 'apartments' | 'location';
  onResetFilters?: () => void;
}

export const EmptyState = ({ type, onResetFilters }: EmptyStateProps) => {
  const { language, t } = useLanguage();
  const { navigate } = useRouter();

  const waHelpMessage = language === 'en'
    ? 'Hello Mobili Cotonou, I was searching for an apartment on your website but didn’t find one. Can you help me find a furnished stay?'
    : 'Bonjour Mobili Cotonou, je recherchais un appartement meublé sur votre site mais je n’ai pas trouvé de disponibilité. Pouvez-vous m’aider à en trouver un ?';

  if (type === 'location') {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-[#EDE7DC]/60 shadow-sm max-w-md mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-[#EDE7DC]/40 flex items-center justify-center text-[#C6922E] mb-6">
          <Compass className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#102A43] mb-3">
          {t('emptyLocationTitle')}
        </h3>
        <p className="text-sm text-[#172033]/60 leading-relaxed mb-6">
          {language === 'en' 
            ? "We don’t have listings in this specific neighborhood at the moment, but we are expanding rapidly." 
            : "Nous n’avons pas de biens dans ce quartier spécifique actuellement, mais nous grandissons vite."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            to="/locations"
            className="flex-1 text-center text-xs font-semibold tracking-wide uppercase px-5 py-3 bg-[#102A43] hover:bg-[#C6922E] text-white rounded-xl transition-all"
          >
            {t('exploreOtherLocations')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-[#EDE7DC]/60 shadow-sm max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-full bg-[#EDE7DC]/40 flex items-center justify-center text-[#C6922E] mb-6">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="font-serif text-xl font-bold text-[#102A43] mb-3">
        {t('emptyApartmentsTitle')}
      </h3>
      <p className="text-sm text-[#172033]/60 leading-relaxed mb-8">
        {t('emptyApartmentsDesc')}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="w-full sm:w-auto px-5 py-3 bg-[#FAF9F6] border border-[#EDE7DC] hover:bg-[#EDE7DC]/20 text-[#102A43] rounded-xl text-xs font-bold uppercase transition-all"
          >
            {language === 'en' ? 'Reset All Filters' : 'Réinitialiser les filtres'}
          </button>
        )}
        
        <div className="w-full sm:w-auto">
          <WhatsAppButton variant="button" message={waHelpMessage} label={t('chatOnWhatsApp')} />
        </div>
      </div>
    </div>
  );
};
