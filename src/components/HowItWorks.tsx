import { useLanguage } from './LanguageContext';
import { useRouter, Link } from './Router';
import { Search, Send, Key, ArrowRight } from 'lucide-react';
import { trackEvent } from '../services/analytics';

export const HowItWorks = ({ showCTA = true }: { showCTA?: boolean }) => {
  const { t } = useLanguage();
  const { navigate } = useRouter();

  const steps = [
    {
      num: '01',
      title: t('step1Title').replace('01 — ', ''),
      desc: t('step1Desc'),
      icon: Search,
    },
    {
      num: '02',
      title: t('step2Title').replace('02 — ', ''),
      desc: t('step2Desc'),
      icon: Send,
    },
    {
      num: '03',
      title: t('step3Title').replace('03 — ', ''),
      desc: t('step3Desc'),
      icon: Key,
    },
  ];

  const handleCTAClick = () => {
    trackEvent('Find Apartment click', { source: 'How It Works' });
  };

  return (
    <section id="how-it-works" className="py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C6922E] block mb-2">
            {t('howItWorksSubtitle')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
            {t('howItWorksTitle')}
          </h2>
        </div>

        {/* Steps Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          
          {/* Subtle connecting lines on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#EDE7DC] z-0 -translate-y-6"></div>

          {steps.map((step, index) => {
            const IconComp = step.icon;
            return (
              <div 
                key={index} 
                className="relative z-10 flex flex-col items-center text-center group bg-white p-8 rounded-3xl border border-[#EDE7DC]/60 shadow-xs hover:shadow-lg transition-all duration-300"
              >
                {/* Step Circle with Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#102A43] group-hover:bg-[#C6922E] text-[#FAF9F6] flex items-center justify-center mb-6 transition-colors duration-300 shadow-md">
                  <IconComp className="w-7 h-7" />
                </div>
                
                {/* Step Number Badge */}
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6922E] mb-2 block">
                  Step {step.num}
                </span>

                <h3 className="font-serif text-xl font-bold text-[#102A43] mb-3">
                  {step.title}
                </h3>
                
                <p className="text-sm text-[#172033]/60 leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {showCTA && (
          <div className="text-center mt-16">
            <Link
              to="/apartments"
              onClick={handleCTAClick}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#102A43] hover:bg-[#C6922E] text-white font-semibold rounded-xl text-sm tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>{t('findApartment')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};
