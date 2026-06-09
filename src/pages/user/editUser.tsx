import { useGetUser, useUpdateUser } from "@/API/user";
import RegisterForm from "@/features/register/formRegister/register";
import { Route } from "@/routes/users/edit/$id";
import { registerSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
type registerFormData = z.infer<typeof registerSchema>


const EditUser = () => {
    const { id } = Route.useParams();
    const { data: getUser, isLoading } = useGetUser(id);
    const { mutate, isPending } = useUpdateUser();
    const { register, handleSubmit, reset, formState: { errors } } = useForm(
        {
            resolver: zodResolver(registerSchema),
        }

    )

    useEffect(() => {
        if (getUser) reset(getUser)
    }, [getUser, reset])

    const onsubmit = (data: registerFormData) => {

        const formatData = {
            ...data,
            address: {
                street: getUser?.address?.street,
                city: getUser?.address?.city,
                state: getUser?.address?.state,
                zipCode: getUser?.address?.zipCode,
                country: getUser?.address?.country
            },
            phone: getUser?.phone,
            isActive: getUser?.isActive,
        }
        mutate({
            id: id,
            data: formatData,
        })
        console.log(data)
    }
    return (<div>
        <RegisterForm title="Edit User"
            handleSubmit={handleSubmit}
            onsubmit={onsubmit}
            errors={errors}
            register={register}
            isPending={isPending}
            chlidrenButton="Edit"
            isLoading={isLoading}
            hasPassword={false}
            active="edit"
        />
    </div>);
}

export default EditUser;