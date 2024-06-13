"use client";

import AuthPageBox from "@/components/UI/AuthPageBox";
import Email from "@/assets/ui/login_email_1.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();
  const signoutHandler = () => {
    localStorage.clear();
    router.push("/");
  };
  const removeAccountHandler = () => {
    window.confirm("정말 탈퇴하시겠습니까?");
    window.alert("탈퇴가 완료되었습니다.");
    signoutHandler();
  };
  return (
    <div className="h-full w-full bg-[#92AE6D] py-10 grid place-items-center">
      <AuthPageBox>
        <div className="space-y-2">
          <div className="text-center font-bold text-3xl mb-10">계정 관리</div>
          <button
            onClick={signoutHandler}
            className="relative text-center w-full h-fit grid place-items-center "
          >
            <Image
              src={Email}
              alt="email login button"
              className="relative z-0 top-0 left-0 right-0 w-full h-auto"
            />
            <div className="absolute z-10 w-full tracking-tighter text-2xl whitespace-nowrap text-[#F3E8E3] text-shadow shadow-[#6B4B45] ">
              로그아웃
            </div>
          </button>
          <button
            onClick={removeAccountHandler}
            className="relative text-center w-full h-fit grid place-items-center "
          >
            <Image
              src={Email}
              alt="email login button"
              className="relative z-0 top-0 left-0 right-0 w-full h-auto"
            />
            <div className="absolute z-10 w-full tracking-tighter text-2xl whitespace-nowrap text-[#F3E8E3] text-shadow shadow-[#6B4B45] ">
              회원탈퇴
            </div>
          </button>
        </div>
      </AuthPageBox>
    </div>
  );
}
