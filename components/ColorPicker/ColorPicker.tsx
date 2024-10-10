"use client";

import { useState } from "react";
import ColorPalette from "./ColorPalette";

export default function ColorPicker() {
  const [color, setColor] = useState("bg-red-400");
  const [palette, setPalette] = useState(false);

  const buttonClickHandler = (event: any) => {
    event.preventDefault();
    setPalette((state) => !state);
  };

  return (
    <div className="bg-white">
      {palette ? (
        <ColorPalette setColor={setColor} setPalette={setPalette} />
      ) : (
        <button
          onClick={buttonClickHandler}
          className="bg-white p-1 border rounded-full"
        >
          <div className={`w-5 h-5 rounded-full ${color}`}></div>
        </button>
      )}
    </div>
  );
}
