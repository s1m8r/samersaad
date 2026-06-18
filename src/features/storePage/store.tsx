import ErrorMessage from "@/components/forms/errors";
import InputForm from "@/components/forms/input";
import ButtonPending from "@/components/layout/buttonPending";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { storeScema } from "@/schemas/store";
import { Image, Mail, Network, Phone, Star, StoreIcon, UserRound, UsersRound } from "lucide-react";
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
  typeForm?: "add" | "edit"
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
  isDirty,
  typeForm="add",
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
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm p-5
      animate__animated animate__fadeIn
      animate-duration
      ">

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
                <InputForm register={register}
                  icon={<StoreIcon  size={22} />}
                  name="name" placeholder="Name Store" label="Name Store" ariaInvalid={!!errors.name?.message} />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

                  <InputForm register={register}
                  icon={<Mail  size={22} />}
                  name="email" placeholder="Email" label="Email" ariaInvalid={!!errors.email?.message} />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                  <InputForm register={register}
                  icon={<Phone  size={22} />}
                  name="phone" placeholder="Phone" label="Phone" ariaInvalid={!!errors.phone?.message} />
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
                <InputForm register={register}
                  icon={<Network size={22} />}
                  name="website" placeholder="Website" label="Website" ariaInvalid={!!errors.website?.message} />
                {errors.website && <ErrorMessage>{errors.website.message}</ErrorMessage>}

                <InputForm register={register}
                  icon={<Image size={22} />}
                  name="image" placeholder="Image" label="Image" ariaInvalid={!!errors.image?.message} />
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
    <InputForm
      register={register}
      name="address.country"
      placeholder="Country"
      label="Country"
      ariaInvalid={!!errors.address?.country}
    />

    <InputForm
      register={register}
      name="address.city"
      placeholder="City"
      label="City"
      ariaInvalid={!!errors.address?.city}
    />

    <InputForm
      register={register}
      name="address.state"
      placeholder="State"
      label="State"
      ariaInvalid={!!errors.address?.state}
    />

    <InputForm
      register={register}
      name="address.street"
      placeholder="Street"
      label="Street"
      ariaInvalid={!!errors.address?.street}
    />

    <InputForm
      register={register}
      name="address.zipCode"
      placeholder="Zip Code"
      label="Zip Code"
      ariaInvalid={!!errors.address?.zipCode}
    />
  </div>
</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputForm
                register={register}
                 icon={<UserRound size={22} />}
      name="owner"
      placeholder="Owner"
      label="Owner"
      ariaInvalid={!!errors.owner}
              />
               <InputForm register={register} 
                icon={<UsersRound size={22}  />}
                name="employees" placeholder="Employees" label="Employees" type="number"
                options={{ valueAsNumber: true }}
                ariaInvalid={!!errors.employees?.message}
                />
            </div>

            <div className="space-y-4">
  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
    Opening Hours
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    <InputForm
      register={register}
      name="openingHours.sunday"
      placeholder="Sunday"
      label="Sunday"
      ariaInvalid={!!errors.openingHours?.sunday}
    />

    <InputForm
      register={register}
      name="openingHours.monday"
      placeholder="Monday"
      label="Monday"
      ariaInvalid={!!errors.openingHours?.monday}
    />

    <InputForm
      register={register}
      name="openingHours.tuesday"
      placeholder="Tuesday"
      label="Tuesday"
      ariaInvalid={!!errors.openingHours?.tuesday}
    />

    <InputForm
      register={register}
      name="openingHours.wednesday"
      placeholder="Wednesday"
      label="Wednesday"
      ariaInvalid={!!errors.openingHours?.wednesday}
    />

    <InputForm
      register={register}
      name="openingHours.thursday"
      placeholder="Thursday"
      label="Thursday"
      ariaInvalid={!!errors.openingHours?.thursday}
    />

    <InputForm
      register={register}
      name="openingHours.friday"
      placeholder="Friday"
      label="Friday"
      ariaInvalid={!!errors.openingHours?.friday}
    />

    <InputForm
      register={register}
      name="openingHours.saturday"
      placeholder="Saturday"
      label="Saturday"
      ariaInvalid={!!errors.openingHours?.saturday}
    />
  </div>
</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputForm register={register} 
                icon={<Star size={22}  />}
                name="rating" placeholder="Rating" label="Rating" type="number"
                options={{ valueAsNumber: true }}
                ariaInvalid={!!errors.rating?.message}
                />
              <InputForm register={register} 
                icon={<UsersRound size={22}  />}
                name="reviews" placeholder="Reviews" label="Reviews" type="number"
                options={{ valueAsNumber: true }}
                ariaInvalid={!!errors.reviews?.message}
                />
            </div>
            <ButtonPending variant="primary" disabled={isPending ||(typeForm==="edit" && !isDirty)} children={chlidrenButton} isPending={isPending} />
          </form>
        )}
      </div>
    </div>
  );
}