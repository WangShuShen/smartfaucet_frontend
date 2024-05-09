import Provider from "../redux/provider";

export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Provider>{children}</Provider>
    </section>
  );
}
