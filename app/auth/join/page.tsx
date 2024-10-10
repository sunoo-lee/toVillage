"use client";

import Authenticode from "@/components/Join/Authenticode";
import Email from "@/components/Join/Email";
import Finish from "@/components/Join/Finish";
import Password from "@/components/Join/Password";
import userInfoStore from "@/store/userInfoStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EmailBox from "@/assets/ui/login_email_1.svg";
// import EmailBox from "@/assets/ui/login_sns_1.svg";

export default function Join() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [code, setCode] = useState("");
  const [state, setState] = useState(1);
  const resistNewUesr = userInfoStore((state) => state.resistNewUesr);
  const loginHandler = userInfoStore((state) => state.loginHandler);

  const router = useRouter();

  const completeButtonHandle = async (event: any) => {
    event.preventDefault();
    const userInfo = {
      email,
      pwd,
    };
    await resistNewUesr(userInfo);
    await loginHandler(userInfo, false);
    router.push("/project");
  };

  const stateHandler = () => {
    // if (state === "email") {
    //   setState("code");
    // } else if (state === "code") {
    //   setState("password");
    // } else if (state === "password") {
    //   setState("finish");
    // }
    setState((prev) => prev + 1);
    console.log(state, email, pwd, code);
  };

  return (
    <div className="relative w-full h-full  grid place-items-center">
      <div className="relative w-full h-full max-h-[36rem] p-12 flex flex-col justify-between">
        {state !== 4 ? (
          <div className=" space-y-6 transform duration-300 transition-[height]">
            {state > 2 && (
              <Password
                password={pwd}
                setPassword={setPwd}
                setState={stateHandler}
              />
            )}
            {state > 1 && (
              <Authenticode
                code={code}
                setCode={setCode}
                setState={stateHandler}
              />
            )}
            {state > 0 && (
              <Email
                email={email}
                setEmail={setEmail}
                setState={stateHandler}
              />
            )}
          </div>
        ) : (
          <Finish email={email} />
        )}
        <>
          {state < 4 && (
            <button
              onClick={stateHandler}
              className="relative w-auto grid place-items-center"
            >
              <Image
                src={EmailBox}
                alt="email login button"
                className="relative z-0 top-0 left-0 right-0 w-full h-auto"
              />
              <span className="absolute z-10 tracking-tighter font-bold text-3xl whitespace-nowrap text-[#F3E8E3] text-shadow shadow-[#6B4B45] ">
                다음
              </span>
            </button>
          )}
          {state === 4 && (
            <button
              onClick={completeButtonHandle}
              className="relative w-auto grid place-items-center"
            >
              <Image
                src={EmailBox}
                alt="email login button"
                className="relative z-0 top-0 left-0 right-0 w-full h-auto"
              />
              <span className="absolute z-10 tracking-tighter font-bold text-3xl whitespace-nowrap text-[#F3E8E3] text-shadow shadow-[#6B4B45] ">
                완료
              </span>
            </button>
          )}
        </>
      </div>
    </div>
  );
}
