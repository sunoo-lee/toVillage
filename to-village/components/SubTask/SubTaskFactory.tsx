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
    <div>
      {!addButtonToggle ? (
        <button
          onClick={addButtonHandler}
          className="mt-3 p-2 rounded-md text-base text-red-500 cursor-pointer hover:bg-red-100"
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
