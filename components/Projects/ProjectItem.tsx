"use client";

import projectStore from "@/store/projectStore";
import { useEffect, useState } from "react";
import ProjectBox from "../UI/ProjectBox";
import ProjectModify from "./ProjectModify";
import Link from "next/link";
import Project from "@/store/projectValidator";
import pageStore from "@/store/pageStore";

interface Props {
  projectData: Project;
}

export default function ProjectItem({ projectData }: Props) {
  const [updateToggle, setUpdateToggle] = useState(false);
  const deleteProject = projectStore((state) => state.deleteProject);
  const readAllProject = projectStore((state) => state.readAllProject);
  const updatePage = pageStore((state) => state.updatePage);
  const updateCurrentProject = pageStore((state) => state.updateCurrentProject);

  const updateButtonHandler = () => {
    updatePage("projectDetail");
    updateCurrentProject(projectData);
  };

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
        <div
          onClick={updateButtonHandler}
          className={`w-full p-3 px-5 bg-white border-2 rounded-xl border-slate-200 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden ${
            dropdown ? "h-40" : "h-16"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="px-4 py-1 text-xl bg-blue-400 rounded-full">
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
                  <div className="w-5 h-1 bg-black"></div>
                </button>
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
      ) : (
        <ProjectModify
          buttonToggle={updateToggleHandler}
          projectData={projectData}
        />
      )}
    </>
  );
}
