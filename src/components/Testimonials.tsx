import React from 'react';
import { useLanguage } from './LanguageContext';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  location: string;
  image: string;
  content: {
    en: string;
    fr: string;
  };
  stars: number;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: 'Sarah Jenkins',
    role: 'Diplomatic Attache',
    location: 'Cadjèhoun',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    content: {
      en: 'Mobili made my transition to Cotonou incredibly seamless. The Cadjèhoun suite was immaculate, highly secure, and had flawless high-speed fiber internet.',
      fr: 'Mobili a rendu ma transition vers Cotonou incroyablement facile. La suite de Cadjèhoun était impeccable, sécurisée et offrait un débit internet par fibre optique irréprochable.'
    },
    stars: 5
  },
  {
    name: 'Jean-Luc Dubois',
    role: 'Regional Director',
    location: 'Haie Vive',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    content: {
      en: 'Exceeded all my expectations. The 24/7 standby generator was a lifesaver for business calls, and the premium neighborhood recommendations were excellent.',
      fr: 'Au-delà de toutes mes attentes. Le groupe électrogène de secours 24h/24 est un atout indispensable pour le travail, et les recommandations locales étaient excellentes.'
    },
    stars: 5
  },
  {
    name: 'Amina Bello',
    role: 'Family Traveler',
    location: 'Fidjrossè',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&h=150&q=80',
    content: {
      en: 'An absolute tropical sanctuary by the ocean. The children loved the private pool, and we felt extremely safe and supported by the local manager.',
      fr: 'Un véritable sanctuaire tropical en bord de mer. Les enfants ont adoré la piscine privée, et nous nous sommes sentis en sécurité absolue grâce au manager local.'
    },
    stars: 5
  },
  {
    name: 'David Chen',
    role: 'Tech Consultant',
    location: 'Vodjè',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80',
    content: {
      en: 'Superb central location. The smart lock access and automatic standby power made my remote work stay completely stress-free. Highly recommended!',
      fr: 'Superbe emplacement central. L’accès par serrure connectée et l’électricité garantie ont rendu mon séjour en télétravail sans stress. Hautement recommandé !'
    },
    stars: 5
  },
  {
    name: 'Tariq Al-Mansoor',
    role: 'Investment Advisor',
    location: 'Akpakpa',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80',
    content: {
      en: 'Stunning maritime duplex with beautiful ocean breezes. The security was top-notch, and the booking team was extremely professional.',
      fr: 'Splendide duplex face à la mer bercé par la brise marine. Sécurité permanente de premier ordre et équipe de réservation très professionnelle.'
    },
    stars: 5
  }
];

export const Testimonials = () => {
  const { language } = useLanguage();

  // Duplicate items for endless carousel loop effect
  const doubleTestimonials = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section className="py-20 bg-[#102A43] overflow-hidden relative border-y border-[#C6922E]/10">
      {/* Dynamic Keyframes inject to enable clean left-to-right infinite scrolling marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6922E] block mb-2">
          {language === 'en' ? 'Guest Experiences' : 'Retours d’Expérience'}
        </span>
        <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
          {language === 'en' ? 'Trusted by Professionals & Families' : 'Recommandé par les Professionnels et Familles'}
        </h2>
      </div>

      {/* Testimonials Marquee Track running from left to right */}
      <div className="relative flex overflow-x-hidden w-full select-none py-4">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#102A43] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#102A43] to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-6 w-max animate-marquee-reverse">
          {doubleTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="w-[340px] sm:w-[400px] shrink-0 bg-[#17314f]/45 rounded-2xl border border-white/10 p-6 shadow-sm hover:border-[#C6922E]/50 hover:bg-[#17314f]/70 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5 text-[#C6922E]">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current shrink-0" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-white/10 shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed italic font-normal mb-6">
                  "{language === 'en' ? item.content.en : item.content.fr}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 flex items-center justify-center shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">
                    {item.role} &bull; <span className="text-[#C6922E]">{item.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
