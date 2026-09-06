import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/API/user";
import { userScema } from "@/schemas/user";
import ErrorMessage from "@/components/forms/errors";
import { Link } from "@tanstack/react-router";
import { KeySquareIcon, MailIcon } from "lucide-react";
import InputForm from "@/components/forms/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  type loginSchemaType = z.infer<typeof userScema>;

  const { mutate, isPending, isError, error } = useLogin();

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
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, color-mix(in oklch, var(--sidebar-primary) 35%, transparent), transparent 55%), radial-gradient(circle at 85% 85%, color-mix(in oklch, var(--sidebar-primary) 22%, transparent), transparent 50%)",
          }}
        />
        <Link to="/" className="relative flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-sm">
            <img src="/logo.png" alt="logo" className="size-full object-contain" />
          </span>
          <span className="font-heading text-sm font-semibold tracking-tight">
            samer-web
          </span>
        </Link>
        <div className="relative max-w-sm">
          <p className="font-heading text-3xl leading-tight font-semibold">
            Run every store from one dashboard.
          </p>
          <p className="mt-3 text-sm text-sidebar-foreground/70">
            Manage stores, products, users and roles in one place, with
            permissions that keep every team in its lane.
          </p>
        </div>
        <p className="relative text-xs text-sidebar-foreground/50">
          &copy; {new Date().getFullYear()} samer-web
        </p>
      </div>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm animate-in fade-in-0 slide-in-from-bottom-3 duration-500 ease-out">
          <div className="mb-8 flex flex-col items-center gap-2 lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-border">
              <img src="/logo.png" alt="logo" className="size-full object-contain" />
            </span>
          </div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Welcome back
          </h1>
          <p className="mt-1 mb-8 text-sm text-muted-foreground">
            Sign in to continue to your dashboard.
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <InputForm
              register={register}
              icon={<MailIcon />}
              name="email"
              placeholder="Email"
              label="Email"
              errorMessage={errors.email?.message}
            />

            <InputForm
              register={register}
              icon={<KeySquareIcon />}
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
              errorMessage={errors.password?.message}
              isPassword={true}
            />

            <Button
              variant="default"
              disabled={isPending}
              className="w-full"
              size="lg"
            >
              Sign in
            </Button>
          </form>
          {isError && <ErrorMessage>{error.message}</ErrorMessage>}
          <Link
            to="/register"
            className="mt-6 flex justify-center text-sm text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
          >
            I don't have an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
