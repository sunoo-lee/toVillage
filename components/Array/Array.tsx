import ArrayItem from "./ArrayItem";

const ARRAY = [
  [
    { type: "bg-red-300", building: 1 },
    { type: "bg-amber-300", building: 1 },
    { type: "bg-blue-300", building: 2 },
    { type: "bg-green-300", building: 0 },
  ],
  [
    { type: "bg-green-300", building: 0 },
    { type: "bg-red-300", building: 1 },
    { type: "bg-amber-300", building: 1 },
    { type: "bg-blue-300", building: 2 },
  ],
  [
    { type: "bg-red-300", building: 1 },
    { type: "bg-blue-300", building: 2 },
    { type: "bg-green-300", building: 0 },
    { type: "bg-amber-300", building: 1 },
  ],
  [
    { type: "bg-blue-300", building: 2 },
    { type: "bg-amber-300", building: 1 },
    { type: "bg-red-300", building: 1 },
    { type: "bg-green-300", building: 0 },
  ],
];
const EMPTY = [
  [
    { type: 1, building: 0 },
    { type: 1, building: 0 },
    { type: 0, building: 0 },
    { type: 1, building: 0 },
  ],
  [
    { type: 1, building: 0 },
    { type: 1, building: 0 },
    { type: 0, building: 0 },
    { type: 0, building: 0 },
  ],
  [
    { type: 0, building: 0 },
    { type: 0, building: 0 },
    { type: 1, building: 0 },
    { type: 0, building: 0 },
  ],
  [
    { type: 1, building: 0 },
    { type: 1, building: 0 },
    { type: 0, building: 0 },
    { type: 0, building: 0 },
  ],
];
export default function ArrayTest() {
  return (
    <div className=" w-[600px] h-[600px] relative">
      {/* <div className=" w-[600px] h-[600px] relative scale-y-50"> */}
      <div className="w-full h-full">
        {/* <div className="w-full h-full rotate-45"> */}
        {EMPTY.map((item, i) => (
          <div className="flex  h-1/4" key={i}>
            {item.map((element, j) => (
              <ArrayItem
                key={j}
                building={element.building}
                type={element.type}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
