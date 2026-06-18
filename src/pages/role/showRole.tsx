import Table from "@/components/layout/table";
import z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { roleScema } from "@/schemas/role";
import { useGetRoles } from "@/API/role";
import DeleteRole from "./DeleteRolw";
import { ArrowDownUp } from "lucide-react";
import Button from "@/components/layout/button";

type roleFormData = z.infer<typeof roleScema>;

const ShowRole = () => {
  const navigate = useNavigate();

  const [showDel, setShowDel] = useState(false);
  const [roleId, setRoleId] = useState<number>();
  const [roleName, setRoleName] = useState("");

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
      to: "/roles/addrole",
      search: {
        from:"/roles"
      }
    })
    
  }
  const [search,setSearch]=useState("")

  const { data } = useGetRoles(sortBy, sortOrder, page ,search);

  const roles = data?.data ?? [];
  const pagination = data?.pagination;

  const columns: ColumnDef<roleFormData>[] = [
    {
      accessorKey: "id",
      size:5,
      header: () => (
        <span
          className="group flex items-center gap-1 cursor-pointer"
          onClick={() => order("id")}>
          <ArrowDownUp
            size={12}
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
          <span>id</span>
        </span>
      ),
    },
    {
      accessorKey: "name",
      size:10,
      header: () => (
        <span>
          Name
        </span>
      ),
    },
    {
      accessorKey: "description",
      size:10,
      header: () => (
        <span onClick={() => order("description")}>
          Description
        </span>
      ),
    },
    {
      accessorKey: "isActive",
      minSize:2,
      header: () => (
        <span onClick={() => order("isActive")}>
          Active
        </span>
      ),
    },
    {
      accessorKey: "edit",
      size:2,
      header: () => <span>Edit</span>,
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <Button
            variant="editTable"
            type="table"
            onClick={() =>
              navigate({
                to: "/roles/edit/$id",
                params: {
                  id,
                },
                search: {
                  from:"/roles"
                }
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
              setRoleId(id);
              setRoleName(name);
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
          data={roles}
          pagination={pagination}
          page={page}
          setPage={setPage}
          title="roles"
          textButton="add role"
          onClick={goToAdd}
          setSearch={setSearch}
        />
      )}

      {showDel && roleId && (
        <DeleteRole
          roleId={roleId}
          roleName={roleName}
          setShowDel={setShowDel}
        />
      )}
    </div>
  );
};

export default ShowRole;