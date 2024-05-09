import Navbar from "../component/Navbar";

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
