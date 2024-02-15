import Navbar from "../component/Navbar";
import Title from "../component/Title";
import BackButton from "@/app/component/BackButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="bg-bg-gradient w-auto">
        <Navbar></Navbar>
        <div className="flex justify-between items-center">
          <Title text="專案設定" />
          <BackButton />
        </div>
        {children}
      </div>
    </section>
  );
}
