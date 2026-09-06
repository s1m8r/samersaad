interface Props {
  children: React.ReactNode;
}

export default function DesignCard({ children }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{children}</div>
  );
}
