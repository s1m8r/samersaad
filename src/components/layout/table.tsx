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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction } from "react";

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  title: string;
  onClick: () => void;
  textButton: string;
  setSearch: Dispatch<SetStateAction<string>>
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
  title,
  onClick,
  textButton,
  setSearch,
}: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full space-y-4">
      <div>
      <div className=" flex justify-between"><h1 className="text-2xl font-bold capitalize">{title}</h1>
        <Button onClick={onClick} className="capitalize cursor-pointer"> {textButton}</Button>
        </div>
        <Input className=" w-fit" placeholder="search" onChange={(e) => setSearch?.(e.target.value)} />
      </div>
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <table className="w-full text-sm overflow-auto">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
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

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 animate__animated animate__fadeInUp">
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
              <PaginationPrevious onClick={() => setPage(page - 1)}
                className={
                  !pagination?.hasPreviousPage
                    ? "pointer-events-none opacity-40"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {(!pagination?.hasNextPage && pagination.totalPages >2)&&<PaginationItem>
              <PaginationLink onClick={() => setPage(page - 2)}>{pagination?.currentPage -2}</PaginationLink>
            </PaginationItem>}
            {pagination?.currentPage!==1 && <PaginationItem>
              <PaginationLink onClick={() => setPage(page - 1)} >{pagination?.currentPage-1 }</PaginationLink>
            </PaginationItem>}
        <PaginationItem>
          <PaginationLink href="#" isActive>{pagination?.currentPage }</PaginationLink>
            </PaginationItem>
            
        <PaginationItem>
              {pagination?.hasNextPage && <PaginationLink onClick={() => setPage(page + 1)} >
                {pagination?.currentPage + 1}
              </PaginationLink>}
            </PaginationItem>
             {(!pagination?.hasPreviousPage && pagination.totalPages >2)&&<PaginationItem>
              <PaginationLink onClick={() => setPage(page + 2)}>{pagination?.currentPage +2}</PaginationLink>
            </PaginationItem>}
        <PaginationItem>
          <PaginationNext onClick={() => setPage(page + 1)}
                className={
                  !pagination?.hasNextPage
                    ? "pointer-events-none opacity-40"
                    : "cursor-pointer"
                } />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
        {/* <Pagination>
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
        </Pagination> */}
      </div>
    </div>
  );
}