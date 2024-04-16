"use client";

import projectStore from "@/store/projectStore";
import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Project from "@/store/projectValidator";

export default function ProjectList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const projectList = projectStore((state) => state.projects);
  const readAllProject = projectStore((state) => state.readAllProject);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    const sourceKey = source.droppableId;
    const destKey = destination.droppableId;

    const newList = JSON.parse(JSON.stringify(projects)) as typeof projects;
    const [targetList] = newList.splice(source.index, 1);
    newList.splice(destination?.index, 0, targetList);
    setProjects(newList);
    console.log(sourceKey);
    console.log(destKey);
    // console.log(">>> source", source);
    // console.log(">>> destination", destination);
  };

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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"project"}>
        {(provided, snapshot) => (
          <div>
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {isLoaded ? (
                projects.map((item, i) => (
                  <Draggable key={item.id} draggableId={item.id + ""} index={i}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ProjectItem projectData={item} />
                      </li>
                    )}
                  </Draggable>
                ))
              ) : (
                <div></div>
              )}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
