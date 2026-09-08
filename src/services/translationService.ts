import { Language } from '../types';

export const getSavedLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mobili_lang');
    if (saved === 'en' || saved === 'fr') {
      return saved;
    }
  }
  return 'en';
};

export const saveLanguage = (lang: Language): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mobili_lang', lang);
  }
};

export const translations = {
  en: {
    // Navigation
    brandName: 'Mobili Cotonou',
    descriptor: 'Furnished Apartments · Short & Extended Stays',
    navHome: 'Home',
    navStays: 'Stays',
    navLocations: 'Locations',
    navShortStays: 'Short Stays',
    navExtendedStays: 'Extended Stays',
    navVacationStays: 'Vacation Stays',
    navBusinessStays: 'Business Stays',
    navHowItWorks: 'How It Works',
    navListYourApartment: 'List Your Apartment',
    navContact: 'Contact',
    navFAQ: 'FAQ',
    whatsappCTA: 'WhatsApp Chat',
    findApartment: 'Find an Apartment',
    
    // General Buttons & Actions
    searchButton: 'Search Apartments',
    viewApartment: 'View Apartment',
    requestToBook: 'Request to Book',
    chatOnWhatsApp: 'Chat on WhatsApp',
    sendMessage: 'Send Message',
    submitApartment: 'Submit My Apartment',
    sendRequest: 'Send Request',
    backToApartments: 'Back to Apartments',
    exploreOtherLocations: 'Explore Other Locations',
    allLocations: 'All Locations',
    share: 'Share',
    copied: 'Link copied!',
    
    // Hero Section
    heroBadge: 'Verified by Mobili',
    heroTitle: 'Your furnished stay in Cotonou, made simple.',
    heroSubtitle: 'Comfortable, fully furnished apartments for nights, weeks or months — for business, vacation, relocation and everyday stays.',
    heroCategories: 'Short Stays · Extended Stays · Business Stays · Vacation Stays',
    
    // Search Bar / Fields
    searchTitle: 'Find your apartment in Cotonou',
    searchHeading: 'Find your apartment in Cotonou',
    fieldLocation: 'Location',
    fieldCheckIn: 'Check-in',
    fieldCheckOut: 'Check-out',
    fieldGuests: 'Guests',
    fieldBedrooms: 'Bedrooms',
    fieldApartmentType: 'Apartment Type',
    fieldMinPrice: 'Min Price',
    fieldMaxPrice: 'Max Price',
    fieldStayType: 'Stay Type',
    anyLocation: 'All locations',
    anyType: 'All types',
    anyBedrooms: 'Any bedrooms',
    anyStayType: 'All stay types',
    guestsCount: '{count} Guest | {count} Guests',
    bedroomsCount: '{count} Bedroom | {count} Bedrooms',
    priceRangeLabel: 'Price range (Nightly)',
    filtersTitle: 'Filters',
    sortByLabel: 'Sort By',
    sortRecommended: 'Recommended',
    sortPriceLowHigh: 'Price: Low to High',
    sortPriceHighLow: 'Price: High to Low',
    sortNewest: 'Newest',
    sortFeatured: 'Featured',
    
    // Listings Info
    apartmentAvailableCount: '{count} apartment available | {count} apartments available',
    verifiedLabel: 'Verified by Mobili',
    verificationDesc: 'The apartment has been personally checked by Mobili and the listing information has been reviewed before publication.',
    startingAt: 'Starting at',
    perNight: '/ night',
    perWeek: '/ week',
    perMonth: '/ month',
    cleaningFee: 'Cleaning fee',
    securityDeposit: 'Security deposit',
    approximateLocation: 'Approximate Location',
    sleepingArrangements: 'Sleeping Arrangements',
    houseRules: 'House Rules',
    cancellationPolicy: 'Cancellation Policy',
    availabilityNotes: 'Availability Notes',
    stayTypesLabel: 'Perfect for',
    quickFacts: 'Quick Facts',
    beds: 'beds',
    baths: 'baths',
    guestsMax: 'max guests',
    
    // Booking Form
    bookingRequestTitle: 'Request a Stay',
    bookingRequestDesc: 'Submit your dates and contact info. Our team will verify availability and reach out to you within 2 hours.',
    bookingFormDisclaimer: 'This is a booking request, not an instant confirmation. No payment is required now.',
    bookingFormSuccess: 'Thank you for your request! We have received your booking inquiry for {name}. Our team will contact you shortly on WhatsApp or email.',
    fieldName: 'Full Name',
    fieldPhone: 'Phone / WhatsApp',
    fieldEmail: 'Email Address',
    fieldMessage: 'Message / Special Requests',
    placeholderMessage: 'Tell us about your trip (e.g., flight arrival time, purpose of stay)...',
    
    // Owner Form
    ownerTitle: 'Have a furnished apartment in Cotonou?',
    ownerSubtitle: 'Let Mobili help you reach more guests.',
    ownerText: 'Whether you own or manage a furnished apartment, we can help showcase your property to people looking for comfortable stays in Cotonou.',
    ownerFormSuccess: 'Thank you! Your property listing request has been submitted successfully. Our team will review the details and contact you for verification.',
    ownerFieldLocation: 'Apartment Location / Neighborhood',
    ownerFieldPrice: 'Approximate Nightly Price (XOF)',
    ownerFieldImages: 'Property Images (Preview)',
    ownerPlaceholderDesc: 'Describe your property, amenities, nearby attractions...',
    
    // Contact Page
    contactTitle: 'Need help finding a furnished apartment?',
    contactText: "Tell us what you're looking for and we'll help you find an option that fits your stay perfectly.",
    contactFormSuccess: 'Your message has been sent successfully! We will get back to you with custom options shortly.',
    contactLocationPref: 'Preferred Location / Neighborhood',
    
    // How It Works
    howItWorksTitle: 'Your stay, in three simple steps.',
    howItWorksSubtitle: 'How It Works',
    step1Title: '01 — Find Your Apartment',
    step1Desc: 'Browse our furnished apartments by location, dates and stay type.',
    step2Title: '02 — Request Your Dates',
    step2Desc: 'Choose an apartment and send us your preferred dates.',
    step3Title: '03 — Get Ready to Stay',
    step3Desc: "We'll confirm availability, guide you through the booking and help you prepare for your stay.",
    
    // Stay Types
    shortStaysTitle: 'Short Stays in Cotonou',
    shortStaysDesc: 'Looking for a comfortable place for a few nights? Browse furnished apartments for short stays in convenient locations across Cotonou.',
    extendedStaysTitle: 'Extended Stays in Cotonou',
    extendedStaysDesc: 'Stay comfortably for several weeks or months with a furnished apartment that feels more like home.',
    businessStaysTitle: 'Business Stays in Cotonou',
    businessStaysDesc: 'Comfortable furnished apartments for professionals, business trips, projects and longer work stays.',
    vacationStaysTitle: 'Vacation Stays in Cotonou',
    vacationStaysDesc: 'Relax, explore Cotonou and enjoy your stay in a comfortable furnished apartment.',
    
    // Locations Section
    locationsTitle: 'Browse by Location',
    locationsSubtitle: 'Discover Cotonou’s finest neighborhoods',
    locationBrowseAll: 'View All Locations',
    whyStayHere: 'Why stay in {neighborhood}?',
    locationIntro: 'Explore premium stays available in {neighborhood}.',
    
    // Why Mobili Section
    whyMobiliTitle: 'Why Choose Mobili Cotonou?',
    whyMobiliSubtitle: 'The Premium Standard',
    whyMobiliPoint1Title: 'Personally Verified Stays',
    whyMobiliPoint1Desc: 'Every apartment is physically inspected by our team to ensure it meets our strict standards of comfort, safety, and cleanliness.',
    whyMobiliPoint2Title: 'Bilingual Support',
    whyMobiliPoint2Desc: 'Our dedicated local concierge team speaks fluent English and French to assist you throughout your entire stay.',
    whyMobiliPoint3Title: 'Flexible Terms',
    whyMobiliPoint3Desc: 'From single-night business trips to multi-month relocations, we provide flexible booking contracts tailored to your needs.',
    whyMobiliPoint4Title: 'Seamless Connectivity',
    whyMobiliPoint4Desc: 'All apartments feature high-speed reliable Wi-Fi, modern backup power generators, and secure gated entries.',
    
    // Empty & Error States
    emptyApartmentsTitle: 'No apartments available right now.',
    emptyApartmentsDesc: "We're adding more stays soon. In the meantime, contact us and we'll help you find an option.",
    emptyLocationTitle: 'No stays available in this area right now.',
    errorPageTitle: 'This stay seems to have moved.',
    errorPageDesc: "The page you're looking for isn't available.",
    
    // Footer & Legal
    footerText: 'Comfortable furnished apartments for business, vacation, relocation and everyday stays in Cotonou.',
    allRightsReserved: '© 2026 Mobili Cotonou. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    socialMedia: 'Connect with Us',
    legalPlaceholderWarning: 'Disclaimer: This website serves as an interactive frontend preview. The rates and availability presented are for demonstration purposes.',
    
    // FAQ Questions
    faqTitle: 'Frequently Asked Questions',
    faqQ1: 'How do I book an apartment?',
    faqA1: 'To submit a request, select your dates and number of guests on the apartment page and click "Request to Book". Alternatively, click the WhatsApp button to chat directly with our team. We will verify availability and confirm within 2 hours.',
    faqQ2: 'Can I stay for just one night?',
    faqA2: 'No, to guarantee a premium hospitality experience and maintain our high standards of property care, all apartments require a strict minimum stay of 3 nights.',
    faqQ3: 'Can I rent for a month?',
    faqA3: 'Absolutely. We specialize in both short and extended stays. Monthly bookings often qualify for discounted rates which are detailed in the pricing notes of each apartment.',
    faqQ4: 'Are the apartments verified?',
    faqA4: 'Yes, apartments tagged with "Verified by Mobili" have been personally inspected by our team. We verify the accuracy of the photos, amenities, water, internet connection, and power back-ups.',
    faqQ5: 'Do I pay online?',
    faqA5: 'Mobili Cotonou handles payment securely during checkout. Currently, we accept bank transfers, Mobile Money (MTN MoMo, Moov Flooz), and major credit cards prior to key handover. No payments are charged during the initial request.',
    faqQ6: 'Can I contact Mobili on WhatsApp?',
    faqA6: 'Yes! We are highly responsive on WhatsApp. You can click the floating WhatsApp button at the bottom right of any page to start a chat with our customer support team.',
    faqQ7: 'Can I list my apartment?',
    faqA7: 'We welcome high-quality furnished properties in Cotonou. Navigate to the "List Your Apartment" page, fill out the property registration form, and our onboarding team will contact you to arrange an inspection.',
  },
  fr: {
    // Navigation
    brandName: 'Mobili Cotonou',
    descriptor: 'Appartements meublés · Courts & longs séjours',
    navHome: 'Accueil',
    navStays: 'Séjours',
    navLocations: 'Quartiers',
    navShortStays: 'Courts Séjours',
    navExtendedStays: 'Longs Séjours',
    navVacationStays: 'Vacances',
    navBusinessStays: 'Affaires',
    navHowItWorks: 'Comment ça marche',
    navListYourApartment: 'Publier un Appartement',
    navContact: 'Contact',
    navFAQ: 'FAQ',
    whatsappCTA: 'Contact WhatsApp',
    findApartment: 'Trouver un Appartement',
    
    // General Buttons & Actions
    searchButton: 'Rechercher des appartements',
    viewApartment: 'Voir l’appartement',
    requestToBook: 'Demander à réserver',
    chatOnWhatsApp: 'Nous écrire sur WhatsApp',
    sendMessage: 'Envoyer le message',
    submitApartment: 'Soumettre mon appartement',
    sendRequest: 'Envoyer la demande',
    backToApartments: 'Retour aux appartements',
    exploreOtherLocations: 'Explorer d’autres quartiers',
    allLocations: 'Tous les quartiers',
    share: 'Partager',
    copied: 'Lien copié !',
    
    // Hero Section
    heroBadge: 'Vérifié par Mobili',
    heroTitle: 'Votre séjour en appartement meublé à Cotonou, en toute simplicité.',
    heroSubtitle: 'Des appartements entièrement meublés et prêts à vivre, pour quelques nuits, plusieurs semaines ou plusieurs mois — pour le travail, les vacances, un déménagement ou un séjour de longue durée.',
    heroCategories: 'Courts séjours · Longs séjours · Séjours professionnels · Séjours vacances',
    
    // Search Bar / Fields
    searchTitle: 'Trouvez votre appartement à Cotonou',
    searchHeading: 'Trouvez votre appartement à Cotonou',
    fieldLocation: 'Quartier',
    fieldCheckIn: 'Arrivée',
    fieldCheckOut: 'Départ',
    fieldGuests: 'Voyageurs',
    fieldBedrooms: 'Chambres',
    fieldApartmentType: 'Type de bien',
    fieldMinPrice: 'Prix Min',
    fieldMaxPrice: 'Prix Max',
    fieldStayType: 'Type de séjour',
    anyLocation: 'Tous les quartiers',
    anyType: 'Tous les types',
    anyBedrooms: 'Nombre de chambres',
    anyStayType: 'Tous les types de séjours',
    guestsCount: '{count} voyageur | {count} voyageurs',
    bedroomsCount: '{count} chambre | {count} chambres',
    priceRangeLabel: 'Fourchette de prix (Par nuit)',
    filtersTitle: 'Filtres',
    sortByLabel: 'Trier par',
    sortRecommended: 'Recommandé',
    sortPriceLowHigh: 'Prix : du moins cher au plus cher',
    sortPriceHighLow: 'Prix : du plus cher au moins cher',
    sortNewest: 'Nouveautés',
    sortFeatured: 'Coups de cœur',
    
    // Listings Info
    apartmentAvailableCount: '{count} appartement disponible | {count} appartements disponibles',
    verifiedLabel: 'Vérifié par Mobili',
    verificationDesc: 'Cet appartement a été physiquement inspecté par l’équipe de Mobili et les informations de l’annonce ont été validées avant publication.',
    startingAt: 'À partir de',
    perNight: '/ nuit',
    perWeek: '/ semaine',
    perMonth: '/ mois',
    cleaningFee: 'Frais de ménage',
    securityDeposit: 'Dépôt de garantie',
    approximateLocation: 'Localisation approximative',
    sleepingArrangements: 'Configuration des lits',
    houseRules: 'Règlement intérieur',
    cancellationPolicy: 'Conditions d’annulation',
    availabilityNotes: 'Disponibilité',
    stayTypesLabel: 'Idéal pour',
    quickFacts: 'En bref',
    beds: 'lits',
    baths: 'salles de bain',
    guestsMax: 'voyageurs max',
    
    // Booking Form
    bookingRequestTitle: 'Demande de séjour',
    bookingRequestDesc: 'Soumettez vos dates et vos coordonnées. Notre équipe vérifiera la disponibilité et vous répondra sous 2 heures.',
    bookingFormDisclaimer: 'Il s’agit d’une demande de réservation, pas d’une confirmation instantanée. Aucun paiement n’est requis à ce stade.',
    bookingFormSuccess: 'Merci pour votre demande ! Nous avons bien reçu votre demande de réservation pour {name}. Notre équipe vous contactera très rapidement sur WhatsApp ou par e-mail.',
    fieldName: 'Nom complet',
    fieldPhone: 'Téléphone / WhatsApp',
    fieldEmail: 'Adresse e-mail',
    fieldMessage: 'Message / Demandes particulières',
    placeholderMessage: 'Parlez-nous de votre séjour (ex: heure d’arrivée du vol, motif du séjour)...',
    
    // Owner Form
    ownerTitle: 'Vous possédez un appartement meublé à Cotonou ?',
    ownerSubtitle: 'Laissez Mobili vous aider à optimiser vos réservations.',
    ownerText: 'Que vous soyez propriétaire ou gérant d’un appartement meublé, nous vous aidons à le faire découvrir à une clientèle exigeante en quête de confort à Cotonou.',
    ownerFormSuccess: 'Merci ! Votre demande d’inscription a été soumise avec succès. Notre équipe va étudier les détails et vous contactera pour planifier la visite de vérification.',
    ownerFieldLocation: 'Localisation de l’appartement / Quartier',
    ownerFieldPrice: 'Prix approximatif par nuit (FCFA)',
    ownerFieldImages: 'Images du bien (Aperçu)',
    ownerPlaceholderDesc: 'Décrivez votre appartement, ses équipements, les points d’intérêt à proximité...',
    
    // Contact Page
    contactTitle: 'Besoin d’aide pour trouver un appartement meublé ?',
    contactText: 'Dites-nous ce que vous recherchez et nous vous aiderons à trouver l’hébergement parfait pour votre séjour.',
    contactFormSuccess: 'Votre message a été envoyé avec succès ! Nous reviendrons vers vous avec des propositions sur-mesure sous peu.',
    contactLocationPref: 'Quartier préféré / de choix',
    
    // How It Works
    howItWorksTitle: 'Votre séjour, en trois étapes simples.',
    howItWorksSubtitle: 'Comment ça marche',
    step1Title: '01 — Trouvez votre appartement',
    step1Desc: 'Parcourez nos appartements meublés par quartier, dates et type de séjour.',
    step2Title: '02 — Demandez vos dates',
    step2Desc: 'Choisissez l’appartement de votre choix et envoyez-nous vos dates préférées.',
    step3Title: '03 — Préparez votre séjour',
    step3Desc: 'Nous confirmons la disponibilité, vous guidons pour la réservation et vous aidons à préparer votre arrivée.',
    
    // Stay Types
    shortStaysTitle: 'Courts séjours à Cotonou',
    shortStaysDesc: 'Besoin d’un logement confortable pour quelques nuits ? Découvrez nos appartements meublés parfaits pour les séjours de courte durée à Cotonou.',
    extendedStaysTitle: 'Longs séjours à Cotonou',
    extendedStaysDesc: 'Installez-vous confortablement pendant plusieurs semaines ou mois dans un appartement meublé où l’on se sent comme chez soi.',
    businessStaysTitle: 'Séjours d’affaires à Cotonou',
    businessStaysDesc: 'Des appartements meublés de standing pour les professionnels, cadres, missions et séjours de travail prolongés.',
    vacationStaysTitle: 'Séjours de vacances à Cotonou',
    vacationStaysDesc: 'Détendez-vous, explorez Cotonou et profitez pleinement de vos vacances dans un cadre chaleureux et sécurisé.',
    
    // Locations Section
    locationsTitle: 'Choisir par quartier',
    locationsSubtitle: 'Découvrez les plus beaux quartiers de Cotonou',
    locationBrowseAll: 'Voir tous les quartiers',
    whyStayHere: 'Pourquoi séjourner à {neighborhood} ?',
    locationIntro: 'Découvrez nos appartements meublés de prestige situés à {neighborhood}.',
    
    // Why Mobili Section
    whyMobiliTitle: 'Pourquoi choisir Mobili Cotonou ?',
    whyMobiliSubtitle: 'Le Standard Premium',
    whyMobiliPoint1Title: 'Séjours vérifiés physiquement',
    whyMobiliPoint1Desc: 'Chaque appartement est visité par nos équipes locales pour vous garantir un niveau de confort, de sécurité et de propreté irréprochable.',
    whyMobiliPoint2Title: 'Service client bilingue',
    whyMobiliPoint2Desc: 'Notre service conciergerie basé à Cotonou parle couramment français et anglais pour vous assister tout au long de votre séjour.',
    whyMobiliPoint3Title: 'Formules de location flexibles',
    whyMobiliPoint3Desc: 'Que ce soit pour une nuit d’affaires ou plusieurs mois d’expatriation, nous vous proposons des contrats adaptés à votre séjour.',
    whyMobiliPoint4Title: 'Équipements et connectivité',
    whyMobiliPoint4Desc: 'Wi-Fi haut débit illimité, climatisation performante, groupe électrogène de secours et résidences hautement sécurisées.',
    
    // Empty & Error States
    emptyApartmentsTitle: 'Aucun appartement disponible pour le moment.',
    emptyApartmentsDesc: 'Nous ajoutons régulièrement de nouveaux biens. Contactez-nous directement et nous trouverons une solution pour vous.',
    emptyLocationTitle: 'Aucun appartement disponible dans ce quartier pour le moment.',
    errorPageTitle: 'Ce séjour semble introuvable.',
    errorPageDesc: 'La page que vous recherchez n’est pas disponible ou a été déplacée.',
    
    // Footer & Legal
    footerText: 'Appartements meublés de standing pour voyages d’affaires, vacances, réinstallations et longs séjours à Cotonou.',
    allRightsReserved: '© 2026 Mobili Cotonou. Tous droits réservés.',
    privacyPolicy: 'Politique de confidentialité',
    termsOfUse: 'Conditions d’utilisation',
    socialMedia: 'Suivez-nous',
    legalPlaceholderWarning: 'Note : Ce site est un prototype interactif. Les tarifs et les disponibilités affichés le sont uniquement à titre de démonstration.',
    
    // FAQ Questions
    faqTitle: 'Foire Aux Questions (FAQ)',
    faqQ1: 'Comment réserver un appartement ?',
    faqA1: 'Pour envoyer une demande, sélectionnez vos dates et le nombre de voyageurs sur la page de l’appartement et cliquez sur "Demander à réserver". Vous pouvez aussi cliquer sur le bouton WhatsApp pour échanger directement avec un conseiller. Nous vous répondrons sous 2 heures.',
    faqQ2: 'Puis-je séjourner pour une seule nuit ?',
    faqA2: 'Non, afin de garantir une expérience de séjour haut de gamme et de maintenir nos standards élevés, tous nos appartements exigent un séjour de 3 nuits minimum.',
    faqQ3: 'Puis-je louer pour un mois entier ?',
    faqA3: 'Absolument. Nous sommes spécialisés dans les séjours de moyenne et longue durée. Les réservations mensuelles bénéficient de tarifs dégressifs avantageux indiqués sur la fiche de l’appartement.',
    faqQ4: 'Les appartements sont-ils réellement vérifiés ?',
    faqA4: 'Oui, tous les appartements labellisés "Vérifié par Mobili" font l’objet d’une inspection physique stricte. Nous vérifions la plomberie, l’électricité, l’état de la climatisation, la vitesse d’internet et les dispositifs de secours électrique.',
    faqQ5: 'Le paiement se fait-il en ligne ?',
    faqA5: 'Mobili Cotonou propose plusieurs modes de règlement sécurisés avant l’entrée dans les lieux : virements bancaires, Mobile Money (MTN MoMo, Moov Flooz) ou cartes bancaires internationales. Aucun paiement n’est requis lors de la simple demande de réservation.',
    faqQ6: 'Puis-je contacter Mobili par WhatsApp ?',
    faqA6: 'Tout à fait ! Nous sommes extrêmement réactifs sur WhatsApp. Cliquez sur l’icône flottante WhatsApp en bas à droite de l’écran pour entamer une discussion directe avec notre équipe.',
    faqQ7: 'Puis-je lister mon propre appartement meublé ?',
    faqA7: 'Nous sélectionnons des logements meublés de standing à Cotonou. Rendez-vous sur la page "Publier un Appartement", remplissez le formulaire, et notre service de partenariat vous contactera pour organiser une visite d’évaluation.',
  },
};

export const translate = (key: keyof typeof translations['en'], lang: Language, replacements?: Record<string, string>): string => {
  let text = translations[lang]?.[key] || translations['en']?.[key] || (key as string);
  
  if (replacements) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      text = text.replace(new RegExp(`{${placeholder}}`, 'g'), value);
    });
  }
  
  return text;
};
