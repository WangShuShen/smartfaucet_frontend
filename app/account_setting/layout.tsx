import Navbar from "../component/Navbar";
import Title from "./component/Title";
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
        {children}
      </div>
    </section>
  );
}
