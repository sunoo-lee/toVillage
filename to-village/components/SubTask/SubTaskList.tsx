"use client";

import { useEffect, useState } from "react";
import SubTaskFactory from "./SubTaskFactory";
import SubTaskItem from "./SubTaskItem";
import SubTask from "@/store/subTaskValidator";
import Task from "@/store/taskValidator";
import axios from "axios";
import subTaskStore from "@/store/subTaskStore";

interface Props {
  taskData: Task;
  projectId: number;
}

export default function SubTaskList({ projectId, taskData }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const readSubTask = subTaskStore((state) => state.readSubTask);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // useEffect(() => {
  //   const readSubTaskList = async () => {
  //     const response = await axios.get(
  //       `http://localhost:8080/to-do/${projectId}`
  //     );
  //     const data: Task[] = await response.data[0].tasks;
  //     const newList = data.find((item) => item.id === taskData.id)
  //       ?.subtasks as SubTask[];
  //     setSubTasks(newList);
  //   };
  //   readSubTaskList();
  // }, [projectId, taskData.id]);

  useEffect(() => {
    const readSubTaskList = async () => {
      const newList = await readSubTask(projectId, taskData.id);
      setSubTasks(newList);
    };
    readSubTaskList();
  }, [projectId, readSubTask, taskData]);

  useEffect(() => {
    console.log(subTasks);
  }, [subTasks]);

  return (
    <div>
      <ul className="ml-12">
        {isLoaded ? (
          subTasks.map((item, i) => (
            <SubTaskItem
              setSubTasks={setSubTasks}
              projectId={projectId}
              taskId={taskData.id}
              data={item}
              key={i}
            />
          ))
        ) : (
          <div></div>
        )}
      </ul>
      <SubTaskFactory
        setSubTasks={setSubTasks}
        taskId={taskData.id}
        projectId={projectId}
      />
    </div>
  );
}
