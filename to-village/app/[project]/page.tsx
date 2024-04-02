"use client";

import TaskFactory from "@/components/Task/TaskFactory";
import TaskList from "@/components/Task/TaskList";
import projectStore from "@/store/projectStore";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Task from "../../components/Task/taskValidator";

export default function ProjectDetails() {
  const [detailList, setDetailList] = useState<Task[]>([]);
  const [projectName, setProjectName] = useState("");
  const { project } = useParams() as { project: string };
  const projectId = parseInt(project);

  useEffect(() => {
    const readProjectDetail = async (id: number) => {
      const response = await axios.get(`http://localhost:8080/to-do/${id}`);
      const data = await response.data;
      const { toDo } = data[0];
      setProjectName(toDo);
      setDetailList(data[0].tasks);
      // console.log(projectId, toDo);
    };
    readProjectDetail(projectId);
  }, [projectId]);

  return (
    <div className=" font-medium w-full mb-8">
      <h1 className="p-4 text-3xl mb-4 border-b-2 border-slate-400/50">
        {projectName}
      </h1>
      <div className="px-4">
        <TaskList parentId={projectId} dataList={detailList} />
        <TaskFactory parentId={projectId} />
      </div>
    </div>
  );
}
