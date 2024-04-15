"use client";

import { useState } from "react";
import axios from "axios";
import SubTask from "@/store/subTaskValidator";
import subTaskStore from "@/store/subTaskStore";
import Task from "@/store/taskValidator";
import SubTaskModify from "./SubTaskModify";

interface Props {
  setSubTasks(subList: SubTask[]): void;
  data: SubTask;
  taskId: number;
  projectId: number;
}

export default function SubTaskItem({
  setSubTasks,
  data,
  taskId,
  projectId,
}: Props) {
  const buttonClass = " w-6 h-6 mr-2 border rounded-full ";
  const [classControl, setClassControl] = useState(buttonClass);
  const [isChecked, setIsChecked] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  const readSubTask = subTaskStore((state) => state.readSubTask);
  const deleteSubTask = subTaskStore((state) => state.deleteSubTask);

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
    if (updateToggle) {
      setUpdateToggle(false);
    } else {
      setUpdateToggle(true);
    }
  };

  const subTaskDelete = async (event: any) => {
    await deleteSubTask(data.id);
    const updatedList = await readSubTask(projectId, taskId);
    setSubTasks(updatedList);
  };

  return (
    <li className="flex items-center justify-between pt-4">
      {!updateToggle ? (
        <>
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
        </>
      ) : (
        <SubTaskModify
          setSubTasks={setSubTasks}
          buttonToggle={setUpdateToggle}
          projectId={projectId}
          taskId={taskId}
          subTaskData={data}
        />
      )}
    </li>
  );
}
