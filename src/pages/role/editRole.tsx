import {  useGetRole, useUpdateRole } from "@/API/role";
import Role from "@/features/role/role";
import { Route } from "@/routes/_proteced/roles/edit/$id";
import { roleScema } from "@/schemas/role";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
type roleFormData = z.infer<typeof roleScema>

const EditRole = () => {
    const navigate = useNavigate()
    const search =Route.useSearch()
        const { id } = Route.useParams();
    const { data:getRole } = useGetRole(id)

        const { register, handleSubmit,reset, formState: { errors,isDirty } } = useForm({
            resolver: zodResolver(roleScema),
        });
        const {mutate ,isPending}=useUpdateRole()
    const onsubmit = (data: roleFormData) => {
            const formatData = {
                ...data,
                permissionIds: data.permissionIds.map((per) => Number(per)) ,
                isActive: true
            }
            mutate({
                id: id,
                data: formatData
            },
                {onSuccess: () => {
                setTimeout(() => {
                    navigate({
                        to: search.from || "/",
                    });
                }, 200);
            },
            }
            
            )
    }
        useEffect(() => {
            if (getRole) reset({
                ...getRole,
                permissionIds:
                    getRole.permissionIds?.map(String) || [],
        })
    },[reset,getRole])
    return (<div>
            <Role title="Edit Role"
                    handleSubmit={handleSubmit}
                    errors={errors}
                    register={register}
                    onsubmit={onsubmit}
                    chlidrenButton="Edit Role"
            isPending={isPending}
            isDirty={isDirty}
            typeForm="edit"
                />
    </div> );
}
 
export default EditRole;