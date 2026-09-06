interface Props {
  children: React.ReactNode;
}

export function Design({ children }: Props) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="animate-in fade-in-0 slide-in-from-bottom-3 flex justify-center rounded-xl border border-border bg-card p-5 shadow-sm duration-500 ease-out">
        {children}
      </div>
    </div>
  );
}
