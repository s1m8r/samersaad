import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/API/user";
import { userScema } from "@/schemas/user";
import ErrorMessage from "@/components/forms/errors";
import { Spinner } from "@/components/ui/spinner";

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
      
      <div className="w-full max-w-md rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm p-6">
        
        {/* TITLE */}
        <h1 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-6">
          Login
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          {/* BUTTON */}
          <Button className="w-full" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner className="h-4 w-4" />
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;