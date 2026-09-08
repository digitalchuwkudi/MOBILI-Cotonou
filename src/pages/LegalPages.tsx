import { useLanguage } from '../components/LanguageContext';

export const LegalPage = ({ type }: { type: 'privacy' | 'terms' }) => {
  const { language } = useLanguage();

  if (type === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8 animate-fade-in">
        <div className="border-b border-[#EDE7DC]/60 pb-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C6922E]">Mobili Cotonou</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight mt-1">
            {language === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}
          </h1>
          <p className="text-xs text-[#172033]/50 mt-1">Last Updated: September 2026</p>
        </div>

        <div className="text-xs sm:text-sm text-[#172033]/75 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#102A43]">1. Information We Collect</h2>
            <p>
              We collect personal details such as your full name, email address, phone number, and booking dates when you submit a stay inquiry or list your apartment on our website. This data is handled with maximum care and is stored to secure and coordinate booking requests.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#102A43]">2. How We Use Your Data</h2>
            <p>
              Your contact details are used exclusively to process booking requests, verify security parameters, arrange keys delivery, check in-person details with property owners, and offer rapid support on WhatsApp or Email. We do not sell, rent, or lease our guest list to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#102A43]">3. Stage 1 Demo Disclaimer</h2>
            <p className="italic bg-[#FAF9F6] p-4 rounded-xl border border-[#EDE7DC] text-[#102A43]/80">
              Please note: Mobili Cotonou is currently in Stage 1 of its development process. This website is a dynamic prototype showcasing the user interface and local inventory. No live, production billing persistence is active. Actual bookings will be coordinated in person or on WhatsApp.
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8 animate-fade-in">
      <div className="border-b border-[#EDE7DC]/60 pb-6">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#C6922E]">Mobili Cotonou</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight mt-1">
          {language === 'en' ? 'Terms of Service' : 'Conditions Générales d’Utilisation'}
        </h1>
        <p className="text-xs text-[#172033]/50 mt-1">Last Updated: September 2026</p>
      </div>

      <div className="text-xs sm:text-sm text-[#172033]/75 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#102A43]">1. Booking Requests & Auditing</h2>
          <p>
            Mobili Cotonou acts as a certified boutique furnished apartment platform. Submission of a booking inquiry form on this site represents a request, not an instant guarantee. Bookings are only finalized upon physical contract signature, security deposit collection, and explicit confirmation by a coordinator.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#102A43]">2. Utility & Power Backup Policies</h2>
          <p>
            While we strive to verify backup generator and water filtration setups across listed apartments, Mobili Cotonou cannot be held liable for temporary neighborhood utility outages beyond reasonable control. In all cases, our concierge team will intervene quickly to resolve system issues.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#102A43]">3. Refusal of Service</h2>
          <p>
            To protect our property partners and neighborhood serenity, we reserve the right to cancel bookings or refuse service to any party organizing unauthorized parties, loud activities, or exceeding verified maximum guest counts listed in our inventory.
          </p>
        </section>
      </div>
    </div>
  );
};

export const PrivacyPage = () => <LegalPage type="privacy" />;
export const TermsPage = () => <LegalPage type="terms" />;
