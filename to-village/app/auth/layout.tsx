import AuthPageBox from "@/components/UI/AuthPageBox";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full bg-[#92AE6D] py-10 grid place-items-center">
      <AuthPageBox>{children}</AuthPageBox>
    </div>
  );
}
