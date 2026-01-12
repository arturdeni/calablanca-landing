import es from './es.json';
import en from './en.json';

export const languages = {
  es: 'Español',
  en: 'English'
};

export const defaultLang = 'es';

export const translations = {
  es,
  en
};

export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang;
  return defaultLang;
}

export function useTranslations(lang) {
  return function t(key) {
    const keys = key.split('.');
    let value = translations[lang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };
}
