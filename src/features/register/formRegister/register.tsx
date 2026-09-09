import { z } from "zod";
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { registerSchema } from "@/schemas/user";
import { Spinner } from "@/components/ui/spinner";

import { useRoles } from "@/API/role";
import InputForm from "@/components/forms/input";
import { Calendar, Lock, Mail, UserRound } from "lucide-react";
import { Link } from "@tanstack/react-router";
import TitleContent from "@/components/layout/titleContent";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

type registerFormData = z.infer<typeof registerSchema>;

type Role = {
  id: number;
  name: string;
};

type Props = {
  title: string;
  handleSubmit: UseFormHandleSubmit<registerFormData>;
  onsubmit: (data: registerFormData) => void;
  errors: FieldErrors<registerFormData>;
  register: UseFormRegister<registerFormData>;
  isPending?: boolean;
  childrenButton: string;
  hasPassword?: boolean;
  isLoading?: boolean;
  isDirty?: boolean;
  isRegister?: boolean;
  active?: "add" | "edit";
  hasLogin?: "yes" | "no";
};

export default function RegisterForm({
  title,
  handleSubmit,
  onsubmit,
  errors,
  register,
  isPending,
  childrenButton,
  hasPassword = true,
  isLoading,
  isDirty,
  active = "add",
  hasLogin = "no",
  isRegister,
}: Props) {
  const { data: roles } = useRoles();

  return (
    <Container>
      <TitleContent title={title} isRegister={isRegister} />
      {isLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {!isLoading && (
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-6">
              <InputForm
                register={register}
                icon={<UserRound />}
                name="firstName"
                placeholder="First Name"
                label="First Name"
                errorMessage={errors.firstName?.message}
              />
            </div>
            <div className="col-span-6">
              <InputForm
                register={register}
                icon={<UserRound size={22} />}
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
                errorMessage={errors.lastName?.message}
              />
            </div>
          </div>

          <div>
            <InputForm
              register={register}
              icon={<Mail size={22} />}
              name="email"
              placeholder="Email"
              label="Email"
              errorMessage={errors.email?.message}
            />
          </div>

          {hasPassword && (
            <div>
              <InputForm
                register={register}
                icon={<Lock size={22} />}
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
                errorMessage={errors.password?.message}
                isPassword={true}
              />
            </div>
          )}

          <div>
            <InputForm
              register={register}
              icon={<Calendar size={22} />}
              name="age"
              placeholder="Age"
              label="Age"
              type="number"
              options={{ valueAsNumber: true }}
              errorMessage={errors.age?.message}
            />
          </div>

          {active === "edit" && (
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Role</label>

              <select
                {...register("roleId", { valueAsNumber: true })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50"
              >
                {roles?.map((role: Role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button
            variant="default"
            disabled={isPending || (active === "edit" && !isDirty)}
            className="w-full"
          >
            {childrenButton}
          </Button>
        </form>
      )}

      {hasLogin === "yes" && (
        <Link
          to="/login"
          className="mt-2 mb-2 flex justify-center text-sm text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
        >
          Already have an account? Log in
        </Link>
      )}
    </Container>
  );
}
