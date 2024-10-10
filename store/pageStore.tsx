import { create } from "zustand";
import Project from "./projectValidator";

// interface Project {
//   id: number;
//   toDo: string;
//   hexColorCode: string;
//   tasks: [];
// }

interface PageStore {
  currentPage: string;
  updatePage: (page: string) => void;
  currentProject: Project;
  updateCurrentProject: (project: Project) => void;
}

const pageStore = create<PageStore>((set) => ({
  currentPage: "main",
  currentProject: { id: 0, toDo: "", hexColorCode: "", tasks: [] },
  updatePage: (page: string) => {
    if (page) {
      set((state) => ({ currentPage: page }));
      console.log(page);
    }
    return;
  },
  updateCurrentProject: (project: Project) => {
    if (project) {
      set((state) => ({ currentProject: project }));
      console.log(project);
    }
    return;
  },
}));

export default pageStore;
