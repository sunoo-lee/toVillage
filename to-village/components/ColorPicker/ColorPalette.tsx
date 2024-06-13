import ColorButton from "./ColorButton";

interface Props {
  setColor: (color: string) => void;
  setPalette: (state: boolean) => void;
}

const COLOR_PALLETE = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-lime-400",
  "bg-blue-400",
  "bg-violet-400",
];

export default function ColorPalette({ setColor, setPalette }: Props) {
  return (
    <ul className="flex gap-1">
      {COLOR_PALLETE.map((item, i) => (
        <li key={i}>
          <ColorButton
            color={item}
            setColor={setColor}
            setPalette={setPalette}
          />
        </li>
      ))}
    </ul>
  );
}
