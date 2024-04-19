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

  return (
    <>
      {!updateToggle ? (
        <Link href={`/project/${projectData.id}`}>
          <ProjectBox>
            <div>
              <div className="flex justify-between items-center">
                <div className="flex">
                  <div></div>
                  <div>{projectData.toDo}</div>
                </div>
                <div className="relative flex">
                  <div className="flex">
                    <button
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
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ProjectBox>
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
