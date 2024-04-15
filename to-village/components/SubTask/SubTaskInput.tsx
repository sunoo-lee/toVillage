"use client";

import { useState } from "react";
import axios from "axios";
import subTaskStore from "@/store/subTaskStore";
import Task from "@/store/taskValidator";
import SubTask from "@/store/subTaskValidator";

interface Props {
  buttonToggle(state: boolean): void;
  setSubTasks(subList: SubTask[]): void;
  projectId: number;
  taskId: number;
}

export default function SubTaskInput({
  buttonToggle,
  setSubTasks,
  projectId,
  taskId,
}: Props) {
  const [subTaskInput, setSubTaskInput] = useState("");
  const createSubTask = subTaskStore((state) => state.createSubTask);

  const subTaskInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubTaskInput(event.target.value);
  };

  const readSubTaskList = async () => {
    const response = await axios.get(
      `http://localhost:8080/to-do/${projectId}`
    );
    const data: Task[] = await response.data[0].tasks;
    const newList = data.find((item) => item.id === taskId)
      ?.subtasks as SubTask[];
    setSubTasks(newList);
  };

  const createSubTaskHandler = async () => {
    const newSubTask = {
      parentId: taskId,
      toDo: subTaskInput,
      deadline: new Intl.DateTimeFormat("ko-KR").format(new Date()),
    };

    await createSubTask(newSubTask);
    await readSubTaskList();
    console.log(projectId, taskId);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    createSubTaskHandler();
    buttonToggle(false);
  };

  const cancelHandler = (event: any) => {
    event.preventDefault();
    buttonToggle(false);
  };

  return (
    <div className="relative mt-3">
      <form>
        <div className="text-lg mb-3 flex justify-between items-center ">
          <input
            className="w-full p-2 outline-0 border-2 rounded-lg"
            type="text"
            placeholder="SubTask"
            onChange={subTaskInputChangeHandler}
            value={subTaskInput}
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
    </div>
  );
}
