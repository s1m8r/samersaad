import Table from "@/components/layout/table";
import z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { storeScema } from "@/schemas/store"; 
import { useGetStores } from "@/API/store";
import DeleteStore from "./deleteStore";
import { ArrowDownUp } from "lucide-react";
import Button from "@/components/layout/button";

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
  const goToAdd = () => {
    navigate({
      to: "/stores/addstore",
      search: {
        from: "/stores",
      },
    })
  }
  const [search ,setSearch]=useState("")

  const { data } = useGetStores(sortBy, sortOrder, page, search);

  const stores = data?.data ?? [];
  const pagination = data?.pagination;

  const columns: ColumnDef<storeFormData>[] = [
    {
      accessorKey: "id",
      size:5,
      header: () => (<span
                    className="group flex items-center gap-1 cursor-pointer"
                    onClick={() => order("id")}>
                    <ArrowDownUp
                        size={12}
                        className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                    <span>id</span>
                </span>),
    },
    {
      accessorKey: "name",
      size:20,
      header: () => <span>Name</span>,
    },
    {
      accessorKey: "email",
      size:20,
      header: () => <span>Email</span>,
    },
    {
      accessorKey: "phone",
      size:20,
      header: () => <span >Phone</span>,
    },
    {
      accessorKey: "owner",
      size:5,
      header: () => <span >Owner</span>,
    },
    {
      accessorKey: "rating",
      size:5,
      header: () => <span >Rating</span>,
    },
    {
      accessorKey: "isActive",
      size:5,
      header: () => <span>Active</span>,
    },
    {
      accessorKey: "edit",
      size:5,
      header: () => <span>Edit</span>,
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Button
            variant="editTable"
            type="table"
            onClick={() =>
              navigate({
                to: "/stores/edit/$id",
                params: {
                  id,
                },
                search: {
                  from: "/stores",
                },
              })
            }
          >
            Edit
          </Button>
        );
      },
    },
    {
      accessorKey: "delete",
      size:5,
      header: () => <span>Delete</span>,
      cell: ({ row }) => {
        const id = row.original.id;
        const name = row.original.name;

        return (
          <Button
            variant="delete"
            type="table"
            onClick={() => {
              setShowDel(true);
              setStoreId(id);
              setStoreName(name);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      {pagination && (
        <Table
          columns={columns}
          data={stores}
          pagination={pagination}
          page={page}
          setPage={setPage}
          title="stores"
          textButton="add store"
          onClick={goToAdd}
          setSearch={setSearch}
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