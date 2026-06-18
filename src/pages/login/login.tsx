import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/API/user";
import { userScema } from "@/schemas/user";
import ErrorMessage from "@/components/forms/errors";
import ButtonPending from "@/components/layout/buttonPending";
import { Link } from "@tanstack/react-router";

const Login = () => {
  type loginSchemaType = z.infer<typeof userScema>;

  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(userScema),
  });

  const handleLogin = (data: loginSchemaType) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      
      <div className="w-full max-w-md rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm p-6
      animate__animated animate__fadeIn
      custom-animation
      "> 
        <h1 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-6">
          Login
        </h1>
<div>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Email
            </label>
            <Input
              placeholder="Email"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Password
            </label>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <ButtonPending variant="primary" disabled={isPending} children="Login" isPending={isPending} />
        </form>
 <Link
  to="/register"
  className="text-sm text-gray-500 hover:text-black transition underline underline-offset-4 flex justify-center mb-2 mt-2"
>
  I don't have account
          </Link>
          </div>
      </div>
    </div>
  );
};

export default Login;