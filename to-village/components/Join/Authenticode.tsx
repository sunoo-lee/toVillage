"use client";

import { useEffect, useState } from "react";

interface Props {
  code: string;
  setCode: (code: string) => void;
}

export default function Authenticode({ code, setCode }: Props) {
  const [isCorrect, setIsCorrect] = useState(false);

  const inputChangehandler = (event: any) => {
    const input = event.target.value;
    setCode(input);
  };
  const codeRequestButtonHandler = (event: any) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (code === "000000") {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [code]);

  return (
    <div className="px-8 ">
      <div className="text-4xl font-bold mb-8">인증코드를 입력해주세요.</div>
      <div className="flex items-center">
        <div className="relative border-b border-black">
          <input
            className="relative outline-none  bg-transparent py-1"
            type="text"
            name="user-auth-code"
            id="user-auth-code"
            placeholder="인증코드"
            autoComplete="off"
            onChange={inputChangehandler}
            value={code}
          />
          <span className="relative right-0 text-red-500">3:00</span>
        </div>
        <button
          onClick={codeRequestButtonHandler}
          className="ml-4 bg-slate-200 px-2 py-1 "
        >
          재전송
        </button>
      </div>
      <div className="text-red-500 text-sm">
        {!isCorrect && "인증코드가 일치하지 않습니다."}
      </div>
    </div>
  );
}
