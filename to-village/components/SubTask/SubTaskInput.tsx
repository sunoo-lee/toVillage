"use client";

import { useState } from "react";
import axios from "axios";
import subTaskStore from "@/store/subTaskStore";
import Task from "@/store/taskValidator";
import SubTask from "@/store/subTaskValidator";
import Calendar from "../Calendar/Calendar";

interface Props {
  buttonToggle(state: boolean): void;
  setSubTasks(subList: SubTask[]): void;
  projectId: number;
  taskId: number;
}

export default function SubTaskInput({
  buttonToggle,
  setSubTasks,
  projectId,
  taskId,
}: Props) {
  const [subTaskInput, setSubTaskInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [calendarToggle, setCalendarToggle] = useState(false);
  const createSubTask = subTaskStore((state) => state.createSubTask);

  const subTaskInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubTaskInput(event.target.value);
  };

  const readSubTaskList = async () => {
    const response = await axios.get(
      `http://localhost:8080/to-do/${projectId}`
    );
    const data: Task[] = await response.data[0].tasks;
    const newList = data.find((item) => item.id === taskId)
      ?.subtasks as SubTask[];
    setSubTasks(newList);
  };

  const createSubTaskHandler = async () => {
    const newSubTask = {
      parentId: taskId,
      toDo: subTaskInput,
      deadline,
    };

    await createSubTask(newSubTask);
    await readSubTaskList();
    console.log(projectId, taskId);
  };

  const deadlineButtonHandler = (event: any) => {
    event.preventDefault();
    setCalendarToggle((state) => !state);
  };
  const repeatButtonHandler = (event: any) => {
    event.preventDefault();
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    createSubTaskHandler();
    buttonToggle(false);
  };

  const cancelHandler = (event: any) => {
    event.preventDefault();
    buttonToggle(false);
  };

  return (
    <div className="relative mb-2 bg-white">
      <div className="border shadow-sm rounded-full px-6 py-2 mt-3 ml-4">
        <form>
          <div className="text-lg flex justify-between items-center my-1 border-b">
            <input
              className="w-full px-2 outline-0 "
              type="text"
              placeholder="SubTask"
              onChange={subTaskInputChangeHandler}
              value={subTaskInput}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <button
                onClick={deadlineButtonHandler}
                className="text-base px-2 py-1 break-keep rounded-md hover:bg-red-300"
              >
                {deadline ? deadline : "마감"}
              </button>
              {calendarToggle && (
                <Calendar
                  setDeadline={setDeadline}
                  setToggle={setCalendarToggle}
                />
              )}
              <button
                onClick={repeatButtonHandler}
                className="text-base px-2 py-1 break-keep rounded-md hover:bg-red-300"
              >
                반복
              </button>
            </div>
            <div className="flex">
              <button
                onClick={cancelHandler}
                className="mr-1 text-base px-2 py-1 break-keep rounded-md hover:bg-slate-200"
              >
                취소
              </button>
              <button
                onClick={submitHandler}
                className="text-base px-2 py-1 break-keep text-white bg-red-400 rounded-md hover:bg-red-500"
              >
                추가
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
