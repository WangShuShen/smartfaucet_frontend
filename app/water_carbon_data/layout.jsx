import Navbar from "../component/Navbar";
import Title from "./component/Title";
import BackButton from "@/app/component/BackButton";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <div className="bg-bg-gradient w-auto">
        <Navbar></Navbar>
        <div className="flex justify-between items-center">
          <Title text="用水及碳排數據" />
          <BackButton />
        </div>
        {children}
      </div>
    </section>
  );
}
