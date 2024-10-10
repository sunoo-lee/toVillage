import Task from "./taskValidator";

interface Project {
  id: number;
  toDo: string;
  hexColorCode: string;
  tasks: Task[];
}

export default Project;
