import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full select-none scrollbar-hide px-4">
      <div className=" text-center ">
        <button className="mt-20 bg-rose-400 text-white text-5xl px-8 py-10 rounded-full">
          back to village
        </button>
      </div>
      {/* <Project /> */}
      <div className="text-2xl mt-6">
        <div className="ml-4 text">Daily Task</div>
        <ul>
          <li className="mt-2 bg-lime-200 p-2 rounded-full">
            <div className="flex justify-between px-2 pl-4">
              <div>task</div>
              <div>&#9744;</div>
            </div>
          </li>
          <li className="mt-2 bg-lime-200 p-2 rounded-full">
            <div className="flex justify-between px-2 pl-4">
              <div>task</div>
              <div>&#9744;</div>
            </div>
          </li>
          <li className="mt-2 bg-purple-200 p-2 rounded-full">
            <div className="flex justify-between px-2 pl-4">
              <div>task</div>
              <div>&#9744;</div>
            </div>
          </li>
          <li className="mt-2 bg-yellow-200 p-2 rounded-full">
            <div className="flex justify-between px-2 pl-4">
              <div>task</div>
              <div>&#9744;</div>
            </div>
          </li>
          <li>
            <div className="text-center text-7xl">&#43;</div>
          </li>
        </ul>
      </div>
      <Link href="/project">
        <div className="text-2xl mt-4">
          <div className="ml-4 text">Project</div>
          <ul className="flex mt-2 overflow-x-scroll ">
            <li className="bg-lime-200 px-12 py-16 rounded-3xl mr-4">
              <div className="py-2">p</div>
            </li>
            <li className="bg-blue-200 px-12 py-16 rounded-3xl mr-4">
              <div className="py-2">p</div>
            </li>
            <li className="bg-purple-200 px-12 py-16 rounded-3xl mr-4">
              <div className="py-2">p</div>
            </li>
            <li className="bg-yellow-200 px-12 py-16 rounded-3xl mr-4">
              <div className="py-2">p</div>
            </li>
          </ul>
        </div>
      </Link>
    </main>
  );
}
