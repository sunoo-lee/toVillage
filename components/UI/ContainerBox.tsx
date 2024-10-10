export default function ContainerBox(props: any) {
  return (
    <div className="absolute min-w-[20rem] max-w-[20rem] max-h-[36rem] w-full h-full bg-login-main bg-contain bg-no-repeat bg-center content-center grid place-items-center overflow-hidden">
      {props.children}
    </div>
  );
}
