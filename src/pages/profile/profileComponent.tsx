interface Props {
  title: string;
  dataInformation: string;
}

export function ProComponent({ title, dataInformation }: Props) {
  return (
    <div className="w-full flex justify-between mb-3 py-2 border-b border-gray-300 dark:border-gray-700 ">
      <span className="text-sm text-gray-500">{title}: </span>
      <span className="text-sm text-gray-900 dark:text-white">
        {dataInformation}
      </span>
    </div>
  );
}
