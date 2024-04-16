"use client";

import { useState } from "react";
import SubTaskInput from "./SubTaskInput";
import SubTask from "@/store/subTaskValidator";

interface Props {
  setSubTasks(subList: SubTask[]): void;
  projectId: number;
  taskId: number;
}

export default function SubTaskFactory({
  setSubTasks,
  projectId,
  taskId,
}: Props) {
  const [addButtonToggle, setaddButtonToggle] = useState(false);
  const addButtonHandler = () => {
    if (addButtonToggle) {
      setaddButtonToggle(false);
    } else {
      setaddButtonToggle(true);
    }
  };

  return (
    <div className="ml-10">
      {!addButtonToggle ? (
        <button
          onClick={addButtonHandler}
          className="p-2 rounded-md text-base text-neutral-300 cursor-pointer hover:text-red-500"
        >
          +추가하기
        </button>
      ) : (
        <SubTaskInput
          buttonToggle={setaddButtonToggle}
          setSubTasks={setSubTasks}
          projectId={projectId}
          taskId={taskId}
        />
      )}
    </div>
  );
}
