import { useState, useEffect } from "react";

const useLang = () => {
  const [lang, setLang] = useState("ch");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang") || "ch";
      setLang(storedLang);
    }
  }, []);

  return lang;
};

export default useLang;
