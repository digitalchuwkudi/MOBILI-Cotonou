import { useLanguage } from '../components/LanguageContext';
import { PartnerForm } from '../components/PartnerForm';
import { Crown, Award, Coins, Phone } from 'lucide-react';
import { buildWhatsAppLink } from '../services/whatsappService';
import { trackEvent } from '../services/analytics';

export const ListYourApartmentPage = () => {
  const { language, t } = useLanguage();

  const benefits = [
    {
      title: language === 'en' ? 'Premium Global Clientele' : 'Clientèle Internationale Haut de Gamme',
      desc: language === 'en'
        ? 'We connect your luxury apartment with vetted corporate travelers, expats, and high-net-worth vacationers seeking boutique standards.'
        : 'Nous mettons en relation votre appartement avec des cadres d’entreprises, des expatriés et des voyageurs exigeants à fort pouvoir d’achat.',
      icon: Crown
    },
    {
      title: language === 'en' ? 'Mobili Verification Stamp' : 'Le Label de Confiance Mobili',
      desc: language === 'en'
        ? 'A Mobili verification badge increases booking click-through rates by up to 45%. We help certify and audit your space.'
        : 'Notre label de vérification physique augmente considérablement le taux de réservation en instaurant une confiance instantanée.',
      icon: Award
    },
    {
      title: language === 'en' ? 'Higher Rental Yields' : 'Rendement Locatif Supérieur',
      desc: language === 'en'
        ? 'Enjoy higher occupancy and premium daily/weekly/monthly rates compared to conventional long-term local rentals.'
        : 'Bénéficiez de taux d’occupation élevés et de tarifs avantageux par rapport aux baux d’habitation traditionnels de longue durée.',
      icon: Coins
    }
  ];

  const waOwnerLink = buildWhatsAppLink(
    language === 'en'
      ? 'Hello Mobili Cotonou, I am a property owner and would like to list my furnished apartment on your platform.'
      : 'Bonjour Mobili Cotonou, je suis propriétaire et j’aimerais proposer mon appartement meublé sur votre site.'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16 animate-fade-in">
      
      {/* Header */}
      <div className="border-b border-[#EDE7DC]/60 pb-8 text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6922E] block">
          {t('ownerTitle')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
          {language === 'en' ? 'Maximize Your Furnished Apartment Revenue' : 'Valorisez Votre Patrimoine Immobilier Meublé'}
        </h1>
        <p className="text-sm text-[#172033]/60 leading-relaxed">
          {language === 'en'
            ? 'Partner with Cotonou’s premier boutique hospitality platform. We verify, feature, and coordinate stays for premium travelers.'
            : 'Rejoignez la plateforme de référence à Cotonou. Nous auditons, valorisons et gérons les demandes de voyageurs d’affaires.'}
        </p>
      </div>

      {/* Grid of Owner Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div key={idx} className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#EDE7DC]/60 shadow-xs flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-white text-[#C6922E] border border-[#EDE7DC]/50 flex items-center justify-center mb-5 shrink-0 shadow-xs">
                <Icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#102A43] mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs text-[#172033]/60 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Form and Quick WhatsApp Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-4">
        
        {/* Left column info */}
        <div className="lg:col-span-1 space-y-6 bg-[#102A43] text-white p-6 sm:p-8 rounded-3xl border border-[#C6922E]/20 h-fit">
          <h2 className="font-serif text-2xl font-bold text-[#FAF9F6]">
            {language === 'en' ? 'How we partner' : 'Notre méthode'}
          </h2>
          <p className="text-xs text-white/75 leading-relaxed">
            {language === 'en'
              ? 'We don’t just host ads. We physically visit every property, test the amenities, and help owners optimize setups to pass our safety and comfort standard.'
              : 'Nous ne sommes pas un simple site de petites annonces. Nous auditons physiquement chaque logement pour conseiller les propriétaires.'}
          </p>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#C6922E] text-[#102A43] flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">1</div>
              <div>
                <h4 className="text-xs font-bold text-[#FAF9F6]">{language === 'en' ? 'Submit Form' : 'Soumettre le bien'}</h4>
                <p className="text-[10px] text-white/60 leading-relaxed">Fill the property specs.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#C6922E] text-[#102A43] flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">2</div>
              <div>
                <h4 className="text-xs font-bold text-[#FAF9F6]">{language === 'en' ? 'In-Person Audit' : 'Audit Physique'}</h4>
                <p className="text-[10px] text-white/60 leading-relaxed">We inspect safety, power, water & bedding quality.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#C6922E] text-[#102A43] flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">3</div>
              <div>
                <h4 className="text-xs font-bold text-[#FAF9F6]">{language === 'en' ? 'Get Verified & Book' : 'Vérification & Réservations'}</h4>
                <p className="text-[10px] text-white/60 leading-relaxed">Earn the trust badge and start hosting guests.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-[10px] text-[#C6922E] font-bold uppercase tracking-wider mb-3">
              {language === 'en' ? 'Prefer instant support?' : 'Besoin d’aide immédiate ?'}
            </p>
            <a
              href={waOwnerLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('WhatsApp owner click')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#102A43] hover:bg-[#C6922E] hover:text-white rounded-xl text-xs font-bold uppercase transition-all shadow-md hover:shadow-lg w-full justify-center group"
            >
              <span className="transition-colors">{language === 'en' ? 'Chat on WhatsApp' : 'Discuter sur WhatsApp'}</span>
              <Phone className="w-4 h-4 text-[#102A43] group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* Right columns form */}
        <div className="lg:col-span-2">
          <PartnerForm />
        </div>

      </div>

    </div>
  );
};
