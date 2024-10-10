"use client";

import taskStore from "@/store/taskStore";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TaskList from "../Task/TaskList";
import TaskFactory from "../Task/TaskFactory";
import pageStore from "@/store/pageStore";

export default function ProjectDetail() {
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState();
  const currentProject = pageStore((state) => state.currentProject);
  const readTask = taskStore((state) => state.readTask);
  const updatePage = pageStore((state) => state.updatePage);

  useEffect(() => {
    const readProjectDetail = async () => {
      const access_token = localStorage.getItem("access_token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      const response = await axios.get(
        `http://localhost:8080/to-do/${currentProject.id}`
      );
      const data = await response.data[0];
      console.log(data);
      setProjectId(data.id);
      setProjectName(data.toDo);
    };
    readProjectDetail();
  }, [currentProject]);

  useEffect(() => {
    if (projectId) {
      readTask(projectId);
    }
  }, [projectId, readTask]);

  const updatePageButtonHandler = () => {
    updatePage("project");
  };

  return (
    <div className="w-full mt-8 font-medium">
      <button
        onClick={updatePageButtonHandler}
        className="absolute p-2 px-4 bg-blue-200 rounded-full left-4 top-4"
      >
        뒤로가기
      </button>
      <div className="mb-8 ml-6 text-2xl ">
        <span className="px-6 py-2 bg-blue-300 rounded-full">
          {projectName}
        </span>
      </div>
      <div className="px-8">
        {projectId && <TaskList parentId={projectId} />}
        {projectId && <TaskFactory parentId={projectId} />}
      </div>
    </div>
  );
}
