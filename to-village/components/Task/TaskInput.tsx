"use client";

import { useState } from "react";
import ProjectBox from "../UI/ProjectBox";
import taskStore from "@/store/taskStore";

interface Props {
  buttonToggle(state: boolean): void;
  parentId: number;
}

export default function TaskInput({ buttonToggle, parentId }: Props) {
  const [taskInput, setTaskInput] = useState("");
  const readTask = taskStore((state) => state.readTask);
  const createTask = taskStore((state) => state.createTask);

  const taskInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskInput(event.target.value);
  };

  const createTaskHandler = async () => {
    const newTask = {
      parentId: parentId,
      toDo: taskInput,
      deadline: new Intl.DateTimeFormat("ko-KR").format(new Date()),
    };

    await createTask(newTask);

    readTask(parentId);
    setTaskInput("");
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    createTaskHandler();
    buttonToggle(false);
  };

  const cancelHandler = (event: any) => {
    event.preventDefault();
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
              placeholder="Task"
              onChange={taskInputChangeHandler}
              value={taskInput}
            />
          </div>
          <div className="flex justify-between">
            <button className="text-base px-2 py-1 break-keep border-2 rounded-md hover:bg-red-500">
              마감 날짜
            </button>
            <div className="flex">
              <button
                onClick={cancelHandler}
                className="mr-1 text-base px-2 py-1 break-keep border-2 rounded-md hover:bg-slate-200"
              >
                취소
              </button>
              <button
                onClick={submitHandler}
                className="text-base px-2 py-1 break-keep text-white bg-red-400 rounded-md hover:bg-red-500"
              >
                추가하기
              </button>
            </div>
          </div>
        </form>
      </ProjectBox>
    </div>
  );
}
