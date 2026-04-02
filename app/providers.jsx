"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLanguage, supportedLanguages, translations } from "./i18n/translations";

const I18nContext = createContext(null);

const getValueFromPath = (object, path) =>
  path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), object);

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("language") : null;
    const nextLang = supportedLanguages.includes(stored || "") ? stored : null;

    if (nextLang && nextLang !== language) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(nextLang);
    }
  }, [language]);

  const persistLanguage = (lang) => {
    if (!supportedLanguages.includes(lang)) return;
    setLanguage(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", lang);
    }
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage: persistLanguage,
      t: (path) => {
        const current = translations[language] || translations[defaultLanguage];
        return getValueFromPath(current, path);
      },
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
