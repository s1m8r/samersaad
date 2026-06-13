import Table from "@/components/layout/table";

import { useGetUsers } from "@/API/user";
import { registerSchema } from "@/schemas/user";
import z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import DeleteUser from "./deleteUser";
import Button from "@/components/layout/button";
import { ArrowDownUp } from "lucide-react";
type registerFormData = z.infer<typeof registerSchema>
const ShowUser = () => {
    const navigate = useNavigate();
    const [showDel, setShowDel] = useState(false)
    const [userId, setUserId] = useState<number>()
    const [userName, setUserName] = useState("")
    const [page, setPage] = useState(1);

    
    const [sortBy, setSortBy] = useState("id")
    const [sortOrder, setSortOrder] = useState("asc")
    const order = (value: string) => {
    if (sortBy === value) {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
        setSortBy(value);
        setSortOrder("asc");
    }
};
    const { data } = useGetUsers(sortBy ,sortOrder ,page)
    const users = data?.data ?? [];
    const pagination = data?.pagination;
    const columns: ColumnDef<registerFormData>[] = [
        {
            accessorKey: "id",
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
            accessorKey: "firstName",
            header: () => (
            <span
            >
                First Name
            </span>
        ),
        },
        {
            accessorKey: "lastName",
            header: () => (
            <span
            >
                Last Name
            </span>
        ),
        },
        {
            accessorKey: "phone",
            header: () => (
            <span >
                Phone
            </span>
        ),
        },
        {
            accessorKey: "age",
            header: () => (
            <span
            >
               Age
            </span>
        ),
        },
        {
            accessorKey: "email",
            header: () => (
            <span
                    onClick={() => {
                        order("email")
                }}
            >
                Email
            </span>
        ),
        },
        {
            accessorKey:"address",
            header: () => (
            <span>
                Address
            </span>
            ),
            cell: ({ row }) => {
                const country = row.original.address?.country
                const city = row.original.address?.city
                const street = row.original.address?.street
                return <div> {country},{ city },{street} </div>
            }
        },
        {
            accessorKey:"role",
            header: () => (
                <span>
                Role
            </span>
            ),
        },
        {
            accessorKey:"isActive",
            header: () => (
                <span>
                Active
            </span>
            ),
        },
        {
            accessorKey:"x",
            header: () => (
            <span>
                Edit
            </span>
            ),
            cell: ({ row }) => {
                const id = row.original.id
                return <Button
                    onClick={()=>navigate({
            to: "/users/edit/$id",
            params: {
                id: id,
            },
                    })}
                    variant="editTable"
                    type="table"
                
                >Edit</Button>
            }
        },
        {
            accessorKey:"y",
            header: () => (
            <span>
                Delete
            </span>
            ),
            cell: ({ row }) => {
                const id = row.original.id
                const name = row.original.firstName
                return <Button onClick={() => {
                    setShowDel(true)
                    setUserId(id)
                    setUserName(name)
                }}
                    variant="delete"
                    type="table"
                >
                Delete
                </Button>
            }
        },
  
    ]
    return (<div>
        <div>
  <h1 className="text-2xl font-bold">Users</h1>
</div>
        {pagination && (
            <Table
                columns={columns}
                data={users ?? []}
                pagination={pagination}
                page={page}
                setPage={setPage}
            />
)}

        {showDel && userId && (
            <DeleteUser
                userId={userId}
                userName={userName}
                setShowDel={setShowDel}
    />
)}

    </div> );
}
export default ShowUser;