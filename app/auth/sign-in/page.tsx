"use client";

import userInfoStore from "@/store/userInfoStore";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoIcon from "@/assets/ui/logo_icon.svg";
import Logo from "@/assets/ui/tovillage.svg";
import LoginBtn from "@/assets/ui/login_enter.svg";
import LoginUI from "@/assets/ui/main_login.svg";

interface UserInfo {
  email: string;
  pwd: string;
}

export default function Sign() {
  const [email, setEmail] = useState("test1@gmail.com");
  const [pwd, setPwd] = useState("qwerqwerqwer");
  const [loginCheck, setLoginCheck] = useState(false);
  const loginHandler = userInfoStore((state) => state.loginHandler);
  const router = useRouter();

  useEffect(() => {
    console.log(loginCheck);
  }, [loginCheck]);

  const onChangeHandler = (event: any) => {
    const { checked } = event.target;
    setLoginCheck(checked);
    console.log(loginCheck);
  };

  const onSubmitHandler = async () => {
    const userInfo = {
      email,
      pwd,
    };
    await loginHandler(userInfo, loginCheck);
    router.push("/main");
    console.log(userInfo);
  };

  const onEmailChangeHandler = (event: any) => {
    setEmail(event.target.value);
  };

  const onPwdChangeHandler = (event: any) => {
    setPwd(event.target.value);
  };

  const buttonClickHandler = (event: any) => {
    event.preventDefault();
    onSubmitHandler();
  };
  return (
    <div className="relative w-full h-full px-12  z-50 text-center flex flex-col justify-center">
      <div className="relative w-full">
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
        <div className="relative mb-4">
          <Image
            src={LoginUI}
            alt="login ui"
            className="relative z-0 w-full h-auto"
          />
          <div className="absolute top-0 p-4 pt-10">
            <input
              placeholder="email"
              className=" bg-transparent w-full text-xl mb-3 px-2 outline-none"
              value={email}
              onChange={onEmailChangeHandler}
            />
            <input
              placeholder="password"
              className=" bg-transparent w-full text-xl  px-2 outline-none"
              value={pwd}
              onChange={onPwdChangeHandler}
            />
            <div className="flex justify-between text-xs font-medium text-right text-white select-none">
              <div className="flex items-center pl-1">
                <input
                  type="checkbox"
                  name="auto-login"
                  id="auto-login"
                  value="auto-login"
                  onChange={onChangeHandler}
                />
                <label htmlFor="auto-login">자동 로그인</label>
              </div>
              <div>비밀번호를 잊으셨나요?</div>
            </div>
          </div>
        </div>
        <button
          onClick={buttonClickHandler}
          className="relative text-center w-full h-auto flex justify-center items-center"
        >
          <Image
            src={LoginBtn}
            alt="sns login button"
            className="relative z-0 w-full h-auto"
          />
          <div className="absolute font-bold z-10 w-full text-lg tracking-tighter whitespace-nowrap  text-[#F3E8E3] text-shadow shadow-[#6B4B45]">
            로그인
          </div>
        </button>
      </div>
    </div>
  );
}
