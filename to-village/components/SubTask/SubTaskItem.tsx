"use client";

import { useState } from "react";
import SubTask from "./subTaskValidator";
import axios from "axios";

interface data {
  data: SubTask;
  parentId: number;
}

export default function SubTaskItem({ data, parentId }: data) {
  const buttonClass = " w-6 h-6 mr-2 border rounded-full ";
  const [classControl, setClassControl] = useState(buttonClass);
  const [isChecked, setIsChecked] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);

  const buttonClickHandler = (event: any) => {
    event.preventDefault();
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  const updateToggleHandler = (event: any) => {
    event.preventDefault();

    setTimeout(() => {
      if (updateToggle) {
        setUpdateToggle(false);
      } else {
        setUpdateToggle(true);
      }
    }, 100);
  };

  const subTaskDelete = async (event: any) => {
    const response = await axios.delete(
      `http://localhost:8080/to-do/${parentId}`
    );
  };

  const subTaskUpdate = async (event: any) => {};

  return (
    <>
      <li className="flex items-center justify-between pt-4">
        <div className="flex">
          <button
            onClick={buttonClickHandler}
            className={classControl}
            role="checkbox"
            aria-checked="false"
          ></button>
          <div>{data.toDo}</div>
        </div>
        <div className="flex">
          <button
            onClick={updateToggleHandler}
            className="w-6 h-6 mr-2 text-sm text-center text-white bg-blue-300 rounded-full hover:bg-blue-500 "
          >
            E
          </button>
          <button
            onClick={subTaskDelete}
            className="w-6 h-6 mr-2 text-sm text-center text-white bg-red-400 rounded-full hover:bg-red-500 "
          >
            D
          </button>
        </div>
      </li>
    </>
  );
}
