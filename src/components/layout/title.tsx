interface Props {
  chlidren: React.ReactNode;
  descripsion?: string;
}
export default function Title({ chlidren, descripsion }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">{chlidren}</h1>

      {descripsion && <p className="text-muted-foreground">{descripsion}</p>}
    </div>
  );
}
