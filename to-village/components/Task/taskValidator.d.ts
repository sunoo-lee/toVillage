import SubTask from "../SubTask/subTaskValidator";

interface Task {
  id: number;
  indexNum: number;
  deadline: string;
  toDo: string;
  done: number;
  subtasks: SubTask[];
}

export default Task;
