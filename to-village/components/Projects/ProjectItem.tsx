"use client";

import projectStore from "@/store/projectStore";
import { useEffect, useState } from "react";
import ProjectBox from "../UI/ProjectBox";
import ProjectModify from "./ProjectModify";
import Link from "next/link";
import Project from "@/store/projectValidator";

interface Props {
  projectData: Project;
}

export default function ProjectItem({ projectData }: Props) {
  const [updateToggle, setUpdateToggle] = useState(false);
  const deleteProject = projectStore((state) => state.deleteProject);
  const readAllProject = projectStore((state) => state.readAllProject);

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
    await deleteProject(projectData.id);
    await readAllProject();
  };

  const dropdownHandler = async (event: any) => {
    event.preventDefault();
    setDropdown((state) => !state);
  };

  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      {!updateToggle ? (
        <Link href={`/project/${projectData.id}`}>
          <div
            className={`w-full p-3 px-5 bg-white border-2 rounded-xl border-slate-200 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden ${
              dropdown ? "h-40" : "h-16"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="px-4 py-1 text-xl rounded-full bg-blue-400">
                  {projectData.toDo}
                </div>
              </div>
              <div className="relative flex">
                <div className="flex">
                  <button
                    className={`p-2 transition-all ${
                      dropdown && "rotate-[270deg] rotate"
                    }`}
                    onClick={dropdownHandler}
                  >
                    <div className="bg-black w-5 h-1"></div>
                  </button>
                  {/* <button
                    onClick={updateToggleHandler}
                    className="w-6 h-6 mr-2 text-sm text-center text-white bg-blue-300 rounded-full hover:bg-blue-500 "
                  >
                    E
                  </button>
                  <button
                    onClick={deleteTaskHandler}
                    className="w-6 h-6 mr-2 text-sm text-center text-white bg-red-400 rounded-full hover:bg-red-500 "
                  >
                    D
                  </button> */}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <ul>
                <li>test1</li>
                <li>test2</li>
              </ul>
            </div>
          </div>
        </Link>
      ) : (
        <ProjectModify
          buttonToggle={updateToggleHandler}
          projectData={projectData}
        />
      )}
    </>
  );
}
