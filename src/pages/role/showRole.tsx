import Table from "@/components/layout/table";
import z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { roleScema } from "@/schemas/role";
import { useGetRoles } from "@/API/role";
import DeleteRole from "./DeleteRole";
import { ArrowDownUp, Pencil, Trash2 } from "lucide-react";
import { usepermissions } from "@/stores/usePermissions";
import { Can } from "@/components/functions/can";
import Padding from "@/components/layout/padding";
import { Button } from "@/components/ui/button";

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
        from: "/roles",
      },
    });
  };
  const [search, setSearch] = useState("");

  const { data } = useGetRoles(sortBy, sortOrder, page, search);

  const roles = data?.data ?? [];
  const pagination = data?.pagination;

  const columns: ColumnDef<roleFormData>[] = [
    {
      accessorKey: "id",
      size: 5,
      header: () => (
        <span
          className="group flex items-center gap-1 cursor-pointer"
          onClick={() => order("id")}
        >
          <ArrowDownUp
            size={12}
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
          <span>ID</span>
        </span>
      ),
    },
    {
      accessorKey: "name",
      size: 10,
      header: () => <span>Name</span>,
    },
    {
      accessorKey: "description",
      size: 10,
      header: () => <span>Description</span>,
      cell: ({ row }) => (
        <p
          className="line-clamp-2 max-w-xs"
          title={row.original.description}
        >
          {row.original.description}
        </p>
      ),
    },
    {
      accessorKey: "isActive",
      minSize: 2,
      header: () => <span>Active</span>,
    },
    {
      accessorKey: "edit",
      size: 2,
      header: () => null,
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <Can permission={usepermissions.updateRoles}>
            <Button
              variant="default"
              size="icon"
              aria-label="Edit"
              onClick={() =>
                navigate({
                  to: "/roles/edit/$id",
                  params: {
                    id,
                  },
                  search: {
                    from: "/roles",
                  },
                })
              }
            >
              <Pencil />
            </Button>
          </Can>
        );
      },
    },
    {
      accessorKey: "delete",
      size: 5,
      header: () => null,
      cell: ({ row }) => {
        const id = row.original.id;
        const name = row.original.name;

        return (
          <Can permission={usepermissions.deleteRoles}>
            <Button
              variant="destructive"
              size="icon"
              aria-label="Delete"
              onClick={() => {
                setShowDel(true);
                setRoleId(id);
                setRoleName(name);
              }}
            >
              <Trash2 />
            </Button>
          </Can>
        );
      },
    },
  ];

  return (
    <Padding>
      {pagination && (
        <Table
          columns={columns}
          data={roles}
          pagination={pagination}
          page={page}
          setPage={setPage}
          title="roles"
          textButton="Add Role"
          onClick={goToAdd}
          setSearch={setSearch}
          permissionAdd={usepermissions.createRoles}
        />
      )}

      {showDel && roleId && (
        <DeleteRole
          roleId={roleId}
          roleName={roleName}
          setShowDel={setShowDel}
        />
      )}
    </Padding>
  );
};

export default ShowRole;
