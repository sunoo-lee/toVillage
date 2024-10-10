"use client";

import { useState } from "react";
import ProjectInput from "./ProjectInput";

export default function ProjectFactory() {
  const [addButtonToggle, setAddButtonToggle] = useState(false);
  const addButtonHandler = () => {
    if (addButtonToggle) {
      setAddButtonToggle(false);
    } else {
      setAddButtonToggle(true);
    }
  };

  return (
    <div>
      {!addButtonToggle ? (
        <button
          onClick={addButtonHandler}
          className="p-2 rounded-md text-base text-neutral-300 cursor-pointer hover:text-red-500"
        >
          +추가하기
        </button>
      ) : (
        <ProjectInput buttonToggle={setAddButtonToggle} />
      )}
    </div>
  );
}
