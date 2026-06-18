import { z } from "zod";
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { registerSchema } from "@/schemas/user";
import ErrorMessage from "@/components/forms/errors";
import { Spinner } from "@/components/ui/spinner";

import { useRoles } from "@/API/role";
import ButtonPending from "@/components/layout/buttonPending";
import InputForm from "@/components/forms/input";
import { Calendar, Lock, Mail, UserRound } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
  isDirty?: boolean;
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
  chlidrenButton,
  hasPassword = true,
  isLoading,
  isDirty,
  active = "add",
  hasLogin ="no"
}: Props) {
  const { data: roles } = useRoles();

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm p-5
      animate__animated animate__fadeIn
      animate-duration
      ">

        <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>

        {isLoading && (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">

            <div className="space-y-1">
              <InputForm register={register}
                icon={<UserRound size={22} />}
                name="firstName" placeholder="First Name" label="First Name" ariaInvalid={!!errors.firstName?.message} />
              {errors.firstName && (<>
                <ErrorMessage>{errors.firstName.message}</ErrorMessage>
             </> )}
            </div>

            <div className="space-y-1">
                          <InputForm register={register} 
                icon={<UserRound size={22} />}
                name="lastName" placeholder="Last Name" label="Last Name" ariaInvalid={!!errors.lastName?.message} />
              {errors.lastName && (
                <ErrorMessage>{errors.lastName.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-1">
              <InputForm register={register} 
                icon={<Mail size={22} />}
                name="email" placeholder="Email" label="Email" ariaInvalid={!!errors.email?.message} />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            {hasPassword && (
              <div className="space-y-1">
                <InputForm register={register} 
                icon={<Lock size={22} />}
                name="password" placeholder="Password" label="Password" type="password" ariaInvalid={!!errors.password?.message} />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
              </div>
            )}

            <div className="space-y-1">
              <InputForm register={register} 
                icon={<Calendar size={22} />}
                name="age" placeholder="Age" label="Age" type="number"
                options={{ valueAsNumber: true }}
                ariaInvalid={!!errors.age?.message}
                />
              {errors.age && (
                <ErrorMessage>{errors.age.message}</ErrorMessage>
              )}
            </div>

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

            <ButtonPending variant="primary" disabled={isPending || (active==="edit" && !isDirty)} children={chlidrenButton} isPending={isPending} />
          </form>
          
        )
        }
        
        {hasLogin==="yes" && <Link
          to="/login"
          className="text-sm text-gray-500 hover:text-black transition underline underline-offset-4 flex justify-center mb-2 mt-2"
        >
          I have account go to login
        </Link>}
      </div>
    </div>
  );
}