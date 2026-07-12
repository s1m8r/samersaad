interface Props {
  children: React.ReactNode;
}

export default function Padding({ children }: Props) {
  return <div className="space-y-8 p-6 w-full">{children}</div>;
}
