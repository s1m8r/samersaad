import { z } from "zod";
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { registerSchema } from "@/schemas/user";
import ErrorMessage from "@/components/forms/errors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useRoles } from "@/API/role";

type registerFormData = z.infer<typeof registerSchema>;

type Role = {
  id: number;
  name: string;
};

type Props = {
  title?: string;
  handleSubmit: UseFormHandleSubmit<registerFormData>;
  onsubmit: (data: registerFormData) => void;
  errors: FieldErrors<registerFormData>;
  register: UseFormRegister<registerFormData>;
  isPending?: boolean;
  chlidrenButton: string;
  hasPassword?: boolean;
  isLoading?: boolean;
  active?: "add" | "edit";
};

export default function RegisterForm({
  title,
  handleSubmit,
  onsubmit,
  errors,
  register,
  isPending,
  chlidrenButton,
  hasPassword = true,
  isLoading,
  active = "add",
}: Props) {
  const { data: roles } = useRoles();

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm p-5">

        {/* TITLE */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>

        {/* LOADING */}
        {isLoading && (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        )}

        {/* FORM */}
        {!isLoading && (
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">

            {/* FIRST NAME */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                First Name
              </label>
              <Input
                placeholder="First Name"
                {...register("firstName")}
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <ErrorMessage>{errors.firstName.message}</ErrorMessage>
              )}
            </div>

            {/* LAST NAME */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Last Name
              </label>
              <Input
                placeholder="Last Name"
                {...register("lastName")}
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <ErrorMessage>{errors.lastName.message}</ErrorMessage>
              )}
            </div>

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
            {hasPassword && (
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
            )}

            {/* AGE */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Age
              </label>
              <Input
                type="number"
                placeholder="Age"
                {...register("age", { valueAsNumber: true })}
                aria-invalid={!!errors.age}
              />
              {errors.age && (
                <ErrorMessage>{errors.age.message}</ErrorMessage>
              )}
            </div>

            {/* ROLE (EDIT ONLY) */}
            {active === "edit" && (
              <div className="space-y-1">
                <label className="text-sm text-gray-600 dark:text-gray-300">
                  Role
                </label>

                <select
                  {...register("roleId", { valueAsNumber: true })}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
                >
                  {roles?.map((role: Role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* BUTTON */}
            <Button className="w-full" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  {chlidrenButton}
                </div>
              ) : (
                chlidrenButton
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}