interface Props {
  email: string;
  setEmail: (email: string) => void;
}

export default function Email({ email, setEmail }: Props) {
  const inputChangehandler = (event: any) => {
    const input = event.target.value;
    setEmail(input);
  };

  return (
    <div className="w-full">
      <div className="text-2xl font-bold mb-8">이메일을 입력해주세요.</div>
      <div>
        <input
          className="outline-none border-b border-black bg-transparent py-1"
          type="email"
          name="email"
          id="user-email"
          onChange={inputChangehandler}
          value={email}
          placeholder="welcome@tovillage.space"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
