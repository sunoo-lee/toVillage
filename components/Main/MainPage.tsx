"use client";

import pageStore from "@/store/pageStore";
import Link from "next/link";

export default function MainPage() {
  const updatePage = pageStore((state) => state.updatePage);

  const updateButtonHandler = () => {
    updatePage("project");
  };

  return (
    <div className="relative max-h-[36rem]  h-full grid place-items-center overflow-scroll">
      <div className="text-center ">
        <button className="p-4 mt-16 text-4xl text-white rounded-full bg-rose-400">
          back to village
        </button>
      </div>
      <div className="w-full p-4 pb-0 mt-2 text-lg font-bold">
        <div className="ml-4 text">Daily Task</div>
        <ul>
          <li className="p-1 mt-2 rounded-full bg-lime-200">
            <div className="flex justify-between px-2 pl-4">
              <div>테스크</div>
              <div>&#9744;</div>
            </div>
          </li>
          <li className="p-1 mt-2 rounded-full bg-lime-200">
            <div className="flex justify-between px-2 pl-4">
              <div>할 일</div>
              <div>&#9744;</div>
            </div>
          </li>
          <li className="p-1 mt-2 bg-purple-200 rounded-full">
            <div className="flex justify-between px-2 pl-4">
              <div>task</div>
              <div>&#9744;</div>
            </div>
          </li>
          <li className="p-1 mt-2 bg-yellow-200 rounded-full">
            <div className="flex justify-between px-2 pl-4">
              <div>task</div>
              <div>&#9744;</div>
            </div>
          </li>
          <li className="text-center">
            <span className="mt-2 text-5xl text-center">&#43;</span>
          </li>
        </ul>
      </div>
      <div className="w-[18rem]">
        {/* <Link href="/project"> */}
        <button onClick={updateButtonHandler}>
          <div className="mt-4 text-2xl">
            <div className="ml-4 text">Project</div>
            <ul className="flex gap-2 px-4 mt-2 overflow-x-scroll text-center ">
              <li className="">
                <div className="w-20 py-2 bg-lime-200 h-28 rounded-3xl">p</div>
              </li>
              <li className="">
                <div className="w-20 py-2 bg-blue-200 h-28 rounded-3xl">p</div>
              </li>
              <li className="">
                <div className="w-20 py-2 bg-purple-200 h-28 rounded-3xl">
                  p
                </div>
              </li>
              <li className="">
                <div className="w-20 py-2 bg-yellow-200 h-28 rounded-3xl">
                  p
                </div>
              </li>
            </ul>
          </div>
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
