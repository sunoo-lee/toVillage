interface Props {
  setColor: (color: string) => void;
  setPalette: (state: boolean) => void;
  color: string;
}

export default function ColorButton({ setColor, setPalette, color }: Props) {
  const buttonClickHandler = (event: any) => {
    event.preventDefault();
    setColor(color);
    setPalette(false);
    console.log(color);
  };
  return (
    <button
      onClick={buttonClickHandler}
      className="bg-white p-1 border rounded-full"
    >
      <div className={`w-5 h-5 rounded-full ${color}`}></div>
    </button>
  );
}
