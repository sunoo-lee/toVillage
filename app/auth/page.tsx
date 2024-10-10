"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Main from "@/assets/ui/login_main.svg";
import Logo from "@/assets/ui/tovillage.svg";
import LogoIcon from "@/assets/ui/logo_icon.svg";
import Email from "@/assets/ui/login_email_1.svg";
import SNS from "@/assets/ui/login_sns_1.svg";
import userInfoStore from "@/store/userInfoStore";

export default function Auth() {
  const loginHandler = userInfoStore((state) => state.loginHandler);
  const router = useRouter();
  const buttonClickHandler = (event: any) => {
    event.preventDefault();
    router.push("/main");
  };
  const signInHandler = (event: any) => {
    event.preventDefault();
    router.push("/auth/sign-in");
  };
  const joinHandler = (event: any) => {
    event.preventDefault();
    router.push("/auth/join");
  };

  useEffect(() => {
    const access_token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    if (access_token) {
      router.push("/main");
    }
  });

  return (
    <div className="relative w-full h-full px-12  z-50 text-center flex flex-col justify-center">
      <div className="relative w-full">
        <Image src={Logo} alt="logo image" className="w-full h-auto" />
      </div>
      <div className="text-center mb-6">
        <Image
          src={LogoIcon}
          alt="logo icon"
          className="w-3/5 h-auto mx-auto"
        />
      </div>
      <div className="space-y-1 font-bold ">
        <button
          onClick={joinHandler}
          className="relative text-center w-full h-fit flex justify-center items-center "
        >
          <Image
            src={Email}
            alt="email login button"
            className="relative z-0 top-0 left-0 right-0 w-full h-auto"
          />
          <div className="absolute z-10 w-full tracking-tighter text-3xl whitespace-nowrap text-[#F3E8E3] text-shadow shadow-[#6B4B45] ">
            이메일로 시작하기
          </div>
        </button>
        <div className="relative flex justify-between gap-2">
          <button
            onClick={buttonClickHandler}
            className="relative text-center w-full h-auto flex justify-center items-center"
          >
            <Image
              src={SNS}
              alt="sns login button"
              className="relative z-0 w-full h-auto"
            />
            <div className="absolute z-10 w-full text-xl text-[#F3E8E3] text-shadow shadow-[#6B4B45]">
              KAKAO
            </div>
          </button>
          <button
            onClick={buttonClickHandler}
            className="relative text-center w-full h-auto flex justify-center items-center"
          >
            <Image
              src={SNS}
              alt="sns login button"
              className="relative z-0 w-full h-auto"
            />
            <div className="absolute z-10 w-full text-xl text-[#F3E8E3] text-shadow shadow-[#6B4B45]">
              Google
            </div>
          </button>
        </div>
        <button
          onClick={signInHandler}
          className="relative text-center w-full h-auto flex justify-center items-center"
        >
          <Image
            src={Email}
            alt="sns login button"
            className="relative z-0 w-full h-auto"
          />
          <div className="absolute z-10 w-full text-lg tracking-tighter whitespace-nowrap  text-[#F3E8E3] text-shadow shadow-[#6B4B45]">
            이미 계정이 있으신가요? 로그인
          </div>
        </button>
      </div>
    </div>
  );
}
