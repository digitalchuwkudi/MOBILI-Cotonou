import { Apartment, SearchFilters } from '../types';

// Clearly marked DEMO inventory to make removal/switching in Stage 2 simple.
export const DEMO_APARTMENTS: Apartment[] = [
  {
    id: 'apt_haie_vive_penthouse',
    slug: 'executive-penthouse-haie-vive',
    title: {
      en: 'Executive 2-Bedroom Penthouse in Haie Vive',
      fr: 'Penthouse Exécutif de 2 Chambres à la Haie Vive'
    },
    description: {
      en: 'Experience ultimate comfort in the heart of Cotonou’s premium neighborhood. This beautifully furnished penthouse features a wrap-around terrace, dedicated workspace, high-speed Wi-Fi, 24/7 security, and a standby power generator to ensure a flawless stay.',
      fr: 'Vivez le confort ultime au cœur du quartier le plus prisé de Cotonou. Ce penthouse superbement meublé comprend une terrasse panoramique, un espace de travail dédié, une connexion Wi-Fi haut débit, une sécurité 24h/24 et un groupe électrogène de secours.'
    },
    shortDescription: {
      en: 'Luxurious penthouse with rooftop views, 24/7 power, and professional security in Cotonou’s finest neighborhood.',
      fr: 'Penthouse luxueux avec vue panoramique, électricité 24h/24 et sécurité permanente à la Haie Vive.'
    },
    apartmentType: 'penthouse',
    status: 'available',
    verificationStatus: 'verified',
    featured: true,
    city: 'Cotonou',
    neighborhood: 'Haie Vive',
    address: 'Rue de la Haie Vive, Lot 104, Cotonou, Benin',
    approximateLocation: 'Near Super U & French Embassy, Haie Vive',
    latitude: 6.3584,
    longitude: 2.4152,
    locationDescription: {
      en: 'Haie Vive is Cotonou’s premier residential district, offering leafy streets lined with top gourmet restaurants, cafes, consulates, and boutiques. Quiet, secure, and highly walkable.',
      fr: 'La Haie Vive est le quartier résidentiel le plus prestigieux de Cotonou, réputé pour ses rues calmes, ses restaurants gastronomiques, ses cafés branchés et sa sécurité absolue.'
    },
    nightlyPrice: 75000, // ~115 EUR
    weeklyPrice: 480000,
    monthlyPrice: 1500000,
    cleaningFee: 15000,
    securityDeposit: 100000,
    currency: 'XOF',
    pricingNotes: {
      en: 'Weekly and monthly rates include deep cleaning twice a week. Electricity consumption is billed based on meter readings upon checkout.',
      fr: 'Les tarifs hebdomadaires et mensuels incluent le ménage complet deux fois par semaine. L’électricité est facturée selon votre consommation réelle au départ.'
    },
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    maxGuests: 4,
    amenities: ['wifi', 'ac', 'generator', 'security', 'parking', 'balcony', 'kitchen', 'tv', 'washer', 'desk'],
    stayTypes: ['short', 'extended', 'business'],
    coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ],
    imageAltText: {
      en: 'Contemporary living area of Executive Penthouse featuring custom wood details and modern furniture.',
      fr: 'Salon contemporain du penthouse exécutif avec finitions en bois noble et meubles modernes.'
    },
    minimumNights: 3,
    maximumNights: 180,
    checkInTime: '14:00',
    checkOutTime: '11:00',
    houseRules: {
      en: ['No loud noise after 22:00', 'No parties or gatherings allowed', 'Smoking is strictly restricted to the balcony', 'Maximum 4 overnight guests'],
      fr: ['Pas de tapage nocturne après 22h00', 'Fêtes et réceptions strictement interdites', 'Usage de tabac autorisé uniquement sur le balcon', 'Maximum 4 voyageurs séjournant la nuit']
    },
    cancellationPolicy: {
      en: 'Full refund for cancellations made up to 5 days before check-in. 50% refund for cancellations up to 24 hours prior.',
      fr: 'Remboursement intégral pour toute annulation jusqu’à 5 jours avant l’arrivée. Remboursement à 50% jusqu’à 24h avant.'
    },
    availabilityNotes: {
      en: 'High demand during winter holidays (December-January). Advance booking of at least 2 weeks is highly recommended.',
      fr: 'Forte demande pendant les fêtes de fin d’année (Décembre-Janvier). Une réservation anticipée de 2 semaines est recommandée.'
    },
    ownerName: 'Mobili Partner Haie Vive',
    ownerPhone: '+229 90 00 00 01',
    ownerEmail: 'haievive@mobilicotonou.com',
    partnerType: 'owner',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-09-01T12:00:00Z'
  },
  {
    id: 'apt_fidjrosse_villa',
    slug: 'beachside-luxury-villa-fidjrosse',
    title: {
      en: 'Oasis Beachside Luxury 3-Bedroom Villa',
      fr: 'Villa de Luxe Oasis 3 Chambres en Bord de Mer'
    },
    description: {
      en: 'Nestled just 100 meters from Cotonou’s serene Fidjrossè beach, this modern villa is a true tropical sanctuary. Boasting a private swimming pool, highly secure gated parking, a chef-ready kitchen, and gorgeous design incorporating subtle local crafts, it is ideal for family holidays, vacations, or executive teams.',
      fr: 'Située à seulement 100 mètres de la plage de Fidjrossè, cette villa moderne est un véritable havre de paix tropical. Équipée d’une piscine privée, d’un parking intérieur sécurisé, d’une cuisine entièrement équipée et d’un design subtilement inspiré de l’artisanat béninois.'
    },
    shortDescription: {
      en: 'Premium beachside escape with a private swimming pool, lush patio, and high-end security systems.',
      fr: 'Évasion de prestige en bord de mer avec piscine privée, patio fleuri et système de sécurité haut de gamme.'
    },
    apartmentType: 'villa',
    status: 'available',
    verificationStatus: 'verified',
    featured: true,
    city: 'Cotonou',
    neighborhood: 'Fidjrossè',
    address: 'Route des Pêches, Fidjrossè, Cotonou, Benin',
    approximateLocation: '1 minute walk from Fidjrossè Beach Club & Artisanal Market',
    latitude: 6.3452,
    longitude: 2.3721,
    locationDescription: {
      en: 'Fidjrossè is Cotonou’s popular oceanfront neighborhood. Famous for its palm-fringed coastal road (Route des Pêches), casual beach shacks, live music, and relaxing coastal breezes.',
      fr: 'Fidjrossè est le quartier côtier le plus animé de Cotonou. Connu pour sa longue plage bordée de cocotiers (Route des Pêches), ses bars de plage décontractés et sa brise marine vivifiante.'
    },
    nightlyPrice: 110000, // ~168 EUR
    weeklyPrice: 700000,
    monthlyPrice: 2400000,
    cleaningFee: 25000,
    securityDeposit: 200000,
    currency: 'XOF',
    pricingNotes: {
      en: 'Pool maintenance included twice a week. High water pressure system connected. Security guard is stationed on-site 24/7.',
      fr: 'L’entretien de la piscine est inclus deux fois par semaine. Surpresseur d’eau fonctionnel. Un agent de sécurité est posté 24h/24.'
    },
    bedrooms: 3,
    bathrooms: 3.5,
    beds: 4,
    maxGuests: 6,
    amenities: ['wifi', 'ac', 'generator', 'security', 'parking', 'pool', 'kitchen', 'tv', 'washer', 'balcony'],
    stayTypes: ['vacation', 'short', 'extended'],
    coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672014027-f404be749bb7?auto=format&fit=crop&w=1200&q=80'
    ],
    imageAltText: {
      en: 'Stunning outdoor patio and turquoise private pool of Oasis Beachside Luxury Villa.',
      fr: 'Splendide terrasse extérieure et piscine privée bleu turquoise de la Villa Oasis.'
    },
    minimumNights: 3,
    maximumNights: 90,
    checkInTime: '15:00',
    checkOutTime: '12:00',
    houseRules: {
      en: ['Events require prior written consent', 'Pets allowed upon review', 'No smoking inside the villa', 'Strictly no unregistered guest stays'],
      fr: ['Les événements nécessitent un accord écrit préalable', 'Animaux autorisés sur demande', 'Usage de tabac interdit à l’intérieur', 'Voyageurs non enregistrés strictement interdits']
    },
    cancellationPolicy: {
      en: 'Moderate policy: Cancel up to 7 days before check-in for full refund. 50% refund after that.',
      fr: 'Politique modérée : Annulation gratuite jusqu’à 7 jours avant le départ. Remboursement de 50% au-delà.'
    },
    availabilityNotes: {
      en: 'Includes professional on-site manager to facilitate checks and assist guest experiences.',
      fr: 'Comprend la présence d’un gestionnaire professionnel sur place pour faciliter vos démarches.'
    },
    ownerName: 'Fidjrosse Beach Ventures',
    ownerPhone: '+229 90 00 00 02',
    ownerEmail: 'fidjrosse@mobilicotonou.com',
    partnerType: 'manager',
    createdAt: '2026-03-10T14:30:00Z',
    updatedAt: '2026-08-25T16:45:00Z'
  },
  {
    id: 'apt_cadjehoun_suite',
    slug: 'business-executive-suite-cadjehoun',
    title: {
      en: 'Boutique Business Suite in Secure Cadjèhoun',
      fr: 'Suite d’Affaires au Cœur Sécurisé de Cadjèhoun'
    },
    description: {
      en: 'A elegant, high-contrast executive studio suite ideal for business travelers and diplomats. Located in a secure building right next to key administrative ministries and embassies, this flat provides robust backup power, an ultra-fast optic fiber connection, elegant custom wood furnishings, and private desk space.',
      fr: 'Un studio haut de gamme et élégant, idéal pour les voyageurs d’affaires et diplomates. Situé dans une résidence hautement sécurisée à proximité immédiate des ministères et ambassades, ce logement propose un groupe électrogène robuste, une connexion fibre optique ultra-rapide et un bureau de travail.'
    },
    shortDescription: {
      en: 'Sleek executive flat with smart locks, optic fiber internet, and unmatched central access.',
      fr: 'Studio élégant avec serrure connectée, fibre optique et accès central sans égal pour les cadres.'
    },
    apartmentType: 'studio',
    status: 'available',
    verificationStatus: 'verified',
    featured: false,
    city: 'Cotonou',
    neighborhood: 'Cadjèhoun',
    address: 'Avenue Jean-Paul II, Cadjèhoun, Cotonou, Benin',
    approximateLocation: 'Behind Presidential Palace, Cadjèhoun',
    latitude: 6.3533,
    longitude: 2.4042,
    locationDescription: {
      en: 'Cadjèhoun is Cotonou’s secure diplomatic epicentre. It hosts governmental offices, high-level institutions, presidential grounds, and premium supermarkets. Centralized and highly fortified.',
      fr: 'Cadjèhoun est l’épicentre diplomatique et gouvernemental ultra-sécurisé de Cotonou, abritant la présidence, des représentations bilatérales et d’excellents commerces de proximité.'
    },
    nightlyPrice: 45000, // ~69 EUR
    weeklyPrice: 280000,
    monthlyPrice: 900000,
    cleaningFee: 8000,
    securityDeposit: 50000,
    currency: 'XOF',
    pricingNotes: {
      en: 'Optic fiber internet usage is completely unlimited. Parking available inside the basement gates.',
      fr: 'La connexion fibre optique est gratuite et illimitée. Parking fermé en sous-sol disponible.'
    },
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    maxGuests: 2,
    amenities: ['wifi', 'ac', 'generator', 'security', 'parking', 'kitchen', 'tv', 'desk'],
    stayTypes: ['business', 'short', 'extended'],
    coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672014027-f404be749bb7?auto=format&fit=crop&w=1200&q=80'
    ],
    imageAltText: {
      en: 'Elegant executive studio room with pristine bed and comfortable workstation.',
      fr: 'Chambre-studio executive de standing avec lit queen size et bureau ergonomique.'
    },
    minimumNights: 3,
    maximumNights: 365,
    checkInTime: '13:00',
    checkOutTime: '12:00',
    houseRules: {
      en: ['No smoking inside the premises', 'No outside guests after midnight', 'Maintain calm working environment', 'Switch off AC when going out'],
      fr: ['Interdiction de fumer à l’intérieur', 'Pas de visiteurs extérieurs après minuit', 'Garantir un climat calme propice au travail', 'Éteindre la climatisation lors des sorties']
    },
    cancellationPolicy: {
      en: 'Flexible cancellation: Full refund up to 24 hours prior to check-in.',
      fr: 'Conditions d’annulation flexibles : Remboursement intégral jusqu’à 24 heures avant l’arrivée.'
    },
    ownerName: 'Diplomatic Realty Cotonou',
    ownerPhone: '+229 90 00 00 03',
    ownerEmail: 'cadjehoun@mobilicotonou.com',
    partnerType: 'agent',
    createdAt: '2026-05-20T08:00:00Z',
    updatedAt: '2026-09-02T10:30:00Z'
  },
  {
    id: 'apt_agla_apart',
    slug: 'cozy-family-haven-agla',
    title: {
      en: 'Cozy Family Haven 2-Bedroom Apartment',
      fr: 'Bel Appartement Familial Confortable 2 Chambres à Agla'
    },
    description: {
      en: 'A bright, warmly designed 2-bedroom apartment situated in a peaceful family residential zone. Beautifully curated with vibrant local fabrics and hand-made wooden furniture, this apartment offers excellent water flow with dedicated reserves, secure gated car park, smart TV with Netflix, and complete air-conditioning.',
      fr: 'Un appartement lumineux et chaleureux de 2 chambres situé dans un quartier résidentiel très paisible. Décoré d’authentiques pagnes locaux et de meubles en bois brut fabriqués localement, cet appartement offre un excellent système d’alimentation en eau avec réserves.'
    },
    shortDescription: {
      en: 'Vibrant, warm local styling with reliable amenities and gated parking for families.',
      fr: 'Design chaleureux et local, équipements fiables et garage fermé pour familles.'
    },
    apartmentType: 'apartment',
    status: 'available',
    verificationStatus: 'verified',
    featured: false,
    city: 'Cotonou',
    neighborhood: 'Agla',
    address: 'Avenue de l’Union, Agla, Cotonou, Benin',
    approximateLocation: 'Near Agla Sports Complex',
    latitude: 6.3688,
    longitude: 2.3854,
    locationDescription: {
      en: 'Agla is a bustling, rapidly-growing residential area popular with young professionals and local families. Authentic, safe, and rich in local markets, shops, and neighborhood diners.',
      fr: 'Agla est un quartier populaire dynamique et en pleine expansion, idéal pour vivre une expérience béninoise authentique et conviviale tout en profitant de nombreux commerces de proximité.'
    },
    nightlyPrice: 35000, // ~53 EUR
    weeklyPrice: 220000,
    monthlyPrice: 750000,
    cleaningFee: 10000,
    securityDeposit: 40000,
    currency: 'XOF',
    pricingNotes: {
      en: 'Water usage and gas are included in the price. Safe workspace area in the master room.',
      fr: 'L’eau de forage et la bouteille de gaz sont incluses dans le prix. Coin bureau confortable.'
    },
    bedrooms: 2,
    bathrooms: 1.5,
    beds: 3,
    maxGuests: 4,
    amenities: ['wifi', 'ac', 'security', 'parking', 'kitchen', 'tv', 'washer', 'balcony'],
    stayTypes: ['short', 'extended', 'vacation'],
    coverImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    imageAltText: {
      en: 'Warm, sunlit living room of Cozy Family Haven featuring local fabric upholstery.',
      fr: 'Séjour baigné de lumière naturelle avec accents décoratifs en textiles béninois.'
    },
    minimumNights: 3,
    maximumNights: 120,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    houseRules: {
      en: ['Please respect neighborhood tranquility', 'No pets inside the apartment', 'Wash dishes before checking out', 'Notify manager of any damages immediately'],
      fr: ['Respecter la tranquillité du voisinage résidentiel', 'Animaux non admis à l’intérieur', 'Laver la vaisselle avant votre départ', 'Signaler rapidement au gestionnaire tout incident']
    },
    cancellationPolicy: {
      en: 'Full refund if cancelled at least 48 hours in advance of stay.',
      fr: 'Remboursement intégral en cas d’annulation au moins 48 heures avant le début du séjour.'
    },
    ownerName: 'Mme SOGLO Agla Stays',
    ownerPhone: '+229 90 00 00 04',
    ownerEmail: 'agla@mobilicotonou.com',
    partnerType: 'owner',
    createdAt: '2026-06-01T11:00:00Z',
    updatedAt: '2026-08-30T15:00:00Z'
  },
  {
    id: 'apt_akpakpa_duplex',
    slug: 'stylish-ocean-breeze-duplex-akpakpa',
    title: {
      en: 'Stylish Ocean Breeze 3-Bedroom Duplex',
      fr: 'Duplex de Standing de 3 Chambres "Brise de l’Océan"'
    },
    description: {
      en: 'A striking sea-facing duplex with unmatched ventilation and airy open space. Features 3 beautiful master bedrooms, high ceilings, a complete wrap-around sea view balcony, a fully stocked modern kitchen, and top-tier security systems. Superb electrical backups and reliable high-speed internet included.',
      fr: 'Un duplex exceptionnel faisant face à l’océan, offrant une ventilation naturelle hors pair et des volumes ouverts. Il dispose de 3 magnifiques suites parentales, de hauts plafonds, d’une cuisine entièrement équipée et de systèmes de sécurité avancés.'
    },
    shortDescription: {
      en: 'Stunning sea-facing duplex with high ceilings, spacious balconies, and 24/7 security.',
      fr: 'Duplex remarquable avec vue sur mer, grands balcons aérés et sécurité 24h/24.'
    },
    apartmentType: 'villa', // categorized as villa/duplex for luxury
    status: 'available',
    verificationStatus: 'verified',
    featured: true,
    city: 'Cotonou',
    neighborhood: 'Akpakpa',
    address: 'Boulevard de la Marina Est, Akpakpa, Cotonou, Benin',
    approximateLocation: 'Near Hotel PLM Alédjo, Akpakpa',
    latitude: 6.3621,
    longitude: 2.4588,
    locationDescription: {
      en: 'Akpakpa is the fast-developing eastern maritime district of Cotonou, offering expansive modern properties, coastal ocean air, close proximity to the central commercial port, and fast access to the Porto-Novo highway.',
      fr: 'Akpakpa est la grande zone littorale Est de Cotonou, offrant de grandes propriétés modernes, l’air rafraîchissant de l’océan, un accès rapide au port de commerce et à l’autoroute de Porto-Novo.'
    },
    nightlyPrice: 85000, // ~130 EUR
    weeklyPrice: 530000,
    monthlyPrice: 1800000,
    cleaningFee: 20000,
    securityDeposit: 150000,
    currency: 'XOF',
    pricingNotes: {
      en: 'Price includes full-time gatekeeper and general water utility. Premium secure neighborhood parking.',
      fr: 'Le tarif comprend un gardien permanent et les charges d’eau. Stationnement sécurisé dédié.'
    },
    bedrooms: 3,
    bathrooms: 3,
    beds: 3,
    maxGuests: 6,
    amenities: ['wifi', 'ac', 'generator', 'security', 'parking', 'balcony', 'kitchen', 'tv', 'washer'],
    stayTypes: ['short', 'extended', 'business', 'vacation'],
    coverImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    imageAltText: {
      en: 'Modern luxury kitchen and open space living room with views of the sea breeze balcony.',
      fr: 'Cuisine haut de gamme et séjour ouvert sur le grand balcon ventilé par l’air marin.'
    },
    minimumNights: 3,
    maximumNights: 180,
    checkInTime: '14:00',
    checkOutTime: '11:00',
    houseRules: {
      en: ['No smoking inside', 'Quiet hours after 23:00', 'No events without reservation', 'Lock balcony doors when AC is on'],
      fr: ['Interdiction de fumer à l’intérieur', 'Heures de silence après 23h00', 'Pas de fêtes sans accord préalable', 'Verrouiller les balcons si la clim est allumée']
    },
    cancellationPolicy: {
      en: 'Strict policy: Full refund only if cancelled 14 days in advance.',
      fr: 'Conditions strictes : Remboursement intégral uniquement si annulé au moins 14 jours avant.'
    },
    ownerName: 'Akpakpa Coastal Properties',
    ownerPhone: '+229 90 00 00 05',
    ownerEmail: 'akpakpa@mobilicotonou.com',
    partnerType: 'manager',
    createdAt: '2026-04-05T09:00:00Z',
    updatedAt: '2026-09-01T16:00:00Z'
  },
  {
    id: 'apt_vodje_studio',
    slug: 'chic-smart-studio-vodje',
    title: {
      en: 'Chic & Smart Studio in Centrally-Located Vodjè',
      fr: 'Studio Chic et Connecté au Centre de Vodjè'
    },
    description: {
      en: 'A highly functional and stylish 1-bedroom boutique smart studio. Offers supreme accessibility right in the geographic heart of Cotonou. Comes with automated backup power (UPS + generator), smart security locks, reliable unlimited Wi-Fi, air conditioning, microwave, espresso machine, and a private gated parking bay.',
      fr: 'Un studio meublé connecté, fonctionnel et décoré avec goût. Situé au cœur géographique de Cotonou, il offre une accessibilité maximale. Doté d’un onduleur pour l’électricité, d’une serrure connectée, d’un Wi-Fi haut débit, d’une machine à expresso et d’un parking fermé.'
    },
    shortDescription: {
      en: 'Smart boutique studio with auto-generator backup, central highway access, and private kitchen.',
      fr: 'Studio intelligent avec groupe automatique, accès routier ultra-central et cuisine.'
    },
    apartmentType: 'studio',
    status: 'available',
    verificationStatus: 'verified',
    featured: false,
    city: 'Cotonou',
    neighborhood: 'Vodjè',
    address: 'Rue Vodjè Centre, Cotonou, Benin',
    approximateLocation: 'Near Vodjè Rail Crossing & Pharmacy',
    latitude: 6.3615,
    longitude: 2.3998,
    locationDescription: {
      en: 'Vodjè is Cotonou’s vibrant central nexus. Highly family-friendly and accessible, it sits right next to the interstate highway (Route Inter-États), making travel to either Cadjèhoun or the Port area exceptionally fast.',
      fr: 'Vodjè est un carrefour central stratégique et dynamique. Très convivial et facile d’accès, il jouxte la voie inter-états, facilitant l’accès à la Haie Vive ou au centre-ville.'
    },
    nightlyPrice: 28000, // ~43 EUR
    weeklyPrice: 180000,
    monthlyPrice: 580000,
    cleaningFee: 5000,
    securityDeposit: 30000,
    currency: 'XOF',
    pricingNotes: {
      en: 'Electricity included in nightly stays up to 15 kWh/day. Excess usage is billed at 150 XOF/kWh.',
      fr: 'Électricité incluse à hauteur de 15 kWh/jour. L’excédent sera facturé à 150 FCFA/kWh.'
    },
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    maxGuests: 2,
    amenities: ['wifi', 'ac', 'generator', 'security', 'parking', 'kitchen', 'tv', 'desk'],
    stayTypes: ['business', 'short'],
    coverImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672014027-f404be749bb7?auto=format&fit=crop&w=1200&q=80'
    ],
    imageAltText: {
      en: 'Warm cozy boutique studio bedroom layout with wooden flooring and smart furnishings.',
      fr: 'Chambre-studio cosy et connectée avec parquet d’ébénisterie et literie de luxe.'
    },
    minimumNights: 3,
    maximumNights: 90,
    checkInTime: '13:00',
    checkOutTime: '11:00',
    houseRules: {
      en: ['No parties allowed', 'No pets', 'Smoking in the designated outdoor area only', 'Turn off AC when going to sleep or out'],
      fr: ['Fêtes interdites', 'Animaux non admis', 'Tabac uniquement dans la zone fumeur extérieure', 'Éteindre la clim lors de vos départs']
    },
    cancellationPolicy: {
      en: 'Flexible cancellation: Full refund up to 48 hours prior to check-in.',
      fr: 'Conditions flexibles : Annulation gratuite jusqu’à 48 heures avant l’arrivée.'
    },
    ownerName: 'M. BIO Vodjè Rentals',
    ownerPhone: '+229 90 00 00 06',
    ownerEmail: 'vodje@mobilicotonou.com',
    partnerType: 'owner',
    createdAt: '2026-07-01T15:00:00Z',
    updatedAt: '2026-09-03T09:00:00Z'
  }
];

// Helper to convert slug or check neighborhood matching with accent-insensitivity
const normalizeString = (str: string) => 
  str.normalize("NFD")
     .replace(/[\u0300-\u036f]/g, "")
     .toLowerCase()
     .replace(/\s+/g, '-');

export const ApartmentRepository = {
  // Get all apartments with optional filters
  getApartments: (filters?: Partial<SearchFilters>): Apartment[] => {
    let result = [...DEMO_APARTMENTS];

    if (!filters) return result;

    // Filter by location/neighborhood
    if (filters.location && filters.location !== 'all' && filters.location !== '') {
      const normLoc = normalizeString(filters.location);
      result = result.filter(apt => normalizeString(apt.neighborhood) === normLoc);
    }

    // Filter by max guests
    if (filters.guests && filters.guests > 0) {
      result = result.filter(apt => apt.maxGuests >= filters.guests);
    }

    // Filter by bedrooms
    if (filters.bedrooms && filters.bedrooms !== 'any') {
      if (filters.bedrooms === '3+') {
        result = result.filter(apt => apt.bedrooms >= 3);
      } else {
        const count = parseInt(filters.bedrooms, 10);
        result = result.filter(apt => apt.bedrooms === count);
      }
    }

    // Filter by apartment type
    if (filters.apartmentType && filters.apartmentType !== 'all') {
      result = result.filter(apt => apt.apartmentType === filters.apartmentType);
    }

    // Filter by stay type
    if (filters.stayType && filters.stayType !== 'all') {
      result = result.filter(apt => apt.stayTypes.includes(filters.stayType as any));
    }

    // Filter by price
    if (filters.minPrice !== undefined) {
      result = result.filter(apt => apt.nightlyPrice >= (filters.minPrice || 0));
    }
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      result = result.filter(apt => apt.nightlyPrice <= filters.maxPrice);
    }

    // Filter by selected amenities
    if (filters.amenities && filters.amenities.length > 0) {
      result = result.filter(apt => 
        filters.amenities!.every(amenity => apt.amenities.includes(amenity))
      );
    }

    return result;
  },

  getApartmentBySlug: (slug: string): Apartment | undefined => {
    return DEMO_APARTMENTS.find(apt => apt.slug === slug);
  },

  getFeaturedApartments: (): Apartment[] => {
    return DEMO_APARTMENTS.filter(apt => apt.featured);
  },

  getApartmentsByNeighborhood: (neighborhood: string): Apartment[] => {
    const norm = normalizeString(neighborhood);
    return DEMO_APARTMENTS.filter(apt => normalizeString(apt.neighborhood) === norm);
  },

  getApartmentsByStayType: (stayType: 'short' | 'extended' | 'business' | 'vacation'): Apartment[] => {
    return DEMO_APARTMENTS.filter(apt => apt.stayTypes.includes(stayType));
  }
};
