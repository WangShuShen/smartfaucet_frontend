import { useSelector, useDispatch } from "react-redux";
import { setLang } from "@/app/redux/lang/langSlice";
import { useEffect } from "react";

const useLang = () => {
  const lang = useSelector((state) => state.lang);
  const dispatch = useDispatch();

  const changeLang = (newLang) => {
    dispatch(setLang(newLang));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang");
      if (storedLang !== lang && storedLang) {
        changeLang(storedLang);
      }
    }
  }, [lang]);

  return lang;
};

export default useLang;
