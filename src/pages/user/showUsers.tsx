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
    const [search,setSearch]=useState("")
    const { data } = useGetUsers(sortBy, sortOrder, page, search)
    const users = data?.data ?? [];
    const pagination = data?.pagination;
    const goToAdd = () => {
        navigate({
            to: "/users/adduser",
            search: {
                from: "/users"
            }
        })
    }
    const columns: ColumnDef<registerFormData>[] = [
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
            accessorKey: "firstName",
            size:20,
            header: () => (
            <span
            >
                First Name
            </span>
        ),
        },
        {
            accessorKey: "lastName",
            size:20,
            header: () => (
            <span
            >
                Last Name
            </span>
        ),
        },
        {
            accessorKey: "phone",
            size:10,
            header: () => (
            <span >
                Phone
            </span>
        ),
        },
        {
            accessorKey: "age",
            size:5,
            header: () => (
            <span
            >
               Age
            </span>
        ),
        },
        {
            accessorKey: "email",
            size:25,
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
            accessorKey: "address",
            size:25,
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
            accessorKey: "role",
            size:5,
            header: () => (
                <span>
                Role
            </span>
            ),
        },
        {
            accessorKey: "isActive",
            size:5,
            header: () => (
                <span>
                Active
            </span>
            ),
        },
        {
            accessorKey: "x",
            size:5,
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
                        search: {
                            from: "/users",
                        },
                    })}
                    variant="editTable"
                    type="table"
                
                >Edit</Button>
            }
        },
        {
            accessorKey: "y",
            size:5,
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
        {pagination && (
            <Table
                columns={columns}
                data={users ?? []}
                pagination={pagination}
                page={page}
                setPage={setPage}
                title="users"
                textButton="Add User"
                onClick={goToAdd}
                setSearch={setSearch}
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