import axios from "axios";
import { create } from "zustand";

interface SubTask {
  projectId: number;
  taskId: number;
  subId: number;
  toDo: string;
  done: number;
}

interface SubTaskStore {
  createSubTask: (item: SubTask) => void;
  updateSubTask: (item: SubTask) => void;
  deleteSubTask: (item: SubTask) => void;
}

const subTaskStore = create<SubTaskStore>((set) => ({
  createSubTask: async (item: SubTask) => {
    const response = axios.post(
      `http://localhost:8080/to-do/projectId/taskId`,
      {
        toDo: item.toDo,
      }
    );
  },
  updateSubTask: async (item: SubTask) => {
    const response = axios.patch(
      `http://localhost:8080/to-do/projectId/taskId/subId`,
      {
        toDo: item.toDo,
      }
    );
  },
  deleteSubTask: async (item: SubTask) => {
    const response = axios.delete(
      `http://localhost:8080/to-do/projectId/taskId/subId`
    );
  },
}));

export default subTaskStore;
