import Calendar from "@/components/Calendar/Calendar";
import Project from "@/components/Projects/Project";
import Weekly from "@/components/WeeklyCalendar/Weekly";

export default function Home() {
  return (
    <main className="container mx-auto relative flex min-h-screen flex-col items-center max-w-7xl bg-white">
      {/* <Calendar /> */}
      <Weekly />
      <Project />
    </main>
  );
}
