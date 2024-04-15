"use client";

import TaskFactory from "@/components/Task/TaskFactory";
import TaskList from "@/components/Task/TaskList";
import projectStore from "@/store/projectStore";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import taskStore from "@/store/taskStore";
import Task from "@/store/taskValidator";

export default function ProjectDetails() {
  const [projectName, setProjectName] = useState("");
  const { project } = useParams() as { project: string };
  const projectId = parseInt(project);
  const readTask = taskStore((state) => state.readTask);

  useEffect(() => {
    const readProjectDetail = async () => {
      const response = await axios.get(
        `http://localhost:8080/to-do/${projectId}`
      );
      const data = response.data[0];
      setProjectName(data.toDo);
    };
    readProjectDetail();
  }, [projectId]);

  useEffect(() => {
    readTask(projectId);
  }, [projectId, readTask]);

  return (
    <div className=" font-medium w-full mb-8">
      <h1 className="p-4 text-3xl mb-4 border-b-2 border-slate-400/50">
        {projectName}
      </h1>
      <div className="px-4">
        <TaskList parentId={projectId} />
        <TaskFactory parentId={projectId} />
      </div>
    </div>
  );
}
