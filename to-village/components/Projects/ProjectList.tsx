"use client";

import projectStore from "@/store/projectStore";
import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";

export default function ProjectList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const projectList = projectStore((state) => state.projects);
  const readAllProject = projectStore((state) => state.readAllProject);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    readAllProject();
  }, [readAllProject]);

  return (
    <div>
      <ul>
        {isLoaded ? (
          projectList.map((item) => (
            <li key={item.id}>
              <ProjectItem projectData={item} />
            </li>
          ))
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
}
