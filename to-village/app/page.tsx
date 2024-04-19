import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen bg-orange-300 select-none scrollbar-hide">
      <Link href="/auth">
        <div className="h-full flex justify-center items-center flex-col">
          <div className="text-4xl font-bold mb-12">시작화면 (임시)</div>
          <div className="text-2xl font-medium  mb-12">터치해서 시작</div>
        </div>
      </Link>
    </main>
  );
}
