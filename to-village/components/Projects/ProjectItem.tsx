"use client";

import projectStore from "@/store/projectStore";
import { useEffect, useState } from "react";
import TaskList from "../Task/TaskList";
import ProjectBox from "../UI/ProjectBox";
import ProjectModify from "./ProjectModify";
import Link from "next/link";

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
  const updateProject = projectStore((state) => state.updateProject);

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
    setTimeout(() => setRemoteToggle(false), 100);
    // setRemoteToggle(false);
  };

  return (
    <>
      {!updateToggle ? (
        <Link href={`/${id}`}>
          <ProjectBox>
            <li>
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <div>
                      {/* <button
                      onClick={detailHandler}
                      className="bg-white w-6 h-6"
                    >
                      ▷
                    </button> */}
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
                          onClick={updateToggleHandler}
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
                  {/* <TaskList id={id} /> */}
                </div>
              )}
            </li>
          </ProjectBox>
        </Link>
      ) : (
        <ProjectModify
          buttonToggle={updateToggleHandler}
          id={id}
          toDo={toDo}
          done={done}
        />
      )}
    </>
  );
}
