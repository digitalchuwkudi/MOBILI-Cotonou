import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { WHATSAPP_CONFIG, buildWhatsAppLink } from '../services/whatsappService';
import { trackEvent } from '../services/analytics';

export const ContactUs = () => {
  const { language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    trackEvent('Contact form submitted', { name, email });

    try {
      const response = await fetch('https://formspree.io/f/xnpqgboz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message
        })
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const directWhatsApp = buildWhatsAppLink(
    language === 'en'
      ? 'Hello Mobili Cotonou, I am contacting you from the Home Page contact section.'
      : 'Bonjour Mobili Cotonou, je vous contacte depuis la section contact de la page d’accueil.'
  );

  return (
    <section className="py-20 bg-white" id="contact-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6922E] block mb-2">
            {language === 'en' ? 'Get In Touch' : 'Contactez-Nous'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
            {language === 'en' ? 'We’re Here to Assist You' : 'Nous sommes à votre entière disposition'}
          </h2>
          <p className="text-sm text-[#172033]/60 leading-relaxed mt-4">
            {language === 'en'
              ? 'Have questions about booking, neighborhood guidelines, or custom stays? Reach out and our team will get back to you shortly.'
              : 'Des questions sur une réservation, un quartier ou un séjour sur mesure ? Écrivez-nous et notre équipe vous répondra dans les plus brefs délais.'}
          </p>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Calls Card */}
            <div className="bg-[#FAF9F6] border border-[#EDE7DC]/70 rounded-2xl p-6 flex items-start gap-4 hover:border-[#C6922E]/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#143D2A]/10 text-[#143D2A] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-[#102A43]">
                  {language === 'en' ? 'Phone Calls' : 'Appels Téléphoniques'}
                </h3>
                <p className="text-xs text-[#172033]/60 leading-relaxed">
                  {language === 'en' ? 'Call us directly for immediate reservation assistance.' : 'Appelez-nous directement pour une assistance immédiate.'}
                </p>
                <div className="pt-2">
                  <a
                    href="tel:+2290192206612"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#143D2A] hover:text-[#C6922E] transition-colors underline"
                  >
                    <span>+229 01 92 20 66 12</span>
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-[#FAF9F6] border border-[#EDE7DC]/70 rounded-2xl p-6 flex items-start gap-4 hover:border-[#C6922E]/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#143D2A]/10 text-[#143D2A] flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-[#102A43]">
                  WhatsApp
                </h3>
                <p className="text-xs text-[#172033]/60 leading-relaxed">
                  {language === 'en' ? 'Chat instantly with our local support coordinators.' : 'Discutez instantanément avec nos coordinateurs de support.'}
                </p>
                <div className="pt-2">
                  <a
                    href={directWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('WhatsApp click', { source: 'Contact us card' })}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#143D2A] hover:text-[#C6922E] transition-colors"
                  >
                    <span>+229 01 92 20 66 12</span>
                    <span className="text-[#EDE7DC]">&bull;</span>
                    <span className="underline uppercase">{language === 'en' ? 'CHAT ON WHATSAPP' : 'DISCUTER SUR WHATSAPP'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-[#FAF9F6] border border-[#EDE7DC]/70 rounded-2xl p-6 flex items-start gap-4 hover:border-[#C6922E]/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#C6922E]/10 text-[#C6922E] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-[#102A43]">
                  Email Support
                </h3>
                <p className="text-xs text-[#172033]/60 leading-relaxed">
                  {language === 'en' ? 'Send us a detailed inquiry for corporate leases or partnerships.' : 'Envoyez-nous une demande détaillée pour les baux d’entreprise.'}
                </p>
                <div className="pt-1">
                  <a
                    href="mailto:digitalchukwudi@gmail.com"
                    className="text-xs font-bold text-[#102A43] hover:text-[#C6922E] transition-colors underline"
                  >
                    digitalchukwudi@gmail.com
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Interactive message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF9F6] border border-[#EDE7DC]/80 rounded-3xl p-8 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-[#102A43] mb-6">
              {language === 'en' ? 'Send Us a Secure Message' : 'Envoyer un Message Sécurisé'}
            </h3>

            {status === 'success' ? (
              <div className="bg-[#315C4A]/10 border border-[#315C4A]/20 text-[#315C4A] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="font-bold text-sm">
                    {language === 'en' ? 'Inquiry Sent Successfully' : 'Message Envoyé avec Succès'}
                  </span>
                </div>
                <p className="text-xs leading-relaxed">
                  {language === 'en'
                    ? 'Thank you for reaching out. A booking coordinator has been assigned to your query and will reply via email or phone within 2 hours.'
                    : 'Merci pour votre confiance. Un coordinateur a été affecté à votre demande et vous répondra par e-mail ou téléphone sous 2 heures.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl p-3 flex items-center gap-2 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{language === 'en' ? 'Please fill out all required fields.' : 'Veuillez remplir tous les champs obligatoires.'}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#102A43]/50">
                      {language === 'en' ? 'Full Name' : 'Nom Complet'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-white border border-[#EDE7DC] rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-[#C6922E]"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#102A43]/50">
                      {language === 'en' ? 'Phone Number' : 'Numéro de Téléphone'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+229 90 00 00 00"
                      className="w-full bg-white border border-[#EDE7DC] rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-[#C6922E]"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#102A43]/50">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane.doe@example.com"
                    className="w-full bg-white border border-[#EDE7DC] rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-[#C6922E]"
                  />
                </div>

                {/* Message field */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#102A43]/50">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={language === 'en' ? 'Describe your travel dates, stay type and preferences...' : 'Décrivez vos dates de voyage, type de séjour et préférences...'}
                    className="w-full bg-white border border-[#EDE7DC] rounded-xl p-4 text-xs font-semibold focus:outline-none focus:border-[#C6922E] resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#102A43] hover:bg-[#C6922E] disabled:bg-[#102A43]/50 text-white rounded-xl font-bold tracking-wide text-xs uppercase transition-colors"
                >
                  {status === 'loading' ? (
                    <span>{language === 'en' ? 'Sending...' : 'Envoi en cours...'}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{language === 'en' ? 'Submit Inquiry' : 'Envoyer la Demande'}</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
