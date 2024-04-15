"use client";

import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import ProjectBox from "../UI/ProjectBox";
import taskStore from "@/store/taskStore";

interface dataList {
  parentId: number;
}

export default function TaskList({ parentId }: dataList) {
  const [isLoaded, setIsLoaded] = useState(false);
  const readTask = taskStore((state) => state.readTask);
  const tasks = taskStore((state) => state.tasks);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    readTask(parentId);
  }, [readTask, parentId]);

  return (
    <div>
      <ul>
        {isLoaded ? (
          tasks.map((item, i) => (
            <ProjectBox key={i}>
              <TaskItem projectId={parentId} taskData={item} />
            </ProjectBox>
          ))
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
}
