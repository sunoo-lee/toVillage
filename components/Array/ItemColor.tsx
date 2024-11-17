export default function ItemColor({
  bgColor,
  onClick,
}: {
  bgColor: string;
  onClick: (color: string) => void;
}) {
  const onClickItem = () => {
    onClick(bgColor);
  };

  return (
    <div
      onClick={onClickItem}
      className={`${bgColor} cursor-pointer w-12 h-12 rounded-full hover:border-2 hover:border-black`}
    ></div>
  );
}
