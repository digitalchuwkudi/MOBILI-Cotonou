import { useLanguage } from './LanguageContext';
import { ShieldAlert, Globe, Calendar, Wifi, CheckCircle } from 'lucide-react';

export const WhyMobili = () => {
  const { t } = useLanguage();

  const points = [
    {
      title: t('whyMobiliPoint1Title'),
      desc: t('whyMobiliPoint1Desc'),
      icon: ShieldAlert,
    },
    {
      title: t('whyMobiliPoint2Title'),
      desc: t('whyMobiliPoint2Desc'),
      icon: Globe,
    },
    {
      title: t('whyMobiliPoint3Title'),
      desc: t('whyMobiliPoint3Desc'),
      icon: Calendar,
    },
    {
      title: t('whyMobiliPoint4Title'),
      desc: t('whyMobiliPoint4Desc'),
      icon: Wifi,
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-[#EDE7DC]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C6922E] block mb-2">
            {t('whyMobiliSubtitle')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
            {t('whyMobiliTitle')}
          </h2>
        </div>

        {/* Core Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div 
                key={index} 
                className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#EDE7DC]/40 hover:border-[#C6922E]/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EDE7DC]/40 flex items-center justify-center text-[#C6922E] mb-5">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#102A43] mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-[#172033]/60 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
