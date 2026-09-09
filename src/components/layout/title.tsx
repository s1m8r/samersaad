interface Props {
  children: React.ReactNode;
  description?: string;
}
export default function Title({ children, description }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">{children}</h1>

      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
