interface Props {
  email: string;
}

export default function Finish({ email }: Props) {
  return (
    <div className="w-full">
      <div className="text-xl font-bold mb-8">회원가입이 완료되었습니다.</div>
      <div>Email: {email}</div>
    </div>
  );
}
