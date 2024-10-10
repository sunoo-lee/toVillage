import SubTask from "./subTaskValidator";

interface Task {
  id: number;
  toDo: string;
  done: number;
  deadline: string;
  indexNum: number;
  hexColorCode: string;
  subtasks: SubTask[];
}

export default Task;
