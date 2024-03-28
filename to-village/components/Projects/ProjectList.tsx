"use client";

import projectStore from "@/store/projectStore";
import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";

const DUMMY = [
  { id: 0, toDo: "1111", done: 0 },
  { id: 1, toDo: "2222", done: 0 },
  { id: 2, toDo: "3333", done: 1 },
  { id: 3, toDo: "4444", done: 1 },
];

export default function ProjectList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const projectList = projectStore((state) => state.projects);
  // const projectList = DUMMY;
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
