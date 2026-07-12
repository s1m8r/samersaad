interface Props {
  header: string;
  children: React.ReactNode;
}

export default function TextContent({ header, children }: Props) {
  return (
    <div className="flex py-0.5">
      <b className="w-32">{header}</b>
      <p>{children}</p>
    </div>
  );
}
