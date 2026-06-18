import { useGetUser, useUpdateUser } from "@/API/user";
import RegisterForm from "@/features/register/formRegister/register";
import { Route } from "@/routes/_proteced/users/edit/$id";
import { registerSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
type registerFormData = z.infer<typeof registerSchema>

const EditUser = () => {
    const search = Route.useSearch();
    const { id } = Route.useParams();
    const navigate = useNavigate();  
    const { data: getUser, isLoading } = useGetUser(id);
    const { mutate, isPending } = useUpdateUser();
    const { register, handleSubmit, reset, formState: { errors ,isDirty} } = useForm(
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
        mutate(
  {
    id: id,
    data: formatData,
  },
  {
    onSuccess: () => {
      setTimeout(() => {
        navigate({
          to: search.from || "/",
        });
      }, 200);
    },
  }
);
        
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
            isDirty={isDirty}
        />
    </div>);
}

export default EditUser;