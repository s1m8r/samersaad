import { useAddRole } from "@/API/role";
import Role from "@/features/role/role";
import { roleScema } from "@/schemas/role";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
type roleFormData = z.infer<typeof roleScema>

const AddRole = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver :zodResolver(roleScema)
    });
    const {mutate ,isPending}=useAddRole()
    const onsubmit = (data: roleFormData) => {
        const formatData = {
            ...data,
            permissionIds: data.permissionIds.map((per) => Number(per)) ,
            isActive: true
        }
        mutate(formatData)
        
}
    return (<div>
        <Role title="Add Role"
            handleSubmit={handleSubmit}
            errors={errors}
            register={register}
            onsubmit={onsubmit}
            chlidrenButton="Add Role"
            isPending={isPending}
        />
    </div> );
}
export default AddRole;