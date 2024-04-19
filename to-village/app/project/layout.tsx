import { Inter } from "next/font/google";
import Weekly from "@/components/WeeklyCalendar/Weekly";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto relative flex min-h-screen flex-col items-center max-w-7xl bg-white ">
      <Header />
      <Weekly />
      {children}
    </div>
  );
}
