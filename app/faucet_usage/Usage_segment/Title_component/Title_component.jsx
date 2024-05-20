"use client";
import React from "react";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";
export default function Title_Component() {
  const lang = useLang();
  const languageData = useLanguage("faucet_usage", lang);

  if (!languageData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="ml-8 mr-12 mt-6">
      <p className="text-[#0C659E] font-extrabold text-2xl">
        {languageData.title}
      </p>
    </div>
  );
}
