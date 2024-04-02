"use client";

import projectStore from "@/store/projectStore";
import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";
export default function ProjectList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const projectList = projectStore((state) => state.projects);
  const fetchProjectList = projectStore((state) => state.fetchProjectList);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetchProjectList();
  }, [fetchProjectList]);

  return (
    <div>
      <ul>
        {isLoaded ? (
          projectList.map((item) => (
            <ProjectItem
              key={item.id}
              id={item.id}
              toDo={item.toDo}
              done={item.done}
            />
          ))
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
}
