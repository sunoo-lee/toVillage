"use client";

import { useEffect, useState } from "react";

interface Props {
  code: string;
  setCode: (code: string) => void;
  setState: () => void;
}

export default function Authenticode({ code, setCode, setState }: Props) {
  const [isCorrect, setIsCorrect] = useState(false);

  const inputChangehandler = (event: any) => {
    const input = event.target.value;
    setCode(input);
  };
  const codeRequestButtonHandler = (event: any) => {
    event.preventDefault();
  };
  const onKeyPressHandler = (event: any) => {
    if (event.key === "Enter") {
      setState();
    }
  };
  useEffect(() => {
    if (code === "000000") {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [code]);

  return (
    <div className="w-full">
      <div className="relative">
        <div className="relative z-0">
          <input
            className="block w-full text-sm border-0 border-b-2 text-gray-900  border-gray-300 bg-transparent px-1 pt-2 appearance-none focus:outline-none focus:ring-0 focus:border-[#6B4B45] peer"
            type="text"
            name="user-auth-code"
            id="user-auth-code"
            onChange={inputChangehandler}
            onKeyDown={onKeyPressHandler}
            value={code}
            placeholder=" "
            autoComplete="off"
            autoFocus={true}
          />
          <label
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#6B4B45] peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 "
            htmlFor="user-email"
          >
            인증코드
          </label>
        </div>
        <button
          onClick={codeRequestButtonHandler}
          className="absolute text-sm top-0 right-0 bg-slate-300 px-2  py-0.5 "
        >
          재전송
        </button>
      </div>
      <div className="relative text-red-500 text-xs">
        <span>{!isCorrect ? "인증코드가 일치하지 않습니다." : "　"}</span>
        <span className="absolute bottom-0 right-0 text-red-500">3:00</span>
      </div>
    </div>
  );
}
