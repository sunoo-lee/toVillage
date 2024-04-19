"use client";

import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();
  const buttonClickHandler = (event: any) => {
    event.preventDefault();
    router.push("/project");
  };
  const signInHandler = (event: any) => {
    event.preventDefault();
    router.push("/auth/sign-in");
  };
  const joinHandler = (event: any) => {
    event.preventDefault();
    router.push("/auth/join");
  };
  return (
    <div className="h-full flex justify-center items-center">
      <div className="bg-amber-600 p-12 py-28 text-center rounded-3xl ">
        <div className="text-5xl">
          <div>to village</div>
        </div>
        <div className="py-4">
          <span className="text-8xl text-white">&#9873;</span>
        </div>
        <div>
          <button
            onClick={joinHandler}
            className="bg-neutral-200 w-full py-3 text-2xl font-medium"
          >
            이메일로 회원가입
          </button>
          <div className="flex items-center py-2">
            <div className="bg-black h-1 w-full"></div>
            <div className="px-4">or</div>
            <div className="bg-black h-1 w-full"></div>
          </div>
          <div className="flex justify-between gap-2">
            <button
              onClick={buttonClickHandler}
              className="bg-white w-full py-2"
            >
              카카오
            </button>
            <button
              onClick={buttonClickHandler}
              className="bg-white w-full py-2"
            >
              구글
            </button>
          </div>
          <button
            onClick={signInHandler}
            className="w-full bg-slate-200 mt-4 p-2 text-sm font-medium"
          >
            이미 계정이 있으신가요? 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
