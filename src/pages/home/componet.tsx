interface Props {
  title: string;
  icon: React.ReactNode;
  items: number;
}

export default function HomeComponents({ title, icon, items }: Props) {
  return (
    <div className="w-72 flex flex-col items-center gap-3 rounded-xl bg-white px-4 py-4 shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div className="flex flex-col items-center text-center leading-tight">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-xl font-bold text-gray-900">{items}</span>
      </div>
    </div>
  );
}
