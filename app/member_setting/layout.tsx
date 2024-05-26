"use client";
import Navbar from "../component/Navbar";
import Title from "../component/Title";
import BackButton from "@/app/component/BackButton";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = useLang();
  const languageData = useLanguage("member_setting", lang);
  if (!languageData) {
    return <div>Loading...</div>;
  }
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
