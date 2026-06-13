import ErrorMessage from "@/components/forms/errors";
import ButtonPending from "@/components/layout/buttonPending";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { storeScema } from "@/schemas/store";
import { useState } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  Control,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import z from "zod";

type storeFormData = z.infer<typeof storeScema>;

interface Props {
  title: string;
  chlidrenButton: string;
  control: Control<storeFormData>;
  setValue: UseFormSetValue<storeFormData>;
  onsubmit: (data: storeFormData) => void;
  handleSubmit: UseFormHandleSubmit<storeFormData>;
  errors: FieldErrors<storeFormData>;
  register: UseFormRegister<storeFormData>;
  isPending?: boolean;
  isLoading?: boolean;
  isDirty?: boolean;
}

export default function Store({
  title,
  control,
  setValue,
  chlidrenButton,
  onsubmit,
  handleSubmit,
  errors,
  register,
  isPending,
  isLoading,
  isDirty
}: Props) {
  const [valueInput, setValueInput] = useState("");

  const categories = useWatch({
    control,
    name: "categories",
    defaultValue: [],
  });

  const addCategory = () => {
    if (valueInput.trim()) {
      setValue("categories", [...categories, valueInput]);
      setValueInput("");
    }
  };

  const removeCateory = (index: number) => {
    setValue(
      "categories",
      categories.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm p-5">

        <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
          {title}
        </h1>

        {isLoading && (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">

            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Basic Information
              </p>

              <div className="space-y-3">
                <Input placeholder="Name" {...register("name")} />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

                <Input placeholder="Email" {...register("email")} />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                <Input placeholder="Phone" {...register("phone")} />
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

                <Input placeholder="Website" {...register("website")} />
                {errors.website && <ErrorMessage>{errors.website.message}</ErrorMessage>}

                <Input placeholder="Image" {...register("image")} />
                {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Categories
              </p>

              <div className="flex gap-2">
                <Input
                  placeholder="Add category"
                  value={valueInput}
                  onChange={(e) => setValueInput(e.target.value)}
                />
                <Button type="button" onClick={addCategory}>
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((c, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {c} <span className=" text-red-900 font-bold cursor-pointer" onClick={() => removeCateory(index)}> X </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Address
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input placeholder="Country" {...register("address.country")} />
                <Input placeholder="City" {...register("address.city")} />
                <Input placeholder="State" {...register("address.state")} />
                <Input placeholder="Street" {...register("address.street")} />
                <Input placeholder="Zip Code" {...register("address.zipCode")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input placeholder="Owner" {...register("owner")} />
              <Input
                placeholder="Employees"
                type="number"
                {...register("employees", { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Opening Hours
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input placeholder="Sunday" {...register("openingHours.sunday")} />
                <Input placeholder="Monday" {...register("openingHours.monday")} />
                <Input placeholder="Tuesday" {...register("openingHours.tuesday")} />
                <Input placeholder="Wednesday" {...register("openingHours.wednesday")} />
                <Input placeholder="Thursday" {...register("openingHours.thursday")} />
                <Input placeholder="Friday" {...register("openingHours.friday")} />
                <Input placeholder="Saturday" {...register("openingHours.saturday")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Rating"
                type="number"
                {...register("rating", { valueAsNumber: true })}
              />
              <Input
                placeholder="Reviews"
                type="number"
                {...register("reviews", { valueAsNumber: true })}
              />
            </div>
            <ButtonPending variant="primary" disabled={isPending || !isDirty} children={chlidrenButton} isPending={isPending} />
          </form>
        )}
      </div>
    </div>
  );
}