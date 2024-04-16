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
    <div className="font-medium w-full mt-8">
      <div className="text-2xl mb-8 ml-6 ">
        <span className="px-6 py-2 rounded-full bg-blue-300">
          {projectName}
        </span>
      </div>
      <div className="px-8">
        <TaskList parentId={projectId} />
        <TaskFactory parentId={projectId} />
      </div>
    </div>
  );
}
