import { roleScema } from "@/schemas/role";
import z from "zod";
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { usePermissions } from "@/API/permissions";
import ErrorMessage from "@/components/forms/errors";
import { Spinner } from "@/components/ui/spinner";
import ButtonPending from "@/components/layout/buttonPending";
import InputForm from "@/components/forms/input";
import { SquarePen, UserKey } from "lucide-react";

type roleFormData = z.infer<typeof roleScema>;

interface Props {
  title: string;
  onsubmit: (data: roleFormData) => void;
  handleSubmit: UseFormHandleSubmit<roleFormData>;
  errors: FieldErrors<roleFormData>;
  register: UseFormRegister<roleFormData>;
  isPending?: boolean;
  isDirty?: boolean;
  chlidrenButton: string;
  typeForm?:"add" | "edit"
}

export default function Role({
  title,
  handleSubmit,
  onsubmit,
  errors,
  register,
  isPending,
  chlidrenButton,
  isDirty,
  typeForm ="add"
}: Props) {
  const { data: permissions, isLoading } = usePermissions();

  return (
    <div className="w-full max-w-2xl mx-auto">
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
                icon={<UserKey size={22} />}
                name="name" placeholder="Role name" label="Role name" ariaInvalid={!!errors.name?.message} />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-1">
               <InputForm register={register}
                icon={<SquarePen size={22} />}
                name="description" placeholder="Description" label="Description" ariaInvalid={!!errors.description?.message} />
              {errors.description && (
                <ErrorMessage>{errors.description.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Permissions
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {permissions?.map((per) => (
                  <label
                    key={per.id}
                    className="flex items-center gap-2 p-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={per.id}
                      {...register("permissionIds")}
                      className="accent-black dark:accent-white"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {per.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <ButtonPending variant="primary" disabled={isPending || (typeForm==="edit" && !isDirty)} isPending={isPending} children={chlidrenButton} />
          </form>
        )}
      </div>
    </div>
  );
}