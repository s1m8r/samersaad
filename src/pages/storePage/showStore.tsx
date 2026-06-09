import Table from "@/components/layout/table";
import z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { storeScema } from "@/schemas/store"; 
import { useGetStores } from "@/API/store";
import DeleteStore from "./deleteStore";

type storeFormData = z.infer<typeof storeScema>;

const ShowStore = () => {
  const navigate = useNavigate();

  const [showDel, setShowDel] = useState(false);
  const [storeId, setStoreId] = useState<number>();
  const [storeName, setStoreName] = useState("");

  const [page, setPage] = useState(1);

  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const order = (value: string) => {
    if (sortBy === value) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }
  };

  const { data } = useGetStores(sortBy, sortOrder, page);

  const stores = data?.data ?? [];
  const pagination = data?.pagination;

  const columns: ColumnDef<storeFormData>[] = [
    {
      accessorKey: "id",
      header: () => <span onClick={() => order("id")}>ID</span>,
    },
    {
      accessorKey: "name",
      header: () => <span onClick={() => order("name")}>Name</span>,
    },
    {
      accessorKey: "email",
      header: () => <span onClick={() => order("email")}>Email</span>,
    },
    {
      accessorKey: "phone",
      header: () => <span onClick={() => order("phone")}>Phone</span>,
    },
    {
      accessorKey: "owner",
      header: () => <span onClick={() => order("owner")}>Owner</span>,
    },
    {
      accessorKey: "rating",
      header: () => <span onClick={() => order("rating")}>Rating</span>,
    },
    {
      accessorKey: "isActive",
      header: () => <span onClick={() => order("isActive")}>Active</span>,
    },
    {
      accessorKey: "edit",
      header: () => <span>Edit</span>,
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <button
            onClick={() =>
              navigate({
                to: "/store/edit/$id",
                params: {
                  id,
                },
              })
            }
          >
            Edit
          </button>
        );
      },
    },
    {
      accessorKey: "delete",
      header: () => <span>Delete</span>,
      cell: ({ row }) => {
        const id = row.original.id;
        const name = row.original.name;

        return (
          <button
            onClick={() => {
              setShowDel(true);
              setStoreId(id);
              setStoreName(name);
            }}
          >
            Delete
          </button>
        );
      },
    },
  ];

  return (
    <div>
         <div>
  <h1 className="text-2xl font-bold">ٍStore</h1>
</div>
      {pagination && (
        <Table
          columns={columns}
          data={stores}
          pagination={pagination}
          page={page}
          setPage={setPage}
        />
      )}

      {showDel && storeId && (
        <DeleteStore
          storeId={storeId}
          storeName={storeName}
          setShowDel={setShowDel}
        />
      )}
    </div>
  );
};

export default ShowStore;