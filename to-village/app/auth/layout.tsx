export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full w-full bg-orange-200">{children}</div>;
}
