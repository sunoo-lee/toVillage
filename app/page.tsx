"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/ui/tovillage.svg";
import ContainerBox from "@/components/UI/ContainerBox";

export default function Home() {
  const cleanToken = () => {
    localStorage.clear();
    sessionStorage.clear();
  };
  return (
    <main className="h-full w-full bg-[#92AE6D] py-10 grid place-items-center select-none scrollbar-hide">
      <ContainerBox>
        <button
          onClick={cleanToken}
          className="absolute h-10 font-bold bg-center bg-no-repeat bg-cover top-5 left-5 bg-login-login-1 w-44 "
        >
          토큰 지우기
        </button>
        <div className="relative max-h-[36rem] h-full grid place-items-center ">
          <Link href="/auth">
            <div>
              <Image src={Logo} alt="logo image" className="w-full h-auto" />
            </div>
            <div className="my-6 text-4xl font-bold">시작화면 (임시)</div>
            <div className="text-2xl text-center ">터치해서 시작</div>
          </Link>
        </div>
      </ContainerBox>
    </main>
  );
}
