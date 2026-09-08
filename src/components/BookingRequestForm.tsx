import React, { useState, useEffect } from 'react';
import { Apartment, BookingRequest } from '../types';
import { useLanguage } from './LanguageContext';
import { Phone, Calendar, Users, Mail, User, Info, CheckCircle, ArrowRight } from 'lucide-react';
import { buildWhatsAppLink, getApartmentPreFilledMessage, getApartmentPreFilledMessageFr } from '../services/whatsappService';
import { trackEvent } from '../services/analytics';

interface BookingRequestFormProps {
  apartment: Apartment;
}

export const BookingRequestForm = ({ apartment }: BookingRequestFormProps) => {
  const { language, formatPrice, t } = useLanguage();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [nights, setNights] = useState(0);

  // Calculate nights
  useEffect(() => {
    if (checkIn && checkOut) {
      const dateIn = new Date(checkIn);
      const dateOut = new Date(checkOut);
      const diffTime = dateOut.getTime() - dateIn.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (dateOut > dateIn) {
        setNights(diffDays);
      } else {
        setNights(0);
      }
    } else {
      setNights(0);
    }
  }, [checkIn, checkOut]);

  // Reset success state when switching apartments
  useEffect(() => {
    setIsSuccess(false);
  }, [apartment.id]);

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!checkIn) tempErrors.checkIn = language === 'en' ? 'Check-in is required' : 'Date d’arrivée requise';
    if (!checkOut) tempErrors.checkOut = language === 'en' ? 'Check-out is required' : 'Date de départ requise';
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      tempErrors.checkOut = language === 'en' ? 'Check-out must be after check-in' : 'Le départ doit être après l’arrivée';
    } else if (checkIn && checkOut && nights < 3) {
      tempErrors.checkOut = language === 'en' ? 'Minimum stay is 3 nights' : 'Séjour minimal de 3 nuits';
    }
    if (!name.trim()) tempErrors.name = language === 'en' ? 'Full name is required' : 'Nom complet requis';
    if (!phone.trim()) tempErrors.phone = language === 'en' ? 'Phone/WhatsApp is required' : 'Téléphone/WhatsApp requis';
    if (!email.trim()) {
      tempErrors.email = language === 'en' ? 'Email is required' : 'Adresse e-mail requise';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = language === 'en' ? 'Invalid email format' : 'Format d’e-mail invalide';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Pre-filled WhatsApp message based on current dates and guests in the form
  const aptTitle = apartment.title[language] || apartment.title['en'];
  const whatsappMessage = language === 'en'
    ? getApartmentPreFilledMessage(aptTitle, apartment.neighborhood, checkIn || '___', checkOut || '___', guests)
    : getApartmentPreFilledMessageFr(aptTitle, apartment.neighborhood, checkIn || '___', checkOut || '___', guests);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    trackEvent('Booking request started', { id: apartment.id, title: aptTitle });

    // Simulate database request submission - Stage 1 frontend-only representation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      trackEvent('Booking request submitted', {
        apartmentId: apartment.id,
        apartmentTitle: aptTitle,
        checkIn,
        checkOut,
        guests,
        name,
        phone,
        email,
      });
    }, 1000);
  };

  const handleWhatsAppInstant = () => {
    trackEvent('WhatsApp click', { source: 'Booking Side Panel Direct', message: whatsappMessage });
    window.open(buildWhatsAppLink(whatsappMessage), '_blank');
  };

  // Stay breakdown calculations
  let discountPercent = 0;
  if (nights >= 30) {
    discountPercent = 25;
  } else if (nights >= 15) {
    discountPercent = 15;
  }

  const baseTotal = nights * apartment.nightlyPrice;
  const discountAmount = Math.round(baseTotal * (discountPercent / 100));
  const finalTotal = baseTotal - discountAmount;

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-[#EDE7DC] shadow-lg p-6 sm:p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-[#143D2A]/10 text-[#143D2A] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#102A43]">
          {language === 'en' ? 'Request Received' : 'Demande Reçue'}
        </h3>
        <p className="text-sm text-[#172033]/70 leading-relaxed">
          {t('bookingFormSuccess', { name: aptTitle })}
        </p>

        {/* Call to action on WhatsApp for quicker responses */}
        <div className="pt-4 border-t border-[#EDE7DC]/40 space-y-3">
          <p className="text-xs text-[#172033]/50">
            {language === 'en' 
              ? 'Speed up your confirmation by sending these details directly on WhatsApp:' 
              : 'Accélérez votre confirmation en envoyant ces détails directement sur WhatsApp :'}
          </p>
          <button
            onClick={handleWhatsAppInstant}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#143D2A] hover:bg-[#C6922E] hover:text-[#102A43] text-white rounded-xl font-bold tracking-wide transition-all uppercase"
          >
            <Phone className="w-4 h-4" />
            <span>{t('chatOnWhatsApp')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#EDE7DC] shadow-lg overflow-hidden">
      
      {/* Header Price Section */}
      <div className="bg-[#102A43] text-white p-6 border-b border-[#C6922E]/20">
        <div className="flex items-baseline gap-1.5 justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF9F6]">{formatPrice(apartment.nightlyPrice)}</span>
            <span className="text-white/60 text-xs"> {t('perNight')}</span>
          </div>
          <div className="text-right text-xs text-white/50">
            {apartment.minimumNights} {apartment.minimumNights > 1 ? (language === 'en' ? 'nights min' : 'nuits min') : (language === 'en' ? 'night min' : 'nuit min')}
          </div>
        </div>
      </div>

      {/* Booking Form body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <h3 className="text-sm uppercase font-bold tracking-wider text-[#102A43]/70 pb-2 border-b border-[#EDE7DC]/40 mb-3 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-[#C6922E]" />
          <span>{t('bookingRequestTitle')}</span>
        </h3>

        {/* Check in / Check out dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#102A43]/60 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#C6922E]" />
              <span>{t('fieldCheckIn')}</span>
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`bg-[#FAF9F6] border ${errors.checkIn ? 'border-red-400' : 'border-[#EDE7DC]'} rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#C6922E]`}
            />
            {errors.checkIn && <span className="text-[10px] text-red-500 mt-1">{errors.checkIn}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#102A43]/60 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#C6922E]" />
              <span>{t('fieldCheckOut')}</span>
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              className={`bg-[#FAF9F6] border ${errors.checkOut ? 'border-red-400' : 'border-[#EDE7DC]'} rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#C6922E]`}
            />
            {errors.checkOut && <span className="text-[10px] text-red-500 mt-1">{errors.checkOut}</span>}
          </div>
        </div>

        {/* Guests selector */}
        <div className="flex flex-col">
          <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#102A43]/60 mb-1 flex items-center gap-1">
            <Users className="w-3 h-3 text-[#C6922E]" />
            <span>{t('fieldGuests')}</span>
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            className="w-full bg-[#FAF9F6] border border-[#EDE7DC] rounded-xl px-3 py-2.5 text-xs font-semibold appearance-none focus:outline-none focus:border-[#C6922E]"
          >
            {Array.from({ length: apartment.maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? (language === 'en' ? 'Guest' : 'Voyageur') : (language === 'en' ? 'Guests' : 'Voyageurs')}
              </option>
            ))}
          </select>
        </div>

        {/* Guest Details */}
        <div className="space-y-3.5 pt-2">
          
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#102A43]/60 mb-1 flex items-center gap-1">
              <User className="w-3 h-3 text-[#C6922E]" />
              <span>{t('fieldName')}</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className={`w-full bg-[#FAF9F6] border ${errors.name ? 'border-red-400' : 'border-[#EDE7DC]'} rounded-xl px-3.5 py-2 text-xs font-medium focus:outline-none focus:border-[#C6922E]`}
            />
            {errors.name && <span className="text-[10px] text-red-500 mt-1">{errors.name}</span>}
          </div>

          {/* Phone / WhatsApp */}
          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#102A43]/60 mb-1 flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#C6922E]" />
              <span>{t('fieldPhone')}</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +229 90 00 00 00"
              className={`w-full bg-[#FAF9F6] border ${errors.phone ? 'border-red-400' : 'border-[#EDE7DC]'} rounded-xl px-3.5 py-2 text-xs font-medium focus:outline-none focus:border-[#C6922E]`}
            />
            {errors.phone && <span className="text-[10px] text-red-500 mt-1">{errors.phone}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#102A43]/60 mb-1 flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#C6922E]" />
              <span>{t('fieldEmail')}</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className={`w-full bg-[#FAF9F6] border ${errors.email ? 'border-red-400' : 'border-[#EDE7DC]'} rounded-xl px-3.5 py-2 text-xs font-medium focus:outline-none focus:border-[#C6922E]`}
            />
            {errors.email && <span className="text-[10px] text-red-500 mt-1">{errors.email}</span>}
          </div>

          {/* Optional Message */}
          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#102A43]/60 mb-1">
              {t('fieldMessage')}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('placeholderMessage')}
              rows={3}
              className="w-full bg-[#FAF9F6] border border-[#EDE7DC] rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#C6922E] resize-none"
            />
          </div>
        </div>

        {/* Date-Based Price Estimator (Recommendation 3) */}
        {nights > 0 && (
          <div className="bg-[#FAF9F6] border border-[#EDE7DC]/80 rounded-xl p-4 space-y-2.5 text-xs">
            <div className="font-bold text-[#102A43] uppercase tracking-wide text-[10px] border-b border-[#EDE7DC]/40 pb-1.5 flex justify-between items-center">
              <span>{language === 'en' ? 'Stay Summary' : 'Récapitulatif du séjour'}</span>
              <span className="text-[#C6922E] bg-[#EDE7DC]/40 px-1.5 py-0.5 rounded text-[9px] font-extrabold">{nights} {nights > 1 ? (language === 'en' ? 'Nights' : 'Nuits') : (language === 'en' ? 'Night' : 'Nuit')}</span>
            </div>
            
            <div className="flex justify-between text-[#172033]/70">
              <span>{formatPrice(apartment.nightlyPrice)} × {nights} {nights > 1 ? (language === 'en' ? 'nights' : 'nuits') : (language === 'en' ? 'nuit' : 'night')}</span>
              <span className="font-semibold text-[#102A43]">{formatPrice(baseTotal)}</span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-[#143D2A] font-semibold bg-[#143D2A]/5 p-2 rounded border border-[#143D2A]/10">
                <span>🎁 {language === 'en' ? `${discountPercent}% Long-Stay Discount` : `${discountPercent}% Remise Long Séjour`}</span>
                <span>- {formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#102A43] font-extrabold text-sm border-t border-[#EDE7DC]/60 pt-2 bg-[#EDE7DC]/10 p-2 rounded">
              <span>{language === 'en' ? 'Estimated Total' : 'Total Estimé'}</span>
              <span className="text-[#C6922E]">{formatPrice(finalTotal)}</span>
            </div>

            <p className="text-[10px] text-gray-400 leading-normal text-center italic">
              {language === 'en' 
                ? '* Excludes refundable security deposit. Final offer will be sent on WhatsApp.' 
                : '* Hors dépôt de garantie remboursable. L’offre finale vous sera envoyée sur WhatsApp.'}
            </p>
          </div>
        )}

        {/* Disclaimer Warning */}
        <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#EDE7DC]/60 flex items-start gap-2 text-[10px] text-[#172033]/60 leading-relaxed mt-2">
          <Info className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
          <span>{t('bookingFormDisclaimer')}</span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2.5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#102A43] hover:bg-[#C6922E] text-white rounded-xl font-bold tracking-wide uppercase text-xs transition-colors duration-200 shadow-sm hover:shadow"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span>{t('requestToBook')}</span>
            )}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppInstant}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#FAF9F6] hover:bg-[#C6922E] hover:text-[#102A43] hover:border-[#C6922E] text-[#143D2A] border border-[#143D2A]/20 rounded-xl font-bold text-xs tracking-wide transition-all uppercase"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t('chatOnWhatsApp')}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
