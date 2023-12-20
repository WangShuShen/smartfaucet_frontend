export default function SimpleLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
