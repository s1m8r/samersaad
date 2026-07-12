interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className=" p-5
      animate__animated animate__fadeIn
      animate-duration
      "
      >
        {children}
      </div>
    </div>
  );
}
