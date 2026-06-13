import { ProdectScema } from "@/schemas/product";
import z from "zod";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { useState } from "react";
import {
  Controller,
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/forms/errors";
import { Spinner } from "@/components/ui/spinner";
import { useGetStoresSearch } from "@/API/store";
// import Button from "@/components/layout/button";
import ButtonPending from "@/components/layout/buttonPending";

type productFormData = z.infer<typeof ProdectScema>;

interface Props {
  title: string;
  chlidtenButton: string;
  onsubmit: (data: productFormData) => void;
  handleSubmit: UseFormHandleSubmit<productFormData>;
  errors: FieldErrors<productFormData>;
  register: UseFormRegister<productFormData>;
  setValue: UseFormSetValue<productFormData>;
  control: Control<productFormData>; 
  defaultStoreName?: string 
  isPending?: boolean;
  isLoading?: boolean;
  isDirty?: boolean;
}

export default function Product({
  title,
  chlidtenButton,
  onsubmit,
  handleSubmit,
  errors,
  register,
  setValue,
  control,
  defaultStoreName = "",
  isPending,
  isLoading,
  isDirty
}: Props) {
  const [search, Setsearch] = useState("");
  const [inputValue, setInputValue] = useState(defaultStoreName);

  const { data } = useGetStoresSearch(search);

  const nameStore = data?.data ?? [];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-5 shadow-sm">

        <h1 className="text-lg font-semibold mb-4">{title}</h1>

        {isLoading && (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">

            <div className="space-y-1">
              <label className="text-sm">Store Name</label>

              <Controller
                control={control}
                name="storeId"
                render={({ field }) => (
                  <Combobox
                    items={nameStore}
                    onValueChange={(value) => {
                      const selected = nameStore.find(
                        (item) => item.id === Number(value)
                      );

                      if (selected) {
                        setInputValue(selected.name);
                        field.onChange(Number(value));
                        setValue("storeName", selected.name);
                      }
                    }}
                  >
                    <ComboboxInput
                      placeholder="Select store"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        Setsearch(e.target.value);
                      }}
                    />

                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>

                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item.id} value={item.id}>
                            {item.name}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                )}
              />

              {errors.storeName && (
                <ErrorMessage>{errors.storeName.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-1">
              <label>Name Product</label>
              <Input {...register("name")} />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-1">
              <label>Description</label>
              <Input {...register("description")} />
              {errors.description && (
                <ErrorMessage>{errors.description.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-1">
              <label>Price</label>
              <Input type="number" {...register("price", { valueAsNumber: true })} />
              {errors.price && (
                <ErrorMessage>{errors.price.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-1">
              <label>Type</label>
              <Input {...register("type")} />
              {errors.type && (
                <ErrorMessage>{errors.type.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-1">
              <label>Image</label>
              <Input {...register("image")} />
              {errors.image && (
                <ErrorMessage>{errors.image.message}</ErrorMessage>
              )}
            </div>
            <ButtonPending variant="primary" disabled={isPending || !isDirty}
              children={chlidtenButton}
              isPending={isPending}
            />
            
          </form>
        )}
      </div>
    </div>
  );
}