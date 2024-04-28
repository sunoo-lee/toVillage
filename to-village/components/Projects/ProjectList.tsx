"use client";

import projectStore from "@/store/projectStore";
import Project from "@/store/projectValidator";
import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";

export default function ProjectList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const projectList = projectStore((state) => state.projects);
  const readAllProject = projectStore((state) => state.readAllProject);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    readAllProject();
  }, [readAllProject]);

  useEffect(() => {
    setProjects(projectList);
  }, [projectList]);

  return (
    <div>
      <ul>
        {isLoaded ? (
          projects.map((item, i) => (
            <li key={i}>
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
