import { useLanguage } from './LanguageContext';
import { ShieldCheck } from 'lucide-react';

interface VerificationBadgeProps {
  status: 'verified' | 'unverified';
  showLabel?: boolean;
}

export const VerificationBadge = ({ status, showLabel = true }: VerificationBadgeProps) => {
  const { t } = useLanguage();

  if (status !== 'verified') return null;

  return (
    <div 
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#102A43] text-[#C6922E] border border-[#C6922E]/20 text-xs font-semibold tracking-wide"
      title={t('verificationDesc')}
    >
      <ShieldCheck className="w-3.5 h-3.5 text-[#C6922E]" />
      {showLabel && <span>{t('heroBadge')}</span>}
    </div>
  );
};
