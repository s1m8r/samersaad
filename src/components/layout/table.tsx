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
import { Plus, SearchIcon } from "lucide-react";
import useDebounce from "../functions/searchDelay";
import { Can } from "../functions/can";
import { Button } from "../ui/button";

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
            <Button onClick={onClick} variant="default">
              <Plus />
              {textButton}
            </Button>
          </Can>
        </div>
        <Field className="w-fit">
          <InputGroup>
            <InputGroupInput
              id="inline-end-input"
              placeholder="Search"
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
      <div className="max-h-[500px] w-full overflow-x-auto overflow-y-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full animate-in fade-in-0 slide-in-from-bottom-2 overflow-auto text-sm duration-300">
          <thead className="sticky top-0 z-10 bg-muted text-muted-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase"
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

          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className="animate-in fade-in-0 slide-in-from-bottom-1 fill-mode-both transition-colors duration-300 hover:bg-muted/40"
                style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-foreground">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-muted-foreground"
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
