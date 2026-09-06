import { useRouterState } from "@tanstack/react-router";

interface Props {
  children: React.ReactNode;
}

export default function PageTransition({ children }: Props) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <div
      key={pathname}
      className="min-h-0 flex-1 animate-in fade-in-0 slide-in-from-bottom-3 duration-500 ease-out"
    >
      {children}
    </div>
  );
}
