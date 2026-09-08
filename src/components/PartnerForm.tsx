import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { User, Phone, Mail, MapPin, Home, Bed, Users, DollarSign, AlignLeft, MessageSquare, CheckCircle } from 'lucide-react';
import { trackEvent } from '../services/analytics';

export const PartnerForm = () => {
  const { language, t } = useLanguage();
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [apartmentType, setApartmentType] = useState('apartment');
  const [bedrooms, setBedrooms] = useState(1);
  const [maxGuests, setMaxGuests] = useState(2);
  const [approximatePrice, setApproximatePrice] = useState('');
  const [description, setDescription] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const temp: Record<string, string> = {};
    if (!fullName.trim()) temp.fullName = language === 'en' ? 'Full name is required' : 'Nom complet requis';
    if (!phone.trim()) temp.phone = language === 'en' ? 'Phone or WhatsApp is required' : 'Téléphone ou WhatsApp requis';
    if (!email.trim()) {
      temp.email = language === 'en' ? 'Email is required' : 'Adresse e-mail requise';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      temp.email = language === 'en' ? 'Invalid email format' : 'Format d’e-mail invalide';
    }
    if (!location.trim()) temp.location = language === 'en' ? 'Apartment location is required' : 'Quartier ou localisation requis';
    if (!approximatePrice.trim() || isNaN(Number(approximatePrice))) {
      temp.approximatePrice = language === 'en' ? 'Please enter a valid estimated price' : 'Veuillez saisir un tarif valide';
    }
    if (!description.trim()) temp.description = language === 'en' ? 'Description is required' : 'Une brève description est requise';

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setUploadStatus(language === 'en' ? 'Sending application...' : 'Envoi de la candidature...');
    trackEvent('Partner form started', { fullName, location });

    try {
      const payload = {
        fullName,
        phone,
        email,
        location,
        apartmentType,
        bedrooms: bedrooms.toString(),
        maxGuests: maxGuests.toString(),
        approximatePrice,
        description,
        additionalMessage
      };

      const response = await fetch('https://formspree.io/f/xnpqgboz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        trackEvent('Partner form submitted', {
          fullName,
          phone,
          email,
          location,
          apartmentType,
          bedrooms,
          maxGuests,
          approximatePrice,
          description,
          additionalMessage,
        });
      } else {
        setIsSubmitting(false);
        setErrors({ submit: language === 'en' ? 'Submission failed. Please check form fields.' : 'La soumission a échoué. Veuillez vérifier les champs.' });
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setErrors({ submit: language === 'en' ? 'An unexpected error occurred. Please try again.' : 'Une erreur inattendue est survenue.' });
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl border border-[#EDE7DC] shadow-md p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto my-8">
        <div className="w-16 h-16 bg-[#143D2A]/10 text-[#143D2A] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#102A43]">
          {language === 'en' ? 'Application Received!' : 'Candidature Reçue !'}
        </h3>
        <p className="text-sm text-[#172033]/70 leading-relaxed">
          {t('ownerFormSuccess')}
        </p>

        <button
          onClick={() => {
            setIsSuccess(false);
            setFullName('');
            setPhone('');
            setEmail('');
            setLocation('');
            setApproximatePrice('');
            setDescription('');
            setAdditionalMessage('');
          }}
          className="px-6 py-3 bg-[#102A43] hover:bg-[#C6922E] text-white rounded-xl text-xs font-bold uppercase transition-all"
        >
          {language === 'en' ? 'Submit Another Apartment' : 'Soumettre un autre bien'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#EDE7DC] shadow-md p-6 sm:p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step headers */}
        <div className="border-b border-[#EDE7DC]/60 pb-4 mb-4">
          <h3 className="text-xs uppercase font-extrabold tracking-widest text-[#C6922E] mb-1">
            {language === 'en' ? 'Onboarding' : 'Partenariat'}
          </h3>
          <p className="text-xs text-[#172033]/50">
            {language === 'en' 
              ? 'Complete these details about your property. We will get back to you shortly to schedule an in-person audit.'
              : 'Complétez les informations sur votre bien. Nous planifierons ensuite une visite d’audit physique.'}
          </p>
        </div>

        {errors.submit && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
            {errors.submit}
          </div>
        )}

        {/* Name / Phone / Email */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-[#102A43]/70 uppercase tracking-wide mb-1 flex items-center gap-1">
              <User className="w-3 h-3 text-[#C6922E]" />
              <span>{t('fieldName')}</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Koffi Benin"
              className={`bg-[#FAF9F6] border ${errors.fullName ? 'border-red-400' : 'border-[#EDE7DC]'} rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#C6922E]`}
            />
            {errors.fullName && <span className="text-[10px] text-red-500 mt-1">{errors.fullName}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-[#102A43]/70 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#C6922E]" />
              <span>{t('fieldPhone')}</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +229 90 00 00 00"
              className={`bg-[#FAF9F6] border ${errors.phone ? 'border-red-400' : 'border-[#EDE7DC]'} rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#C6922E]`}
            />
            {errors.phone && <span className="text-[10px] text-red-500 mt-1">{errors.phone}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-[#102A43]/70 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#C6922E]" />
              <span>{t('fieldEmail')}</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. owner@example.com"
              className={`bg-[#FAF9F6] border ${errors.email ? 'border-red-400' : 'border-[#EDE7DC]'} rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#C6922E]`}
            />
            {errors.email && <span className="text-[10px] text-red-500 mt-1">{errors.email}</span>}
          </div>

        </div>

        {/* Location & Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-[#102A43]/70 uppercase tracking-wide mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C6922E]" />
              <span>{t('ownerFieldLocation')}</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Haie Vive, near Super U"
              className={`bg-[#FAF9F6] border ${errors.location ? 'border-red-400' : 'border-[#EDE7DC]'} rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#C6922E]`}
            />
            {errors.location && <span className="text-[10px] text-red-500 mt-1">{errors.location}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-[#102A43]/70 uppercase tracking-wide mb-1 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-[#C6922E]" />
              <span>{t('ownerFieldPrice')}</span>
            </label>
            <input
              type="number"
              value={approximatePrice}
              onChange={(e) => setApproximatePrice(e.target.value)}
              placeholder="e.g. 50000"
              className={`bg-[#FAF9F6] border ${errors.approximatePrice ? 'border-red-400' : 'border-[#EDE7DC]'} rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#C6922E]`}
            />
            {errors.approximatePrice && <span className="text-[10px] text-red-500 mt-1">{errors.approximatePrice}</span>}
          </div>

        </div>

        {/* Details fields: Type / Bedrooms / Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-[#102A43]/70 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Home className="w-3 h-3 text-[#C6922E]" />
              <span>{t('fieldApartmentType')}</span>
            </label>
            <select
              value={apartmentType}
              onChange={(e) => setApartmentType(e.target.value)}
              className="bg-[#FAF9F6] border border-[#EDE7DC] rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none"
            >
              <option value="apartment">{language === 'en' ? 'Apartment' : 'Appartement'}</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-[#102A43]/70 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Bed className="w-3 h-3 text-[#C6922E]" />
              <span>{t('fieldBedrooms')}</span>
            </label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(parseInt(e.target.value, 10))}
              className="bg-[#FAF9F6] border border-[#EDE7DC] rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-[#102A43]/70 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Users className="w-3 h-3 text-[#C6922E]" />
              <span>{language === 'en' ? 'Max Guests' : 'Capacité voyageurs'}</span>
            </label>
            <select
              value={maxGuests}
              onChange={(e) => setMaxGuests(parseInt(e.target.value, 10))}
              className="bg-[#FAF9F6] border border-[#EDE7DC] rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-[11px] font-bold text-[#102A43]/70 uppercase tracking-wide mb-1 flex items-center gap-1">
            <AlignLeft className="w-3 h-3 text-[#C6922E]" />
            <span>Description / Details</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('ownerPlaceholderDesc')}
            rows={4}
            className={`bg-[#FAF9F6] border ${errors.description ? 'border-red-400' : 'border-[#EDE7DC]'} rounded-xl p-3.5 text-xs font-medium focus:outline-none focus:border-[#C6922E]`}
          />
          {errors.description && <span className="text-[10px] text-red-500 mt-1">{errors.description}</span>}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label className="text-[11px] font-bold text-[#102A43]/70 uppercase tracking-wide mb-1 flex items-center gap-1">
            <MessageSquare className="w-3 h-3 text-[#C6922E]" />
            <span>{language === 'en' ? 'Additional Message' : 'Message additionnel'}</span>
          </label>
          <textarea
            value={additionalMessage}
            onChange={(e) => setAdditionalMessage(e.target.value)}
            placeholder="e.g. Notes about generator, borehole water, security gate..."
            rows={2}
            className="bg-[#FAF9F6] border border-[#EDE7DC] rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#C6922E] resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-4 bg-[#102A43] hover:bg-[#C6922E] text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-colors"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>{uploadStatus || 'Please wait...'}</span>
            </>
          ) : (
            <span>{t('submitApartment')}</span>
          )}
        </button>

      </form>
    </div>
  );
};
