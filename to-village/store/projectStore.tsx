import axios from "axios";
import { create } from "zustand";

// 1. axios 전역 설정
// axios.defaults.withCredentials = true; // withCredentials 전역 설정

interface Project {
  id: number;
  toDo: string;
  done: number;
  tasks: Task[];
}

interface NewProject {
  id: number;
  toDo: string;
  done: number;
}
interface Task {
  id: number;
  toDo: string;
  done: number;
  subTask: SubTask[];
}
interface SubTask {
  id: number;
  toDo: string;
  done: number;
}

interface ProjectList {
  projects: Project[];
  fetchProjectList: () => void;
  fetchProjectDetail: (id: number) => void;
  createProject: (item: Project) => void;
  updateProject: (id: number, item: NewProject) => void;
  deleteProject: (id: number) => void;
}

const projectStore = create<ProjectList>((set) => ({
  projects: [],
  fetchProjectList: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/to-do/`);
      const data = await response.data;
      const loadedProject: Project[] = [];
      for (const key in data) {
        loadedProject.push({
          id: data[key].id,
          toDo: data[key].toDo,
          done: data[key].done,
          tasks: data[key].tasks,
        });
      }
      set((state) => ({ projects: loadedProject }));
      console.log(data);
    } catch (error: any) {
      alert(error.message);
    }
  },
  fetchProjectDetail: async (id: number) => {
    const response = await axios.get(`http://localhost:8080/to-do/${id}`);
  },
  createProject: async (item: Project) => {
    const response = await axios.post("http://localhost:8080/to-do", {
      toDo: item.toDo,
    });
  },
  updateProject: async (id: number, item: NewProject) => {
    const response = await axios.patch(`http://localhost:8080/to-do/${id}`, {
      toDo: item.toDo,
      done: item.done,
    });
  },
  deleteProject: async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/to-do/${id}`);
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default projectStore;
