import Table from "@/components/layout/table";
import z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { roleScema } from "@/schemas/role";
import { useGetRoles } from "@/API/role";
import DeleteRole from "./DeleteRolw";

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

  const { data } = useGetRoles(sortBy, sortOrder, page);

  const roles = data?.data ?? [];
  const pagination = data?.pagination;

  const columns: ColumnDef<roleFormData>[] = [
    {
      accessorKey: "id",
      header: () => (
        <span onClick={() => order("id")}>
          ID
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <span onClick={() => order("name")}>
          Name
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: () => (
        <span onClick={() => order("description")}>
          Description
        </span>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => (
        <span onClick={() => order("isActive")}>
          Active
        </span>
      ),
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
                to: "/role/edit/$id",
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
              setRoleId(id);
              setRoleName(name);
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
  <h1 className="text-2xl font-bold">Role</h1>
</div>
      {pagination && (
        <Table
          columns={columns}
          data={roles}
          pagination={pagination}
          page={page}
          setPage={setPage}
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