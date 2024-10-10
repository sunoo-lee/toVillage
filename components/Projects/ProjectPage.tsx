import pageStore from "@/store/pageStore";
import ProjectFactory from "./ProjectFactory";
import ProjectList from "./ProjectList";

export default function ProjectPage() {
  const updatePage = pageStore((state) => state.updatePage);

  const updatePageButtonHandler = () => {
    updatePage("main");
  };
  return (
    <div className="w-full font-medium ">
      <button
        onClick={updatePageButtonHandler}
        className="absolute p-2 px-4 bg-blue-200 rounded-full left-4 top-4"
      >
        뒤로가기
      </button>
      <div className="p-4 mb-4 text-3xl border-b-2 border-slate-400/50">
        Project List
      </div>
      <div className="px-4 text-2xl">
        <ProjectList />
        <ProjectFactory />
      </div>
    </div>
  );
}
