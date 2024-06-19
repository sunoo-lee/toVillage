"use client";

import { useEffect, useState } from "react";

interface Props {
  password: string;
  setPassword: (password: string) => void;
  setState: () => void;
}

export default function Password({ password, setPassword, setState }: Props) {
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
  const onKeyPressHandler = (event: any) => {
    if (event.key === "Enter") {
      setState();
    }
  };

  useEffect(() => {
    if (password.length < 6) {
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
    }
  }, [password]);

  return (
    <div className="w-full">
      <div className="mb-2">
        <div className="relative z-0">
          <input
            className="block w-full text-sm border-0 border-b-2 text-gray-900  border-gray-300 bg-transparent px-1 pt-2 appearance-none focus:outline-none focus:ring-0 focus:border-[#6B4B45] peer"
            type={pwdCheck ? "text" : "password"}
            name="user-password"
            id="user-password"
            placeholder=" "
            onChange={inputChangehandler}
            onKeyDown={onKeyPressHandler}
            value={password}
            autoComplete="off"
            autoFocus={true}
          />
          <label
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#6B4B45] peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 "
            htmlFor="user-password"
          >
            비밀번호
          </label>
          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center">
              <input
                onChange={checkboxChangeHanlder}
                value="check"
                type="checkbox"
                name="user-check"
                id="user-check"
              />
              <label
                className="ml-1 text-xs text-gray-500"
                htmlFor="user-check"
              >
                비밀번호 보기
              </label>
            </div>
            <div className="text-xs text-red-500">
              {!isCorrect && "규칙에 맞지 않습니다."}
            </div>
          </div>
          <div className="mb-2 text-xs text-neutral-500 hidden peer-focus:block">
            영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 10자리 이상 또는
            3종류 이상을 조합하여 최소 8자리 이상의 길이로 구성
          </div>
        </div>
      </div>
    </div>
  );
}
