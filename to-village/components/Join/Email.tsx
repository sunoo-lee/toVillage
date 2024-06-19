interface Props {
  email: string;
  setEmail: (email: string) => void;
  setState: () => void;
}

export default function Email({ email, setEmail, setState }: Props) {
  const inputChangehandler = (event: any) => {
    const input = event.target.value;
    setEmail(input);
  };
  const onKeyPressHandler = (event: any) => {
    if (event.key === "Enter") {
      setState();
    }
  };

  return (
    <div className="w-full">
      <div className="relative z-0">
        <input
          className="block w-full text-sm border-0 border-b-2 text-gray-900  border-gray-300 bg-transparent px-1 pt-2 appearance-none focus:outline-none focus:ring-0 focus:border-[#6B4B45] peer"
          type="email"
          name="email"
          id="user-email"
          onChange={inputChangehandler}
          onKeyDown={onKeyPressHandler}
          value={email}
          placeholder=" "
          autoComplete="off"
          autoFocus={true}
        />
        <label
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#6B4B45] peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 "
          htmlFor="user-email"
        >
          이메일
        </label>
      </div>
    </div>
  );
}
