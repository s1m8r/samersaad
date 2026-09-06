import { useRegister } from "@/API/user";
import RegisterForm from "@/features/register/formRegister/register";
import AuthBrandPanel from "@/components/layout/authBrandPanel";
import { registerSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
type registerFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { mutate, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const handleRegister = (data: registerFormData) => {
    const dataFormat = {
      ...data,
      age: data.age,
      address: {
        street: "Al-Sadr City",
        city: "Baghdad",
        state: "Baghdad",
        zipCode: "10001",
        country: "Iraq",
      },
      phone: "07722759695",
      role: "user",
      roleId: 3,
      isActive: true,
    };
    mutate(dataFormat);
  };
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthBrandPanel
        title="Set up your team in minutes."
        description="Create an account to manage stores, products and roles from one dashboard, with permissions that keep every team in its lane."
      />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          <div className="mb-2 flex flex-col items-center gap-2 lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-border">
              <img
                src="/logo.png"
                alt="logo"
                className="size-full object-contain"
              />
            </span>
          </div>
          <RegisterForm
            title="Create your account"
            handleSubmit={handleSubmit}
            onsubmit={handleRegister}
            errors={errors}
            register={register}
            chlidrenButton="Register"
            isPending={isPending}
            hasLogin="yes"
            isRegister={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
