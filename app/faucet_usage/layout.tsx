import Navbar from "../component/Navbar";
import BackButton from "../component/BackButton";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="w-auto">
        <Navbar></Navbar>
        <div className="flex justify-end my-2">
          <BackButton />
        </div>
        {children}
      </div>
    </section>
  );
}
