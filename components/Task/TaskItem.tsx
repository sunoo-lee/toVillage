"use client";

import { useEffect, useState } from "react";
import taskStore from "@/store/taskStore";
import TaskModify from "./TaskModify";
import SubTaskList from "../SubTask/SubTaskList";
import Task from "@/store/taskValidator";
import ProjectBox from "../UI/ProjectBox";

interface Props {
  taskData: Task;
  projectId: number;
}

export default function TaskItem({ projectId, taskData }: Props) {
  const buttonClass = " w-6 h-6 mr-2 border rounded-full ";
  const [classControl, setClassControl] = useState(buttonClass);
  const [isChecked, setIsChecked] = useState(false);
  const [subTaskToggle, setSubTaskToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);

  const [newTask, setNewTask] = useState(taskData.toDo);
  const deleteTask = taskStore((state) => state.deleteTask);
  const readTask = taskStore((state) => state.readTask);
  const updateTaskDone = taskStore((state) => state.updateTaskDone);

  const [done, setDone] = useState(taskData.done);

  const subTaskToggleHandler = () => {
    setSubTaskToggle((prev) => !prev);
  };

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

  const deleteTaskHandler = async () => {
    await deleteTask(taskData.id);
    await readTask(projectId);
  };

  const taskInputChangeHandler = (event: any) => {
    setNewTask(event.target.value);
  };

  useEffect(() => {
    const updateTaskDoneHandler = async () => {
      const doneUpdated = {
        id: taskData.id,
        done: done,
      };
      await updateTaskDone(doneUpdated);
    };
    updateTaskDoneHandler();
  }, [done, taskData, updateTaskDone]);

  return (
    <div>
      {!updateToggle ? (
        <>
          <ProjectBox>
            <div className="flex justify-between">
              <div className="flex">
                <button onClick={subTaskToggleHandler}>▶</button>
                <button
                  onClick={buttonClickHandler}
                  className={`${buttonClass} ${
                    done === 1 ? "bg-neutral-300" : "bg-white"
                  } `}
                  role="checkbox"
                  aria-checked="false"
                ></button>
                {!updateToggle ? (
                  <div
                    className={`font-medium text-lg ${
                      done === 1 ? "text-neutral-300 italic line-through" : ""
                    }`}
                  >
                    {taskData.toDo}
                  </div>
                ) : (
                  <input
                    className=" outline-none border-2 border-neutral-700 rounded-md"
                    type="text"
                    value={newTask}
                    onChange={taskInputChangeHandler}
                  />
                )}
              </div>
              <div className="flex">
                <button
                  onClick={updateToggleHandler}
                  className="w-6 h-6 mr-2 text-sm text-center text-white bg-blue-300 rounded-full hover:bg-blue-500 "
                >
                  E
                </button>
                <button
                  onClick={deleteTaskHandler}
                  className="w-6 h-6 mr-2 text-sm text-center text-white bg-red-400 rounded-full hover:bg-red-500 "
                >
                  D
                </button>
              </div>
            </div>
          </ProjectBox>
        </>
      ) : (
        <TaskModify
          buttonToggle={updateToggleHandler}
          projectId={projectId}
          taskData={taskData}
        />
      )}
      {subTaskToggle ? (
        <SubTaskList projectId={projectId} taskData={taskData} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
