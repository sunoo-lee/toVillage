"use client";

import subTaskStore from "@/store/subTaskStore";
import SubTask from "@/store/subTaskValidator";
import { useEffect, useState } from "react";
import ProjectBox from "../UI/ProjectBox";
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
  const updateSubTaskDone = subTaskStore((state) => state.updateSubTaskDone);

  const [done, setDone] = useState(data.done);

  const buttonClickHandler = (event: any) => {
    event.preventDefault();
    if (done === 0) {
      setDone(1);
    } else {
      setDone(0);
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

  useEffect(() => {
    const updateSubTaskDoneHandler = async () => {
      const doneUpdated = {
        id: data.id,
        done: done,
      };
      await updateSubTaskDone(doneUpdated);
    };
    updateSubTaskDoneHandler();
  }, [done, data, updateSubTaskDone]);

  return (
    <div className="">
      {!updateToggle ? (
        <>
          <ProjectBox>
            <div className="flex items-center justify-between">
              <div className="flex">
                <button
                  onClick={buttonClickHandler}
                  className={`${buttonClass} ${
                    done === 1 ? "bg-neutral-300" : "bg-white"
                  } `}
                  role="checkbox"
                  aria-checked="false"
                ></button>
                <div
                  className={`font-medium text-lg ${
                    done === 1 ? "text-neutral-300 italic line-through" : ""
                  }`}
                >
                  {data.toDo}
                </div>
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
            </div>
          </ProjectBox>
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
    </div>
  );
}
