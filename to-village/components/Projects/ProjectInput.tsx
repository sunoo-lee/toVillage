"use client";

import CalendarIcon from "@/assets/img/noun-calendar.svg";
import RepeatIcon from "@/assets/img/noun-repeat.svg";
import { useState } from "react";
import projectStore from "@/store/projectStore";
import ProjectBox from "../UI/ProjectBox";
import ColorPicker from "../ColorPicker/ColorPicker";

type UserProps = {
  buttonToggle(state: boolean): void;
};

export default function ProjectInput({ buttonToggle }: UserProps) {
  const [projectInput, setProjectInput] = useState("");
  const readAllProject = projectStore((state) => state.readAllProject);
  const createProject = projectStore((state) => state.createProject);

  const projectInputChangeHandler = (event: any) => {
    setProjectInput(event.target.value);
  };

  const addProjectHandler = async () => {
    const newProject = {
      toDo: projectInput,
      hexColorCode: "000000",
    };

    await createProject(newProject);
    setProjectInput("");
    readAllProject();
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    addProjectHandler();
    buttonToggle(false);
  };

  const cancelHandler = (event: any) => {
    event.preventDefault();
    buttonToggle(false);
  };

  return (
    <div className="relative">
      <div className="border rounded-full px-6 py-2 mt-3">
        <form>
          <div className="text-lg flex justify-between items-center my-1 border-b">
            <input
              className="w-full px-2 outline-0 "
              type="text"
              placeholder="프로젝트 이름"
              onChange={projectInputChangeHandler}
              value={projectInput}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <ColorPicker />
              {/* <button className="text-base px-2 py-1 break-keep rounded-md hover:bg-red-300">
                마감
              </button>
              <button className="text-base px-2 py-1 break-keep rounded-md hover:bg-red-300">
                반복
              </button> */}
            </div>
            <div className="flex">
              <button
                onClick={cancelHandler}
                className="mr-1 text-base px-2 py-1 break-keep rounded-md hover:bg-slate-200"
              >
                취소
              </button>
              <button
                onClick={submitHandler}
                className="text-base px-2 py-1 break-keep text-white bg-red-400 rounded-md hover:bg-red-500"
              >
                추가
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
