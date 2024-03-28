"use client";

import projectStore from "@/store/projectStore";
import { useEffect, useState } from "react";
import TaskList from "../Task/TaskList";
import ProjectBox from "../UI/ProjectBox";
import ProjectModify from "./ProjectModify";

type Project = {
  id: number;
  toDo: string;
  done: number;
};

export default function ProjectItem({ id, toDo, done }: Project) {
  const buttonClass = " w-6 h-6 mr-2 border rounded-full ";
  const [classControl, setClassControl] = useState(buttonClass);
  const [updatedProject, setUpdatedProject] = useState(toDo);
  const [isToggled, setIsToggled] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [remoteToggle, setRemoteToggle] = useState(false);
  const deleteProject = projectStore((state) => state.deleteProject);
  const readProjectList = projectStore((state) => state.fetchProjectList);

  const detailHandler = (event: any) => {
    event.preventDefault();
    if (isToggled) {
      setIsToggled(false);
    } else {
      setIsToggled(true);
    }
  };

  const updateTaskHandler = (event: any) => {
    event.preventDefault();
    if (updateToggle) {
      setUpdateToggle(false);
    } else {
      setUpdateToggle(true);
    }
  };

  const deleteTaskHandler = async (event: any) => {
    event.preventDefault();
    console.log(typeof id, id);
    await deleteProject(id);
    readProjectList();
  };

  useEffect(() => {
    if (isToggled) {
      setClassControl(buttonClass + "bg-cyan-400");
    } else {
      setClassControl(buttonClass + "bg-white");
    }
  }, [isToggled]);

  const toggleButtonHandler = (event: any) => {
    event.preventDefault();
    if (remoteToggle) {
      setRemoteToggle(false);
    } else {
      setRemoteToggle(true);
    }
  };

  const dropdownOff = () => {
    setRemoteToggle(false);
  };

  return (
    <>
      {!updateToggle ? (
        <ProjectBox>
          <li>
            <div>
              <div className="flex justify-between items-center">
                <div className="flex">
                  <div>
                    <button
                      onClick={detailHandler}
                      className="bg-white w-6 h-6"
                    >
                      ▷
                    </button>
                  </div>
                  <div>{toDo}</div>
                </div>
                <div className="relative flex">
                  <button
                    className=" cursor-pointer"
                    onClick={toggleButtonHandler}
                    onBlur={dropdownOff}
                  >
                    +
                  </button>
                  {remoteToggle && (
                    <div className="absolute flex flex-col right-0 top-8 z-50">
                      <button
                        onClick={updateTaskHandler}
                        className="px-3 py-1 break-keep text-sm text-center border border-neutral-300 border-b-0  text-black bg-white rounded-t-2xl hover:bg-blue-500 "
                      >
                        수정
                      </button>
                      <button
                        onClick={deleteTaskHandler}
                        className="px-3 py-1 break-keep text-sm text-center border border-neutral-300  text-black bg-white rounded-b-2xl hover:bg-red-500 "
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isToggled && (
              <div className="mt-3 pt-3 pl-5 border-t-2">
                <TaskList id={id} />
              </div>
            )}
          </li>
        </ProjectBox>
      ) : (
        <ProjectModify
          buttonToggle={updateTaskHandler}
          id={id}
          toDo={toDo}
          done={done}
        />
      )}
    </>
  );
}
