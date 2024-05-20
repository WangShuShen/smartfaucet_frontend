"use client";

import React from "react";
import Navbar from "../component/Navbar";
import Title from "../component/Title";
import BackButton from "@/app/component/BackButton";
import withLanguage from "./service/withLanguage";

interface DashboardLayoutProps {
  children: React.ReactNode;
  languageData: {
    title: string;
  };
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, languageData }) => {
  return (
    <section>
      <div className="bg-bg-gradient w-auto">
        <Navbar />
        <div className="flex justify-between items-center">
          <Title text={languageData.title} />
          <BackButton />
        </div>
        {children}
      </div>
    </section>
  );
};

export default withLanguage(DashboardLayout);
