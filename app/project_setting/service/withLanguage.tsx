import React, { useEffect } from "react";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";

const withLanguage = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const lang = useLang();
    const languageData = useLanguage("project_setting", lang);

    useEffect(() => {
      console.log("Language data:", languageData);
    }, [languageData]);

    if (!languageData) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} languageData={languageData} lang={lang} />;
  };
};

export default withLanguage;
