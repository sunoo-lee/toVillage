"use client";

import { useState } from "react";
import TaskInput from "./TaskInput";

interface parentId {
  parentId: number;
}

export default function TaskFactory({ parentId }: any) {
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
          className="p-2 text-base rounded-md cursor-pointer text-neutral-300 hover:text-red-500"
        >
          +추가하기
        </button>
      ) : (
        <TaskInput parentId={parentId} buttonToggle={setaddButtonToggle} />
      )}
    </div>
  );
}
