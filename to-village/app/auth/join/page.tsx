"use client";

import Authenticode from "@/components/Join/Authenticode";
import Email from "@/components/Join/Email";
import Finish from "@/components/Join/Finish";
import Password from "@/components/Join/Password";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [state, setState] = useState("email");

  const router = useRouter();

  const completeButtonHandle = (event: any) => {
    event.preventDefault();
    router.push("/project");
  };

  const buttonClickHandler = (event: any) => {
    if (state === "email") {
      setState("code");
    } else if (state === "code") {
      setState("password");
    } else if (state === "password") {
      setState("finish");
    }
    console.log(email, password, code);
  };

  return (
    <div className="mt-32">
      {state === "email" && <Email email={email} setEmail={setEmail} />}
      {state === "code" && <Authenticode code={code} setCode={setCode} />}
      {state === "password" && (
        <Password password={password} setPassword={setPassword} />
      )}
      {state === "finish" && <Finish email={email} />}
      <div>
        {state !== "finish" && (
          <button
            onClick={buttonClickHandler}
            className="absolute bottom-0 w-full text-3xl bg-sky-300 p-2"
          >
            다음
          </button>
        )}
        {state === "finish" && (
          <button
            onClick={completeButtonHandle}
            className="absolute bottom-0 w-full text-3xl bg-sky-300 p-2"
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}
