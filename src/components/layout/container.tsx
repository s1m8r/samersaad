interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="animate-in fade-in-0 slide-in-from-bottom-3 p-5 duration-500 ease-out">
        {children}
      </div>
    </div>
  );
}
