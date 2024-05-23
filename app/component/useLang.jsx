import { useState, useEffect } from "react";

const useLang = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const fetchLang = async () => {
      if (typeof window !== "undefined") {
        const storedLang = localStorage.getItem("lang") || "en";
        setLang(storedLang);
      }
    };

    fetchLang();
  }, [lang]);

  return lang;
};

export default useLang;
