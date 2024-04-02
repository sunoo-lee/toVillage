"use client";

import { useState } from "react";
import TaskInput from "./TaskInput";
import axios from "axios";
import taskStore from "@/store/taskStore";
import ProjectBox from "../UI/ProjectBox";

interface parentId {
  parentId: number;
}

export default function TaskFactory({ parentId }: parentId) {
  const [addButtonToggle, setaddButtonToggle] = useState(false);
  const addButtonHandler = () => {
    if (addButtonToggle) {
      setaddButtonToggle(false);
    } else {
      setaddButtonToggle(true);
    }
  };

  const [taskInput, setTaskInput] = useState("");
  const readTasks = taskStore((state) => state.readTask);

  const taskInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskInput(event.target.value);
  };

  const createTaskHandler = async () => {
    const response = await axios.post(`http://localhost:8080/to-do`, {
      parentId: parentId,
      toDo: taskInput,
      deadline: "",
    });
    const data = await response.data;
    readTasks(parentId);
    setTaskInput("");
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    createTaskHandler();
  };

  return (
    <div>
      {!addButtonToggle ? (
        <button
          onClick={addButtonHandler}
          className="p-2 rounded-md text-base text-red-500 cursor-pointer hover:bg-red-100"
        >
          +추가하기
        </button>
      ) : (
        <div className="relative">
          <ProjectBox>
            <form>
              <div className="text-lg mb-3 flex justify-between items-center border-b-2">
                <input
                  className="w-full p-2 outline-0"
                  type="text"
                  placeholder="프로젝트 이름"
                  onChange={taskInputChangeHandler}
                  value={taskInput}
                />
              </div>
              <div className="flex justify-between">
                <button className="text-base px-2 py-1 break-keep border-2 rounded-md hover:bg-red-500">
                  마감 날짜
                </button>
                <button
                  onClick={submitHandler}
                  className="text-base px-2 py-1 break-keep text-white bg-red-400 rounded-md hover:bg-red-500"
                >
                  추가하기
                </button>
              </div>
            </form>
          </ProjectBox>
        </div>
      )}
    </div>
  );
}
