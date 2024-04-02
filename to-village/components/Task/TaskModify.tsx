"use client";

import projectStore from "@/store/projectStore";
import axios from "axios";
import { useState } from "react";

type UserProps = {
  buttonToggle(event: any): void;
  id: number;
  toDo: string;
  done: number;
  projectId: number;
};

export default function TaskModify({
  buttonToggle,
  id,
  toDo,
  done,
  projectId,
}: UserProps) {
  const [taskInput, setTaskInput] = useState(toDo);
  const readProjectList = projectStore((state) => state.fetchProjectList);
  console.log(projectId, id, toDo, done);

  const taskInputChangeHandler = (event: any) => {
    setTaskInput(event.target.value);
  };

  const updateTaskHandler = async () => {
    const response = await axios.put(
      `http://localhost:8080/to-do/${projectId}`,
      {
        id,
        toDo: taskInput,
        done: 0,
      }
    );

    const data = await response.data;
    console.log(data);
    setTaskInput("");
    readProjectList();
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    updateTaskHandler();
    buttonToggle(event);
  };

  return (
    <div className="relative">
      <form>
        <div className="text-lg mb-3 flex justify-between items-center border-b-2">
          <input
            className="w-full p-2 outline-0"
            type="text"
            placeholder="프로젝트 이름"
            onChange={taskInputChangeHandler}
            value={taskInput}
          />
        </div>
        <div className="flex justify-between">
          <button className="text-base px-2 py-1 break-keep border-2 rounded-md hover:bg-gray-100">
            마감 날짜
          </button>
          <div>
            <button
              onClick={buttonToggle}
              className="text-base px-2 py-1 mr-2 break-keep border-2 rounded-md hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={submitHandler}
              className="text-base px-2 py-1 break-keep border-2 border-red-400 text-white bg-red-400 rounded-md hover:bg-red-500"
            >
              수정하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
