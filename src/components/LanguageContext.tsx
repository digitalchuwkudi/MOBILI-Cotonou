import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';
import { getSavedLanguage, saveLanguage as persistLanguage } from '../services/translationService';

export type Currency = 'XOF' | 'EUR' | 'USD';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (priceXOF: number) => string;
  convertPrice: (priceXOF: number) => number;
  currencySymbol: string;
  t: (key: any, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import { translate } from '../services/translationService';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [currency, setCurrencyState] = useState<Currency>('XOF');

  useEffect(() => {
    setLanguageState(getSavedLanguage());
    const savedCurr = localStorage.getItem('mobili_curr');
    if (savedCurr === 'XOF' || savedCurr === 'EUR' || savedCurr === 'USD') {
      setCurrencyState(savedCurr);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    persistLanguage(lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('mobili_curr', curr);
  };

  const convertPrice = (priceXOF: number): number => {
    if (currency === 'EUR') {
      return Math.round(priceXOF / 655.957);
    }
    if (currency === 'USD') {
      return Math.round(priceXOF / 600);
    }
    return priceXOF;
  };

  const formatPrice = (priceXOF: number): string => {
    const converted = convertPrice(priceXOF);
    const locale = language === 'en' ? 'en-US' : 'fr-FR';
    const formatted = new Intl.NumberFormat(locale).format(converted);

    if (currency === 'EUR') {
      return language === 'en' ? `€${formatted}` : `${formatted} €`;
    }
    if (currency === 'USD') {
      return `$${formatted}`;
    }
    return language === 'en' ? `${formatted} CFA` : `${formatted} FCFA`;
  };

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : 'FCFA';

  const t = (key: any, replacements?: Record<string, string>): string => {
    return translate(key, language, replacements);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, setCurrency, formatPrice, convertPrice, currencySymbol, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
