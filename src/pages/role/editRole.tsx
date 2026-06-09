import {  useGetRole, useUpdateRole } from "@/API/role";
import Role from "@/features/role/role";
import { Route } from "@/routes/role/edit/$id";
import { roleScema } from "@/schemas/role";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
type roleFormData = z.infer<typeof roleScema>

const EditRole = () => {
        const { id } = Route.useParams();
    const { data:getRole } = useGetRole(id)

        const { register, handleSubmit,reset, formState: { errors } } = useForm({
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
                data:formatData
            })
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
                />
    </div> );
}
 
export default EditRole;