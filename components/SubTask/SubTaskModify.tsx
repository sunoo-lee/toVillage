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
    <div className="relative w-full mb-2 bg-white">
      <div className="border shadow-sm rounded-full px-6 py-2 mt-3 ml-4">
        <form>
          <div className="text-lg flex justify-between items-center my-1 border-b">
            <input
              className="w-full px-2 outline-0 "
              type="text"
              placeholder="프로젝트 이름"
              onChange={subTaskInputChangeHanlder}
              value={subTaskInput}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <button className="text-base px-2 py-1 break-keep rounded-md hover:bg-red-300">
                마감
              </button>
              <button className="text-base px-2 py-1 break-keep rounded-md hover:bg-red-300">
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
                수정
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
