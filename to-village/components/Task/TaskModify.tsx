"use client";

import { useState } from "react";
import taskStore from "@/store/taskStore";
import Task from "@/store/taskValidator";

type UserProps = {
  buttonToggle(event: any): void;
  projectId: number;
  taskData: Task;
};

export default function TaskModify({
  buttonToggle,
  projectId,
  taskData,
}: UserProps) {
  const [taskInput, setTaskInput] = useState(taskData.toDo);
  const readTask = taskStore((state) => state.readTask);
  const updateTask = taskStore((state) => state.updateTask);

  const taskInputChangeHandler = (event: any) => {
    setTaskInput(event.target.value);
  };

  const updateTaskHandler = async () => {
    const updatedTask = {
      id: taskData.id,
      toDo: taskInput,
      done: taskData.done,
    };
    await updateTask(updatedTask);
    setTaskInput("");
    readTask(projectId);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    updateTaskHandler();
    buttonToggle(event);
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
              onChange={taskInputChangeHandler}
              value={taskInput}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <button className="text-base px-2 py-1 break-keep rounded-md hover:bg-red-300">
                마감
              </button>
              <button className="text-base px-2 py-1 break-keep rounded-md hover:bg-red-300">
                반복
              </button>
            </div>
            <div className="flex">
              <button
                onClick={buttonToggle}
                className="mr-1 text-base px-2 py-1 break-keep rounded-md hover:bg-slate-200"
              >
                취소
              </button>
              <button
                onClick={submitHandler}
                className="text-base px-2 py-1 break-keep text-white bg-red-400 rounded-md hover:bg-red-500"
              >
                수정
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
