import React, { useEffect } from "react";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";

const withLanguage = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const lang = useLang();
    const languageData = useLanguage("water_carbon_data", lang);

    useEffect(() => {}, [languageData]);

    if (!languageData) {
      return <div>Loading...</div>;
    }

    return (
      <WrappedComponent {...props} languageData={languageData} lang={lang} />
    );
  };
};

export default withLanguage;
