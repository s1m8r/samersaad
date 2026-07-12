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
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import useDebounce from "../functions/searchDelay";
import { Can } from "../functions/can";
import Button from "./button";

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  title: string;
  onClick: () => void;
  textButton: string;
  setSearch: Dispatch<SetStateAction<string>>;
  permissionAdd: string;
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
  permissionAdd,
}: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 400);

  useEffect(() => {
    setSearch(debounceQuery);
  }, [debounceQuery, setSearch]);
  return (
    <div className="w-full space-y-4">
      <div>
        <div className=" flex justify-between">
          <h1 className="text-2xl font-bold capitalize">{title}</h1>
          <Can permission={permissionAdd}>
            <Button onClick={onClick} variant="add" width="w-fit">
              {textButton}
            </Button>
          </Can>
        </div>
        <Field className="w-fit">
          <InputGroup>
            <InputGroupInput
              id="inline-end-input"
              placeholder="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon />
            </InputGroupAddon>
            {query.length > 0 && (
              <InputGroupAddon
                align="inline-end"
                className="cursor-pointer"
                onClick={() => {
                  setQuery("");
                  setSearch("");
                }}
              >
                ×
              </InputGroupAddon>
            )}
          </InputGroup>
        </Field>
      </div>
      <div className="w-full max-h-[500px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-200  bg-white shadow-sm">
        <table className="w-full text-sm overflow-auto animate__animated animate__fadeIn">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 sticky top-0 z-10 ">
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
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100 ">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-3 text-center text-gray-700 dark:text-gray-200"
                >
                  No search results found
                </td>
              </tr>
            )}
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
            {!pagination?.hasNextPage && pagination.totalPages > 2 && (
              <PaginationItem>
                <PaginationLink onClick={() => setPage(page - 2)}>
                  {pagination?.currentPage - 2}
                </PaginationLink>
              </PaginationItem>
            )}
            {pagination?.currentPage !== 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => setPage(page - 1)}>
                  {pagination?.currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {pagination?.currentPage}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              {pagination?.hasNextPage && (
                <PaginationLink onClick={() => setPage(page + 1)}>
                  {pagination?.currentPage + 1}
                </PaginationLink>
              )}
            </PaginationItem>
            {!pagination?.hasPreviousPage && pagination.totalPages > 2 && (
              <PaginationItem>
                <PaginationLink onClick={() => setPage(page + 2)}>
                  {pagination?.currentPage + 2}
                </PaginationLink>
              </PaginationItem>
            )}
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
