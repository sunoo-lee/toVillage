export default function ProjectBox(props: any) {
  return (
    <div className="w-full p-3 px-5 bg-white border-b-2  border-slate-200 cursor-pointer">
      {props.children}
    </div>
  );
}
