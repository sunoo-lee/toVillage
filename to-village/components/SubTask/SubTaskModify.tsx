"use client";
import subTaskStore from "@/store/subTaskStore";
import SubTask from "@/store/subTaskValidator";
import { useState } from "react";

interface Props {
  setSubTasks(subList: SubTask[]): void;
  buttonToggle(event: any): void;
  subTaskData: SubTask;
  projectId: number;
  taskId: number;
}

export default function SubTaskModify({
  setSubTasks,
  buttonToggle,
  subTaskData,
  projectId,
  taskId,
}: Props) {
  const [subTaskInput, setSubTaskInput] = useState(subTaskData.toDo);
  const readSubTask = subTaskStore((state) => state.readSubTask);
  const updateSubTask = subTaskStore((state) => state.updateSubTask);

  const subTaskInputChangeHanlder = (event: any) => {
    setSubTaskInput(event.target.value);
  };

  const updateSubTaskHanlder = async () => {
    const updatedSubTask = {
      id: subTaskData.id,
      toDo: subTaskInput,
      done: subTaskData.done,
    };

    await updateSubTask(updatedSubTask);
    const newList = await readSubTask(projectId, taskId);
    setSubTasks(newList);
    setSubTaskInput("");
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    updateSubTaskHanlder();
    buttonToggle(false);
  };

  const cancelHandler = (event: any) => {
    event.preventDefault();
    buttonToggle(false);
  };

  return (
    <div className="relative">
      <form>
        <div className="text-lg mb-3 flex justify-between items-center border-b-2">
          <input
            className="w-full p-2 outline-0"
            type="text"
            placeholder="프로젝트 이름"
            onChange={subTaskInputChangeHanlder}
            value={subTaskInput}
          />
        </div>
        <div className="flex justify-between">
          <button className="text-base px-2 py-1 break-keep border-2 rounded-md hover:bg-gray-100">
            마감 날짜
          </button>
          <div>
            <button
              onClick={cancelHandler}
              className="text-base px-2 py-1 mr-2 break-keep border-2 rounded-md hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={submitHandler}
              className="text-base px-2 py-1 break-keep border-2 border-red-400 text-white bg-red-400 rounded-md hover:bg-red-500"
            >
              수정하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
