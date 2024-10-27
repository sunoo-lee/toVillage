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
export default function ArrayTest() {
  return (
    <div className="bg-white w-[600px] h-[600px] relative rotate-45">
      <div className="w-full h-full">
        {ARRAY.map((item, i) => (
          <div className="flex  h-1/4" key={i}>
            {item.map((element, j) => (
              <div className={`${element.type} w-1/4 text-2xl`} key={j}>
                {element.building}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
