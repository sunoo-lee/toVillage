"use client";

import { useState } from "react";
import ProjectInput from "./ProjectInput";

export default function ProjectFactory() {
  const [addButtonToggle, setaddButtonToggle] = useState(false);
  const addButtonHandler = () => {
    if (addButtonToggle) {
      setaddButtonToggle(false);
    } else {
      setaddButtonToggle(true);
    }
  };

  return (
    <div>
      {!addButtonToggle ? (
        <button
          onClick={addButtonHandler}
          className="p-2 rounded-md text-base text-red-500 cursor-pointer hover:bg-red-100"
        >
          +추가하기
        </button>
      ) : (
        <ProjectInput buttonToggle={setaddButtonToggle} />
      )}
    </div>
  );
}
