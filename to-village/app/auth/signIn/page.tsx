"use client";

import { useRouter } from "next/navigation";

export default function Sign() {
  const router = useRouter();
  const buttonClickHandler = (event: any) => {
    event.preventDefault();
    router.push("/project");
  };
  return (
    <div className="mt-16 text-center w-full h-full">
      <div className="bg-amber-600 mt-16 mx-20 p-12 py-28 text-center rounded-3xl ">
        <div className=" text-5xl">
          <div>to village</div>
        </div>
        <div className="py-4">
          <span className="text-8xl text-white">&#9873;</span>
        </div>
        <div>
          <input
            placeholder="email"
            className="bg-neutral-200 w-full py-3 text-2xl font-medium mb-2 px-2 outline-none"
          />
          <input
            placeholder="password"
            className="bg-neutral-200 w-full py-3 text-2xl font-medium mb-2 px-2 outline-none"
          />
          <div className="text-sm font-medium text-right text-white">
            비밀번호를 잊으셨나요?
          </div>
          <button
            onClick={buttonClickHandler}
            className="w-full bg-slate-200 mt-4 p-2 text-sm font-medium"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
