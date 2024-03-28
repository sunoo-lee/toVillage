"use client";

import { useState } from "react";
import projectStore from "@/store/projectStore";
import axios from "axios";
import ProjectBox from "../UI/ProjectBox";

type UserProps = {
  buttonToggle(state: boolean): void;
};

export default function ProjectInput({ buttonToggle }: UserProps) {
  const [projectInput, setProjectInput] = useState("");
  const readProjectList = projectStore((state) => state.fetchProjectList);

  const projectInputChangeHandler = (event: any) => {
    setProjectInput(event.target.value);
  };

  const addProjectHandler = async (item: string) => {
    const response = await axios.post(
      "http://localhost:8080/to-do",
      {
        toDo: projectInput,
        done: 0,
        task: {
          toDo: "test1",
          done: 0,
          subtask: {
            toDo: "test2",
            done: 0,
          },
        },
      },
      {
        withCredentials: true,
      }
    );

    const data = await response.data;
    console.log(data);
    setProjectInput("");
    readProjectList();
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    const project = projectInput;
    addProjectHandler(project);
    buttonToggle(false);
  };

  return (
    <div className="relative">
      <ProjectBox>
        <form>
          <div className="text-lg mb-3 flex justify-between items-center border-b-2">
            <input
              className="w-full p-2 outline-0"
              type="text"
              placeholder="프로젝트 이름"
              onChange={projectInputChangeHandler}
              value={projectInput}
            />
          </div>
          <div className="flex justify-between">
            <button className="text-base px-2 py-1 break-keep border-2 rounded-md hover:bg-red-500">
              마감 날짜
            </button>
            <button
              onClick={submitHandler}
              className="text-base px-2 py-1 break-keep text-white bg-red-400 rounded-md hover:bg-red-500"
            >
              추가하기
            </button>
          </div>
        </form>
      </ProjectBox>
    </div>
  );
}
