interface Props {
  name: string;
  count: number;
  icon: React.ReactNode;
  itemSelect?: string;
}

export default function CardNew({ name, count, icon, itemSelect }: Props) {
  const style = "text-sm text-muted-foreground";
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm w-60">
      <div className="flex justify-between">
        <p className={`${style}`}>{name}</p>
        <span className={`${style}`}>{icon}</span>
      </div>
      <div className="flex items-end gap-2">
        <h2 className="mt-2 text-3xl font-bold">{count}</h2>
        {itemSelect && <span className={`${style}`}>{itemSelect}</span>}
      </div>
    </div>
  );
}
