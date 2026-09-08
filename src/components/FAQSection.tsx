import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection = ({ showHeader = true }: { showHeader?: boolean }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'guest' | 'partner'>('guest');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const guestFAQs = [
    {
      q: language === 'en' ? 'What do the "⚡ 24/7 Power" and "🌐 Fiber WiFi" badges mean?' : 'Que signifient les badges "⚡ Élec 24h/24" et "🌐 Fibre Optique" ?',
      a: language === 'en'
        ? 'These badges are displayed on listings across our Home/Stays pages and Apartment Detail pages to indicate premium infrastructure. A "⚡ 24/7 Power" badge means the property has an automatic standby generator that activates within seconds of a grid outage to run AC and appliances. A "🌐 Fiber WiFi" badge indicates audited, unlimited high-speed fiber internet, perfect for remote work.'
        : 'Ces badges sont affichés sur les fiches de notre page d’accueil et des détails d’appartements pour garantir une infrastructure de premier choix. "⚡ Élec 24h/24" signifie que la résidence dispose d’un groupe électrogène automatique qui s’active en quelques secondes. "🌐 Fibre Optique" indique une connexion Wi-Fi très haut débit vérifiée et illimitée.'
    },
    {
      q: language === 'en' ? 'Where should I stay? Which Cotonou neighborhoods are best?' : 'Où devrais-je séjourner ? Quels sont les meilleurs quartiers de Cotonou ?',
      a: language === 'en'
        ? 'Choosing the right district makes all the difference. Here is our Cotonou neighborhood guide:\n\n• Haie Vive: Cotonou’s premier upscale district. Safe, green, and highly walkable, it is packed with gourmet restaurants, cafes, and foreign embassies. Best for business, dining, and diplomats.\n• Fidjrossè: The ultimate beachfront escape along the Route des Pêches. Famous for sea breezes, casual beach bars, and local artisanal markets. Best for vacationers and ocean lovers.\n• Cadjèhoun / Cocotiers: Practical, highly secure, and situated near the airport and government offices. Best for short business stopovers.'
        : 'Le choix du quartier est essentiel. Voici notre guide rapide des meilleurs quartiers de Cotonou :\n\n• La Haie Vive : Le quartier résidentiel le plus prestigieux. Très calme, sécurisé et piéton, il regorge de restaurants gastronomiques et d’ambassades. Idéal pour les séjours d’affaires et la diplomatie.\n• Fidjrossè : L’évasion en bord de mer le long de la Route des Pêches. Connu pour sa brise marine, ses restaurants de plage et ses marchés d’artisanat. Idéal pour les vacances.\n• Cadjèhoun / Les Cocotiers : Ultra-sécurisé, central et très proche de l’aéroport et des ministères. Idéal pour les escales d’affaires.'
    },
    {
      q: language === 'en' ? 'What does the "Verified" badge mean?' : 'Que signifie le badge "Vérifié" ?',
      a: language === 'en'
        ? 'Every apartment with a "Verified" seal has been physically audited in-person by a Mobili Cotonou coordinator. We verify the presence of active backup generators, working high-speed Wi-Fi, air conditioning performance, backup water pressure, clean bedding, and gated building security.'
        : 'Chaque appartement portant le label "Vérifié" a fait l’objet d’un audit physique sur place par notre équipe. Nous testons l’état du groupe électrogène de secours, la vitesse du Wi-Fi, la climatisation, la pression de l’eau courante, l’état de la literie et les accès sécurisés.'
    },
    {
      q: language === 'en' ? 'What happens if there is a power cut (Sbee power outage)?' : 'Qu’arrive-t-il en cas de coupure d’électricité (délestage SBEE) ?',
      a: language === 'en'
        ? 'Cotonou can experience occasional power outages. All our premium listings feature dedicated automatic or manual backup generator complexes. In case of SBEE outages, the backup generator will launch to keep the air conditioning, sockets, and Wi-Fi running seamlessly.'
        : 'Cotonou peut connaître des interruptions d’électricité. Toutes nos résidences disposent d’un groupe électrogène de secours. En cas de coupure SBEE, le relais prend le relais pour garantir la climatisation, les prises de courant et le Wi-Fi.'
    },
    {
      q: language === 'en' ? 'Is the running water filtered and safe?' : 'L’eau courante est-elle filtrée et propre ?',
      a: language === 'en'
        ? 'Yes. All our apartments use premium borehole water networks backed by physical activated carbon filtration systems. This ensures clean, odorless water for showering, cooking, and washing.'
        : 'Oui. Tous nos appartements sont alimentés par des forages équipés de filtres à charbon actif pour assurer une eau claire, inodore et saine pour la douche, la cuisine et la vaisselle.'
    },
    {
      q: language === 'en' ? 'What is the minimum stay duration?' : 'Quelle est la durée minimale de séjour ?',
      a: language === 'en'
        ? 'The minimum stay duration is a strict 3 nights across all of our premium stays to maintain high hospitality and care standards.'
        : 'La durée minimale de séjour est de 3 nuits strictes pour l’ensemble de nos propriétés afin de garantir un niveau de service optimal.'
    },
    {
      q: language === 'en' ? 'Do I need to pay a security deposit?' : 'Dois-je verser une caution de garantie ?',
      a: language === 'en'
        ? 'Yes, a refundable security deposit is collected upon keys delivery to cover potential property damage. The deposit amount depends on the apartment and length of stay. It is refunded in full upon check-out state evaluation.'
        : 'Oui, une caution remboursable est demandée lors de la remise des clés. Son montant varie selon le bien et la durée du séjour. Elle est restituée intégralement lors de l’état des lieux de départ si aucun dégât n’est constaté.'
    }
  ];

  const partnerFAQs = [
    {
      q: language === 'en' ? 'How do I list my apartment on Mobili Cotonou?' : 'Comment lister mon appartement sur Mobili Cotonou ?',
      a: language === 'en'
        ? 'To maintain our high hospitality standard, all properties must pass an in-person physical audit. Fill out our Owner Partner Form. If the basic description meets our criteria, a coordinator will schedule a site visit to inspect security, power grids, water networks, and general luxury finishes.'
        : 'Pour maintenir notre niveau d’excellence, chaque bien doit passer un audit physique. Remplissez notre formulaire partenaire propriétaire. Si les critères de base sont remplis, un agent planifiera une visite pour inspecter la sécurité, le groupe de secours, l’eau courante et le standing général.'
    },
    {
      q: language === 'en' ? 'What commissions or fees do you charge?' : 'Quels sont vos frais ou commissions ?',
      a: language === 'en'
        ? 'Listing your apartment on Mobili Cotonou is free. We collect a standard percentage commission on successful, completed bookings only. There are no upfront advertising costs or subscription fees.'
        : 'L’inscription de votre appartement est totalement gratuite. Nous prélevons une commission en pourcentage uniquement sur les réservations finalisées. Aucun frais d’abonnement ou d’insertion ne vous sera demandé.'
    },
    {
      q: language === 'en' ? 'Who manages guest check-in and keys delivery?' : 'Qui gère les entrées de voyageurs et la remise des clés ?',
      a: language === 'en'
        ? 'Mobili Cotonou coordinates guest communication and pre-booking inquiries. On check-in day, our professional concierge handles on-site meeting, key delivery, security briefing, and check-out auditing, ensuring a stress-free hosting experience for owners.'
        : 'Mobili Cotonou coordonne la communication et valide les séjours. Le jour de l’arrivée, notre service conciergerie assure l’accueil physique, la remise des clés, l’explication des règles et effectue l’état des lieux de sortie.'
    }
  ];

  const activeFAQs = activeTab === 'guest' ? guestFAQs : partnerFAQs;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {showHeader && (
        <div className="text-center space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#102A43] tracking-tight">
            {language === 'en' ? 'Frequently Asked Questions' : 'Questions Fréquentes'}
          </h2>
          <p className="text-xs sm:text-sm text-[#172033]/60 max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Got questions about stays, water purification, generators or policies? Select a category below.'
              : 'Des questions sur les séjours, l’eau, le groupe électrogène ou nos conditions ? Choisissez une catégorie.'}
          </p>
        </div>
      )}

      {/* Categories Toggle */}
      <div className="flex justify-center p-1 bg-[#FAF9F6] border border-[#EDE7DC]/80 rounded-2xl max-w-sm mx-auto">
        <button
          onClick={() => {
            setActiveTab('guest');
            setOpenIndex(0);
          }}
          className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all ${
            activeTab === 'guest' 
              ? 'bg-[#102A43] text-white shadow-sm' 
              : 'text-[#102A43]/60 hover:text-[#102A43]'
          }`}
        >
          {language === 'en' ? 'For Guests' : 'Pour Voyageurs'}
        </button>
        <button
          onClick={() => {
            setActiveTab('partner');
            setOpenIndex(0);
          }}
          className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all ${
            activeTab === 'partner' 
              ? 'bg-[#102A43] text-white shadow-sm' 
              : 'text-[#102A43]/60 hover:text-[#102A43]'
          }`}
        >
          {language === 'en' ? 'For Owners' : 'Pour Propriétaires'}
        </button>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {activeFAQs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-[#EDE7DC]/60 overflow-hidden shadow-xs hover:border-[#C6922E]/30 transition-all duration-200"
            >
              <button
                onClick={() => handleToggle(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-[#102A43]"
              >
                <span>{item.q}</span>
                <span className="shrink-0 text-[#C6922E]">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#172033]/70 leading-relaxed border-t border-[#EDE7DC]/20 pt-4 bg-[#FAF9F6]/30">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
