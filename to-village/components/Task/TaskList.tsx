"use client";

import projectStore from "@/store/projectStore";
import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

export default function TaskList(id: any) {
  const [isLoaded, setIsLoaded] = useState(false);
  const projectList = projectStore((state) => state.projects);
  const fetchTaskList = projectStore((state) => state.fetchProjectList);

  const taskList = projectList.find((element) => element.id === id.id)?.tasks;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetchTaskList();
  }, [fetchTaskList]);

  return (
    <div>
      <ul>
        {isLoaded ? (
          taskList?.map((item) => (
            <TaskItem
              key={item.id}
              id={item.id}
              toDo={item.toDo}
              done={item.done}
            />
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
