import { useLanguage } from './LanguageContext';
import { Link } from './Router';
import { AlertCircle, ArrowLeft } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  description?: string;
}

export const ErrorState = ({ title, description }: ErrorStateProps) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-full bg-[#EDE7DC]/40 flex items-center justify-center text-[#C6922E] mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight mb-4 max-w-lg">
        {title || t('errorPageTitle')}
      </h1>
      
      <p className="text-base text-[#172033]/60 max-w-md mb-8 leading-relaxed">
        {description || t('errorPageDesc')}
      </p>

      <Link
        to="/apartments"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#102A43] hover:bg-[#C6922E] text-white rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('backToApartments')}</span>
      </Link>
    </div>
  );
};
