"use client";

import { useState } from "react";
import taskStore from "@/store/taskStore";
import Calendar from "../Calendar/Calendar";
import CalendarIcon from "@/assets/img/noun-calendar.svg";
import RepeatIcon from "@/assets/img/noun-repeat.svg";
import Image from "next/image";
import ColorPicker from "../ColorPicker/ColorPicker";

interface Props {
  buttonToggle(state: boolean): void;
  parentId: number;
}

export default function TaskInput({ buttonToggle, parentId }: Props) {
  const [taskInput, setTaskInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [calendarToggle, setCalendarToggle] = useState(false);
  const readTask = taskStore((state) => state.readTask);
  const createTask = taskStore((state) => state.createTask);

  const taskInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskInput(event.target.value);
  };

  const createTaskHandler = async () => {
    const newTask = {
      parentId: parentId,
      toDo: taskInput,
      deadline,
    };

    await createTask(newTask);

    readTask(parentId);
    setTaskInput("");
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
    createTaskHandler();
    buttonToggle(false);
  };

  const cancelHandler = (event: any) => {
    event.preventDefault();
    buttonToggle(false);
  };

  return (
    <div className="relative">
      <div className="border rounded-full px-6 py-2 mt-3">
        <form>
          <div className="text-lg flex justify-between items-center my-1 border-b">
            <input
              className="w-full px-2 outline-0 "
              type="text"
              placeholder="Task"
              onChange={taskInputChangeHandler}
              value={taskInput}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center justify-center">
              <button
                onClick={deadlineButtonHandler}
                className="text-base px-2 py-1 break-keep rounded-md hover:bg-red-300"
              >
                {deadline ? (
                  deadline
                ) : (
                  <div className="w-6">
                    <Image src={CalendarIcon} alt="Calendar Icon" />
                  </div>
                )}
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
                <div className="w-6">
                  <Image src={RepeatIcon} alt="Repeat Icon" />
                </div>
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
