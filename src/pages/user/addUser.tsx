import { useRegister } from "@/API/user";
import RegisterForm from "@/features/register/formRegister/register";
import { registerSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
type registerFormData = z.infer<typeof registerSchema>

const AddUser = () => {
    const { mutate, isPending } = useRegister()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const handleRegister = (data: registerFormData) => {
        const dataFormat = {
            ...data,
            age: Number(data.age),
            address: {
                street: "Al-Sadr City",
                city: "Baghdad",
                state: "Baghdad",
                zipCode: "10001",
                country: "Iraq"
            },
            phone: "07722759695",
            role: "user",
            roleId: 3,
            isActive: true,
        }
        mutate(dataFormat)
    }
    return (<div>
        <RegisterForm title="Add User"
            handleSubmit={handleSubmit}
            onsubmit={handleRegister}
            errors={errors}
            register={register}
            chlidrenButton="Add User"
            isPending={isPending}
        />
    </div>);
}

export default AddUser;