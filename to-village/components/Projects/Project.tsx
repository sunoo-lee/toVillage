import TodoFactory from "../Task/TaskFactory";
import TodoItem from "../Task/TaskItem";
import TodoList from "../Task/TaskList";
import ProjectFactory from "./ProjectFactory";
import ProjectList from "./ProjectList";

export default function Project() {
  return (
    <div className=" font-medium w-full mb-8">
      <div className="p-4 text-3xl mb-4 border-b-2 border-slate-400/50">
        Project List
      </div>
      <div className="text-2xl px-4">
        <ProjectList />
        <ProjectFactory />
      </div>
    </div>
  );
}
