import axios from "axios";
import { create } from "zustand";

interface Tasks {
  id: string;
  task: string;
  deadline: string;
}

interface TaskStore {
  tasks: Tasks[];
  fetchTodoList: () => void;
  deleteTodoList: (id: string) => void;
}

const taskStore = create<TaskStore>((set) => ({
  tasks: [],
  fetchTodoList: async () => {
    try {
      const response = await fetch(
        `https://http-react-8fe59-default-rtdb.firebaseio.com/task.json/`
      );
      const data = await response.json();
      const loadedTask: Tasks[] = [];
      for (const key in data) {
        loadedTask.push({
          id: key,
          task: data[key].task,
          deadline: data[key].deadline,
        });
      }
      set((state) => ({ tasks: loadedTask }));
    } catch (error: any) {
      alert(error.message);
    }
  },
  deleteTodoList: async (id) => {
    const response = await axios.delete(
      `https://http-react-8fe59-default-rtdb.firebaseio.com/task/${id}.json`
    );
    const data = await response.data;
    console.log(data);
  },
}));

export default taskStore;
