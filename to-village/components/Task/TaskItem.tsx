"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import taskStore from "@/store/taskStore";
import projectStore from "@/store/projectStore";
import TaskModify from "./TaskModify";
import Task from "./taskValidator";
import SubTaskFactory from "../SubTask/SubTaskFactory";
import SubTaskItem from "../SubTask/SubTaskItem";

interface data {
  data: Task;
  projectId: number;
}

export default function TaskItem({ projectId, data }: data) {
  const buttonClass = " w-6 h-6 mr-2 border rounded-full ";
  const [classControl, setClassControl] = useState(buttonClass);
  const [isChecked, setIsChecked] = useState(false);
  const [subTaskToggle, setSubTaskToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);

  const [newTask, setNewTask] = useState(data.toDo);
  const updateTask = taskStore((state) => state.updateTask);
  const deleteTask = taskStore((state) => state.deleteTask);
  const fetchTaskList = projectStore((state) => state.fetchProjectList);
  // console.log(data);

  // console.log(projectId, data.id, data.toDo);

  const subTaskToggleHandler = () => {
    setSubTaskToggle((prev) => !prev);
  };

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

  const deleteTaskHandler = async (event: any) => {
    event.preventDefault();
    console.log(projectId, data.id);
    console.log(`http://localhost:8080/to-do/${data.id}`);
    const response = await axios.delete(
      `http://localhost:8080/to-do/${data.id}`
    );
    // const resData = await response.data;
    // console.log(resData);
    // deleteTask(data.id);
    fetchTaskList();
  };

  const taskInputChangeHandler = (event: any) => {
    setNewTask(event.target.value);
  };

  useEffect(() => {
    if (isChecked) {
      setClassControl(buttonClass + "bg-cyan-400");
    } else {
      setClassControl(buttonClass + "bg-white");
    }
  }, [isChecked]);

  return (
    <li>
      {!updateToggle ? (
        <>
          <div className="flex justify-between">
            <div className="flex">
              <button onClick={subTaskToggleHandler}>▶</button>
              <button
                onClick={buttonClickHandler}
                className={classControl}
                role="checkbox"
                aria-checked="false"
              ></button>
              {!updateToggle ? (
                <div>{data.toDo}</div>
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
          {subTaskToggle && (
            <div>
              <ul className="ml-12">
                {data.subtasks.map((item, i) => (
                  <SubTaskItem parentId={projectId} data={item} key={i} />
                ))}
              </ul>
              <SubTaskFactory id={data.id} parentId={projectId} />
            </div>
          )}
        </>
      ) : (
        <TaskModify
          buttonToggle={updateToggleHandler}
          projectId={projectId}
          id={data.id}
          toDo={data.toDo}
          done={data.done}
        />
      )}
    </li>
  );
}
