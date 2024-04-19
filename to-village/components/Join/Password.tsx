"use client";

import { useEffect, useState } from "react";

interface Props {
  password: string;
  setPassword: (password: string) => void;
}

export default function Password({ password, setPassword }: Props) {
  const [pwdCheck, setPwdCheck] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkboxChangeHanlder = (event: any) => {
    let input;
    if (event.target.checked) {
      input = true;
    } else {
      input = false;
    }
    setPwdCheck(input);
  };

  const inputChangehandler = (event: any) => {
    const input = event.target.value;
    setPassword(input);
  };

  useEffect(() => {
    if (password.length < 6) {
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
    }
  }, [password]);

  return (
    <div className="px-8 ">
      <div className="text-4xl font-bold mb-8">비밀번호를 입력해주세요.</div>
      <div className="mb-2 text-xs text-neutral-500">
        영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 10자리 이상 또는
        3종류 이상을 조합하여 최소 8자리 이상의 길이로 구성
      </div>
      <div className="mb-2">
        <div className="w-full relative border-b border-black">
          <input
            className="w-full relative outline-none  bg-transparent py-1"
            type={pwdCheck ? "text" : "password"}
            name="user-password"
            id="user-password"
            placeholder="password"
            onChange={inputChangehandler}
            value={password}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <input
            onChange={checkboxChangeHanlder}
            value="check"
            type="checkbox"
            name="user-check"
            id="user-check"
          />
          <label htmlFor="user-check">비밀번호 보기</label>
        </div>
        <div className="text-sm text-red-500">
          {!isCorrect && "규칙에 맞지 않습니다."}
        </div>
      </div>
    </div>
  );
}
