interface Props {
  children: React.ReactNode;
}

export function Design({ children }: Props) {
  return (
    <>
      <div className="w-full max-w-xl mx-auto">
        <div
          className="rounded-xl border bg-white shadow-sm p-5
        flex justify-center
      animate__animated animate__fadeIn
      animate-duration
      "
        >
          {children}
        </div>
      </div>
    </>
  );
}
