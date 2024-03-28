"use client";

import { useEffect, useState } from "react";
import taskStore from "@/store/taskStore_";
import axios from "axios";

export default function TaskItem({ id, toDo, done }: any) {
  const buttonClass = " w-6 h-6 mr-2 border rounded-full ";
  const [classControl, setClassControl] = useState(buttonClass);
  const [isChecked, setIsChecked] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [newTask, setNewTask] = useState(toDo);
  const deleteTodoList = taskStore((state) => state.deleteTodoList);
  const fetchTodoList = taskStore((state) => state.fetchTodoList);

  const buttonClickHandler = (event: any) => {
    event.preventDefault();
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  const deleteTaskHandler = async (event: any) => {
    event.preventDefault();
    await deleteTodoList(id);
    fetchTodoList();
  };

  const updateTaskHandler = async (event: any) => {
    if (isUpdated) {
      const response = await axios.patch(
        `https://http-react-8fe59-default-rtdb.firebaseio.com/task/${id}.json`,
        {
          task: newTask,
        }
      );
      fetchTodoList();
      setIsUpdated((prev) => !prev);
    } else {
      setIsUpdated((prev) => !prev);
    }
    console.log(isUpdated);
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
      <div className="flex justify-between">
        <div className="flex">
          <button
            onClick={buttonClickHandler}
            className={classControl}
            role="checkbox"
            aria-checked="false"
          ></button>
          {!isUpdated ? (
            <div>{toDo}</div>
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
            onClick={updateTaskHandler}
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
    </li>
  );
}
