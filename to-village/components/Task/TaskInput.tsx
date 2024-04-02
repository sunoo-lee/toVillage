"use client";

import { useState, useEffect } from "react";
import taskStore from "@/store/taskStore_";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function TaskInput(parentId: number) {
  const [isToggled, setIsToggled] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [taskInput, setTaskInput] = useState("");

  const fetchTaskList = taskStore((state) => state.fetchTodoList);

  const taskInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskInput(event.target.value);
  };

  const addTaskHandler = async (task: any) => {
    const response = await fetch(
      "https://http-react-8fe59-default-rtdb.firebaseio.com/task.json",
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "app/json",
        },
      }
    );

    const data = await response.json();
    setTaskInput("");
    // setValue(moment());
    setDeadline("");
    setIsSelected(false);
    // fetchDeadlineList();
    fetchTaskList();
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    const task = {
      task: taskInput,
      deadline: isSelected ? deadline : "",
    };
    console.log(task);
    addTaskHandler(task);
  };

  const onClickDayHander = (val: any, event: any) => {
    setIsSelected(true);
    // setValue(val);
  };

  // useEffect(() => {
  //   let selectedDate = moment(value).format("YYYY-MM-DD");
  //   setIsToggled(false);
  //   setDeadline(selectedDate);
  // }, [value]);

  return (
    <div className="relative">
      <form>
        <div className="text-lg mb-3 flex justify-between">
          <input
            className="w-full p-2 mb-2 outline-0"
            type="text"
            placeholder="작업 이름"
            onChange={taskInputChangeHandler}
            value={taskInput}
          />
          <button
            onClick={submitHandler}
            className="absolute right-0 text-sm px-3 py-2 break-keep text-white bg-red-400 rounded-md hover:bg-red-500"
          >
            작업 추가
          </button>
        </div>
      </form>
    </div>
  );
}
