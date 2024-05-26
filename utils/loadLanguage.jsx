import { useState, useEffect } from "react";

// Singleton for managing language settings
class LanguageLoader {
  static instance = null;

  constructor() {
    if (LanguageLoader.instance) {
      return LanguageLoader.instance;
    }

    this.language = localStorage.getItem("lang") || "en"; // Default language is 'en'
    LanguageLoader.instance = this;
  }

  getLanguage() {
    return this.language;
  }

  setLanguage(lang) {
    this.language = lang;
    localStorage.setItem("lang", lang);
  }

  async loadPageLanguage(page, lang) {
    try {
      const response = await fetch(`/lang/${lang}/${page}.json`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to load language file:", error);
      return null;
    }
  }
}

// Hook for using language in a React component
const useLanguage = (page, initialLang) => {
  const [languageData, setLanguageData] = useState(null);
  const [language, setLanguage] = useState(initialLang);

  useEffect(() => {
    setLanguage(initialLang);
  }, [initialLang]);

  useEffect(() => {
    const loadLanguage = async () => {
      const loader = new LanguageLoader();
      const data = await loader.loadPageLanguage(page, language);
      setLanguageData(data);
    };

    loadLanguage();
  }, [page, language]);

  return languageData;
};

export { LanguageLoader, useLanguage };
