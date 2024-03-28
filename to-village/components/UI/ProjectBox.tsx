export default function ProjectBox(props: any) {
  return (
    <div className="w-full p-3 px-5 mb-2 bg-white border-2 rounded-xl border-slate-200">
      {props.children}
    </div>
  );
}
