interface Props {
  name: string;
  count: number | string;
  icon: React.ReactNode;
  itemSelect?: string;
  accent?: "primary" | "violet" | "emerald" | "rose";
}

const accentStyles = {
  primary: "bg-[#3987e5] text-[#0b0f19]",
  violet: "bg-[#9085e9] text-[#0b0f19]",
  emerald: "bg-[#199e70] text-[#0b0f19]",
  rose: "bg-[#d55181] text-[#0b0f19]",
} as const;

export default function CardNew({
  name,
  count,
  icon,
  itemSelect,
  accent = "primary",
}: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{name}</p>
        <span
          className={`flex size-8 items-center justify-center rounded-lg [&>svg]:size-4 ${accentStyles[accent]}`}
        >
          {icon}
        </span>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <h2 className="text-3xl font-semibold tabular-nums text-foreground">
          {count}
        </h2>
        {itemSelect && (
          <span className="mb-0.5 truncate text-sm text-muted-foreground">
            {itemSelect}
          </span>
        )}
      </div>
    </div>
  );
}
