"use client";

import projectStore from "@/store/projectStore";
import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import ProjectBox from "../UI/ProjectBox";
import Task from "@/components/Task/taskValidator";
import taskStore from "@/store/taskStore";

interface dataList {
  dataList: Task[];
  parentId: number;
}

interface Tasks {
  id: number;
  deadline: string;
  done: number;
  toDo: string;
  indexNum: number;
  subtasks: [];
}

export default function TaskList({ parentId, dataList }: dataList) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  // const fetchTaskList = projectStore((state) => state.fetchProjectList);
  const readTask = taskStore((state) => state.readTask);
  const tasks = taskStore((state) => state.tasks);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // useEffect(() => {
  //   fetchTaskList();
  // }, [fetchTaskList]);

  useEffect(() => {
    readTask(parentId);
  }, [readTask, parentId]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div>
      <ul>
        {isLoaded ? (
          tasks.map((item, i) => (
            <ProjectBox key={i}>
              <TaskItem projectId={parentId} data={item} />
            </ProjectBox>
          ))
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
}
