"use client";

import axios from "axios";
import { useState } from "react";

interface parentId {
  parentId: number;
  id: number;
}

export default function SubTaskFactory({ parentId, id }: parentId) {
  const [addButtonToggle, setaddButtonToggle] = useState(false);
  const addButtonHandler = () => {
    if (addButtonToggle) {
      setaddButtonToggle(false);
    } else {
      setaddButtonToggle(true);
    }
  };

  const [subTaskInput, setSubTaskInput] = useState("");

  const subTaskInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubTaskInput(event.target.value);
  };

  const createSubTaskHandler = async () => {
    const response = await axios.post(
      `http://localhost:8080/to-do/${parentId}`,
      {
        id: id,
        toDo: subTaskInput,
        deadline: "",
      }
    );
    const data = await response.data;
    console.log(data);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    createSubTaskHandler();
  };

  return (
    <div>
      {!addButtonToggle ? (
        <button
          onClick={addButtonHandler}
          className="mt-3 p-2 rounded-md text-base text-red-500 cursor-pointer hover:bg-red-100"
        >
          +추가하기
        </button>
      ) : (
        <div className="relative mt-3">
          <form>
            <div className="text-lg mb-3 flex justify-between items-center ">
              <input
                className="w-full p-2 outline-0 border-2 rounded-lg"
                type="text"
                placeholder="프로젝트 이름"
                onChange={subTaskInputChangeHandler}
                value={subTaskInput}
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
        </div>
      )}
    </div>
  );
}
