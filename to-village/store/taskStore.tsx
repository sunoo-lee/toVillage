import axios from "axios";
import { create } from "zustand";

interface Task {
  parentId: number;
  deadline: string;
  toDo: string;
  // done: number;
}

interface Tasks {
  id: number;
  deadline: string;
  done: number;
  toDo: string;
  indexNum: number;
  subtasks: [];
}

interface TaskStore {
  tasks: Tasks[];
  createTask: (item: Task) => void;
  readTask: (id: number) => void;
  updateTask: (item: Task) => void;
  deleteTask: (id: number) => void;
}

const taskStore = create<TaskStore>((set) => ({
  tasks: [],
  createTask: async (item: Task) => {
    const response = await axios.post(
      `http://localhost:8080/to-do/${item.parentId}`,
      {
        parentId: item.parentId,
        toDo: item.toDo,
        deadline: item.deadline,
      }
    );
  },

  readTask: async (id: number) => {
    const response = await axios.get(`http://localhost:8080/to-do/${id}`);
    const data = await response.data;
    set((state) => ({ tasks: data[0].tasks }));
  },

  updateTask: async (item: Task) => {
    const response = await axios.put(
      `http://localhost:8080/to-do/projectId/taskId`,
      {
        toDo: item.toDo,
      }
    );
  },
  deleteTask: async (id: number) => {
    const response = await axios.delete(`http://localhost:8080/to-do/${id}`);
    const data = response.data;
    console.log(data);
  },
}));

export default taskStore;
