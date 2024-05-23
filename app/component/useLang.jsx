import { useState, useEffect } from "react";

const useLang = () => {
  const [lang, setLang] = useState("ch");

  useEffect(() => {
    const fetchLang = async () => {
      if (typeof window !== "undefined") {
        const storedLang = localStorage.getItem("lang") || "ch";
        setLang(storedLang);
      }
    };

    fetchLang();
  }, [lang]);

  return lang;
};

export default useLang;
