import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];

  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };

  page: number;
  setPage: (page: number) => void;
};

export default function Table<T>({
  data = [],
  columns,
  pagination,
  page,
  setPage,
}: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full space-y-4">
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-xs"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-gray-700 dark:text-gray-200"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(page - 1)}
                className={
                  !pagination?.hasPreviousPage
                    ? "pointer-events-none opacity-40"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink isActive className="font-medium">
                {pagination?.currentPage}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(page + 1)}
                className={
                  !pagination?.hasNextPage
                    ? "pointer-events-none opacity-40"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}