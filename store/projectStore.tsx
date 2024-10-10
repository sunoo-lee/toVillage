import axios from "axios";
import { create } from "zustand";
import Project from "./projectValidator";

interface ProjectList {
  projects: Project[];
  readAllProject: () => void;
  readProjectDetail: (id: number) => void;
  createProject: (item: NewProject) => void;
  updateProject: (item: NewProject) => void;
  deleteProject: (id: number) => void;
}

interface NewProject {
  id?: number;
  toDo: string;
  hexColorCode: string;
}

const projectStore = create<ProjectList>((set) => ({
  projects: [],
  readAllProject: async () => {
    try {
      const access_token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      const response = await axios.get(`http://localhost:8080/to-do`);
      const data = await response.data;
      const loadedProject: Project[] = [];
      for (const key in data) {
        loadedProject.push({
          id: data[key].id,
          toDo: data[key].toDo,
          hexColorCode: data[key].hexColorCode,
          tasks: data[key].tasks,
        });
      }
      set((state) => ({ projects: loadedProject }));
      // console.log(loadedProject);
    } catch (error: any) {
      alert(error.message);
    }
  },
  readProjectDetail: async (id: number) => {
    const response = await axios.get(`http://localhost:8080/to-do/${id}`);
  },
  createProject: async (item: NewProject) => {
    const response = await axios.post("http://localhost:8080/to-do", item);
    // const data = await response.data;
    // console.log(data);
  },
  updateProject: async (item: NewProject) => {
    const response = await axios.put(`http://localhost:8080/to-do`, item);
    // const data = await response.data;
    // console.log(data);
  },
  deleteProject: async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/to-do/${id}`);
      // const data = response.data;
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default projectStore;
