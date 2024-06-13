export default function AuthPageBox(props: any) {
  return (
    <div className="absolute  max-h-screen min-w-[20rem] max-w-[20rem] w-full h-full bg-login-main bg-contain bg-no-repeat bg-center grid place-items-center  overflow-hidden">
      {props.children}
    </div>
  );
}
