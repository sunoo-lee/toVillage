import axios from "axios";
import { create } from "zustand";

interface Task {
  projectId: number;
  taskId: number;
  toDo: string;
  done: number;
}

interface TaskStore {
  createTask: (item: Task) => void;
  updateTask: (item: Task) => void;
  deleteTask: (item: Task) => void;
}

const taskStore = create<TaskStore>((set) => ({
  createTask: async (item: Task) => {
    const response = axios.post(`http://localhost:8080/to-do/projectId`, {
      toDo: item.toDo,
    });
  },
  updateTask: async (item: Task) => {
    const response = axios.patch(
      `http://localhost:8080/to-do/projectId/taskId`,
      {
        toDo: item.toDo,
      }
    );
  },
  deleteTask: async (item: Task) => {
    const response = axios.delete(
      `http://localhost:8080/to-do/projectId/taskId`
    );
  },
}));

export default taskStore;
