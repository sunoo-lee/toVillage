"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const buttonClickHandler = (event: any) => {
    event.preventDefault();
    router.back();
  };
  return (
    <div className="absolute top-0 left-0 right-0 z-40 flex justify-between w-full px-4 py-2 text-2xl bg-slate-300">
      <div>
        <span>&#9820;</span>
        <span>LV.3</span>
      </div>
      <div className="flex">
        <div>&#9817; 10,000</div>
        <div className="ml-4">&#8364; 10,000</div>
      </div>
    </div>
  );
}
