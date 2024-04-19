"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const buttonClickHandler = (event: any) => {
    event.preventDefault();
    router.back();
  };
  return (
    <div className=" fixed justify-between px-4 py-2 top-0 left-0 flex w-full bg-slate-400 text-2xl">
      <div className="flex">
        <button onClick={buttonClickHandler} className="mr-4">
          &#8630;
        </button>
        <div>Project</div>
      </div>
      <div className="flex">
        <div>&#9814; LV.3</div>
        <div className="ml-4">&#8364; 10,000</div>
      </div>
    </div>
  );
}
