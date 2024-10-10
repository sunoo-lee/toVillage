"use client";

import projectStore from "@/store/projectStore";
import Project from "@/store/projectValidator";
import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";
import ColorPicker from "../ColorPicker/ColorPicker";
import { useRouter } from "next/navigation";

export default function ProjectList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const projectList = projectStore((state) => state.projects);
  const readAllProject = projectStore((state) => state.readAllProject);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    try {
      readAllProject();
    } catch (error: any) {
      router.push("/auth");
      alert(error.message);
    }
  }, [readAllProject]);

  useEffect(() => {
    setProjects(projectList);
  }, [projectList]);

  return (
    <div>
      <ul>
        {isLoaded ? (
          projects.map((item, i) => (
            <li className="mb-2" key={i}>
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
