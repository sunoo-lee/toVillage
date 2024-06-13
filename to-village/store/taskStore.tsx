import axios from "axios";
import { create } from "zustand";
import Task from "./taskValidator";

interface NewTask {
  parentId: number;
  toDo: string;
  deadline: string;
}

interface UpdatedTask {
  id: number;
  toDo?: string;
  done: number;
}

interface TaskStore {
  tasks: Task[];
  createTask: (item: NewTask) => void;
  readTask: (id: number) => void;
  updateTask: (item: UpdatedTask) => void;
  deleteTask: (id: number) => void;
  updateTaskDone: (item: UpdatedTask) => void;
}

const taskStore = create<TaskStore>((set) => ({
  tasks: [],
  createTask: async (item: NewTask) => {
    const response = await axios.post(`http://localhost:8080/to-do`, item);
    // const data = await response.data;
    // console.log(data);
  },

  readTask: async (id: number) => {
    const access_token = localStorage.getItem("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    const response = await axios.get(`http://localhost:8080/to-do/${id}`);
    const data = await response.data;
    set((state) => ({ tasks: data[0].tasks }));
  },

  updateTask: async (item: UpdatedTask) => {
    const response = await axios.put(`http://localhost:8080/to-do`, item);
    const data = await response.data;
    // console.log(data);
  },
  deleteTask: async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/to-do/${id}`);
      // const data = response.data;
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
  updateTaskDone: async (item: UpdatedTask) => {
    const response = await axios.put(`http://localhost:8080/to-do/done`, item);
    const data = await response.data;
  },
}));

export default taskStore;
