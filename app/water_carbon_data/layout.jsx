"use client";

import Navbar from "../component/Navbar";
import Title from "./component/Title";
import BackButton from "@/app/component/BackButton";
import withLanguage from "./service/withLanguage";

const DashboardLayout = ({ children, languageData }) => {
  return (
    <section>
      <div className="bg-bg-gradient w-auto">
        <Navbar></Navbar>
        <div className="flex justify-between items-center">
          <Title text={languageData.title} />
          <BackButton />
        </div>
        {children}
      </div>
    </section>
  );
}

export default withLanguage(DashboardLayout);
