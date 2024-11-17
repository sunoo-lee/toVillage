"use client";

import { useState } from "react";
import ItemColor from "./ItemColor";

export default function ArrayItem({
  building,
  type,
}: {
  building: number;
  type: number;
}) {
  const [toggle, setToggle] = useState(false);
  const [color, setColor] = useState("bg-white");
  const [buildingType, setBuildingType] = useState(0);

  const onClickItem = () => {
    setToggle((prev) => !prev);
  };

  const onClickColor = (pickColor: string) => {
    setColor(pickColor);
    setToggle(false);
    if (pickColor === "bg-red-300") {
      setBuildingType(1);
    } else if (pickColor === "bg-amber-300") {
      setBuildingType(2);
    } else if (pickColor === "bg-green-300") {
      setBuildingType(3);
    } else if (pickColor === "bg-blue-300") {
      setBuildingType(4);
    }
  };

  return (
    <div className={`relative bg-white w-1/4 text-2xl`}>
      {type ? (
        <div
          onClick={onClickItem}
          className={`${color} cursor-pointer w-full h-full content-center`}
        >
          <p className="text-5xl text-center">{buildingType}</p>
        </div>
      ) : (
        <div
          className={`bg-slate-300 text-slate-100 italic w-full h-full content-center`}
        >
          <p className="text-5xl text-center">{buildingType}</p>
        </div>
      )}

      {toggle && (
        <div className="absolute -bottom-12 -right-2/3 z-20 text-center py-2 bg-slate-300 border-2 border-black">
          <span>선택지</span>
          <div className=" flex gap-2 p-2">
            <ItemColor onClick={onClickColor} bgColor="bg-red-300" />
            <ItemColor onClick={onClickColor} bgColor="bg-amber-300" />
            <ItemColor onClick={onClickColor} bgColor="bg-green-300" />
            <ItemColor onClick={onClickColor} bgColor="bg-blue-300" />
          </div>
        </div>
      )}
    </div>
  );
}
