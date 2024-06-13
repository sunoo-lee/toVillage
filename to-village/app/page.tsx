"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/ui/tovillage.svg";
import AuthPageBox from "@/components/UI/AuthPageBox";

export default function Home() {
  const cleanToken = () => {
    localStorage.clear();
  };
  return (
    <main className="h-full w-full bg-[#92AE6D] py-10 grid place-items-center select-none scrollbar-hide">
      <AuthPageBox>
        <div className="relative max-h-[36rem] h-full grid place-items-center ">
          <button
            onClick={cleanToken}
            className="absolute top-5 left-5 font-bold bg-login-login-1 bg-center bg-cover bg-no-repeat w-44 h-10  "
          >
            토큰 지우기
          </button>
          <Link href="/auth">
            <div>
              <Image src={Logo} alt="logo image" className="w-full h-auto" />
            </div>
            <div className="text-4xl font-bold my-6">시작화면 (임시)</div>
            <div className="text-2xl text-center ">터치해서 시작</div>
          </Link>
        </div>
      </AuthPageBox>
    </main>
  );
}
