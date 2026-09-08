export type Language = 'en' | 'fr';

export interface BilingualText {
  en: string;
  fr: string;
}

export interface BilingualList {
  en: string[];
  fr: string[];
}

export interface Apartment {
  id: string;
  // Bilingual Fields
  title: BilingualText;
  slug: string;
  description: BilingualText;
  shortDescription: BilingualText;
  apartmentType: 'apartment' | 'villa' | 'studio' | 'penthouse';
  status: 'available' | 'booked' | 'maintenance';
  verificationStatus: 'verified' | 'unverified';
  featured: boolean;
  city: string; // e.g. "Cotonou"
  neighborhood: 'Haie Vive' | 'Fidjrossè' | 'Cadjèhoun' | 'Agla' | 'Akpakpa' | 'Vodjè';
  address: string;
  approximateLocation: string; // e.g. "Near Super U, Haie Vive"
  latitude: number;
  longitude: number;
  locationDescription: BilingualText;
  
  // Pricing & Currency
  nightlyPrice: number;
  weeklyPrice?: number;
  monthlyPrice?: number;
  cleaningFee: number;
  securityDeposit: number;
  currency: 'XOF' | 'EUR' | 'USD';
  pricingNotes?: BilingualText;
  
  // Specifications
  bedrooms: number;
  bathrooms: number;
  beds: number;
  maxGuests: number;
  amenities: string[]; // Standard keys e.g. "wifi", "ac", "pool", "generator", "security"
  stayTypes: ('short' | 'extended' | 'business' | 'vacation')[];
  
  // Media
  coverImage: string;
  galleryImages: string[];
  imageAltText: BilingualText;
  
  // Policies
  minimumNights: number;
  maximumNights: number;
  checkInTime: string;
  checkOutTime: string;
  houseRules: BilingualList;
  cancellationPolicy: BilingualText;
  availabilityNotes?: BilingualText;
  
  // Private Partner Fields (Conceptually separate)
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  partnerType: 'owner' | 'manager' | 'agent';
  partnerNotes?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  location: string; // Neighborhood name or 'all'
  checkIn: string;
  checkOut: string;
  guests: number;
  bedrooms: string; // 'any', '1', '2', '3+'
  apartmentType: string; // 'all', 'apartment', 'villa', 'studio', 'penthouse'
  minPrice: number;
  maxPrice: number;
  stayType: string; // 'all', 'short', 'extended', 'business', 'vacation'
  amenities: string[]; // selected amenities filter
}

export interface BookingRequest {
  apartmentId: string;
  apartmentTitle: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface PartnerSubmission {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  apartmentType: string;
  bedrooms: number;
  maxGuests: number;
  approximatePrice: number;
  description: string;
  images: FileList | null;
  message: string;
}

export interface ContactSubmission {
  name: string;
  phone: string;
  email: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
}
