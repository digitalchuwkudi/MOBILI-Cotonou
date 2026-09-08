// Reusable WhatsApp integration service (Stage 1)
// Stage 2/3 can easily swap the placeholder with the real business number in this single location.

export const WHATSAPP_CONFIG = {
  whatsappNumber: '+2290192206612', 
  brandName: 'Mobili Cotonou'
};

/**
 * Encodes and builds a standard WhatsApp click-to-chat URL
 */
export const buildWhatsAppLink = (message: string): string => {
  const cleanNumber = WHATSAPP_CONFIG.whatsappNumber.replace(/[^0-9+]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};

/**
 * Generates the pre-filled message for a specific apartment stay interest
 */
export const getApartmentPreFilledMessage = (
  apartmentName: string,
  neighborhood: string,
  checkIn?: string,
  checkOut?: string,
  guests?: number
): string => {
  const datesSection = (checkIn && checkOut) 
    ? ` from ${checkIn} to ${checkOut}` 
    : '';
  const guestsSection = guests ? ` for ${guests} guest${guests > 1 ? 's' : ''}` : '';
  
  return `Hello Mobili Cotonou, I'm interested in the "${apartmentName}" in ${neighborhood}. I would like to stay${datesSection}${guestsSection}.`;
};

/**
 * Generates the French pre-filled message for a specific apartment stay interest
 */
export const getApartmentPreFilledMessageFr = (
  apartmentName: string,
  neighborhood: string,
  checkIn?: string,
  checkOut?: string,
  guests?: number
): string => {
  const datesSection = (checkIn && checkOut) 
    ? ` du ${checkIn} au ${checkOut}` 
    : '';
  const guestsSection = guests ? ` pour ${guests} voyageur${guests > 1 ? 's' : ''}` : '';
  
  return `Bonjour Mobili Cotonou, je suis intéressé(e) par l'appartement "${apartmentName}" situé à ${neighborhood}. J'aimerais séjourner${datesSection}${guestsSection}.`;
};
