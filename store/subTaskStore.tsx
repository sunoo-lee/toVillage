import axios from "axios";
import { create } from "zustand";
import SubTask from "./subTaskValidator";
import Task from "./taskValidator";

interface SubTaskStore {
  subtasks: SubTask[];
  createSubTask: (item: NewSubTask) => void;
  readSubTask: (projectId: number, taskId: number) => Promise<SubTask[]>;
  updateSubTask: (item: UpdatedSubTask) => void;
  deleteSubTask: (id: number) => void;
  updateSubTaskDone: (item: UpdatedSubTask) => void;
}

interface NewSubTask {
  parentId: number;
  toDo: string;
  deadline: string;
}

interface UpdatedSubTask {
  id: number;
  toDo?: string;
  done: number;
}

const subTaskStore = create<SubTaskStore>((set) => ({
  subtasks: [],
  createSubTask: async (item: NewSubTask) => {
    const response = await axios.post(`http://localhost:8080/to-do`, item);
    // const data = await response.data;
    // console.log(data);
  },
  readSubTask: async (projectId: number, taskId: number) => {
    const response = await axios.get(
      `http://localhost:8080/to-do/${projectId}`
    );
    const data: Task[] = await response.data[0].tasks;
    const newList = data.find((item) => item.id === taskId)
      ?.subtasks as SubTask[];
    return newList;
  },
  updateSubTask: async (item: UpdatedSubTask) => {
    const response = await axios.put(`http://localhost:8080/to-do`, item);
    // const data = await response.data;
    // console.log(data);
  },
  deleteSubTask: async (id: number) => {
    const response = await axios.delete(`http://localhost:8080/to-do/${id}`);
    // const data = await response.data;
    // console.log(data);
  },
  updateSubTaskDone: async (item: UpdatedSubTask) => {
    const response = await axios.put(`http://localhost:8080/to-do/done`, item);
    const data = await response.data;
  },
}));

export default subTaskStore;
