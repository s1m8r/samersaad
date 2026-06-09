import { ProdectScema } from "@/schemas/product";
import z from "zod";

import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/forms/errors";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type productFormData = z.infer<typeof ProdectScema>;

interface Props {
  title: string;
  chlidtenButton: string;
  onsubmit: (data: productFormData) => void;
  handleSubmit: UseFormHandleSubmit<productFormData>;
  errors: FieldErrors<productFormData>;
  register: UseFormRegister<productFormData>;
  isPending?: boolean;
  isLoading?: boolean;
}

export default function Product({
  title,
  chlidtenButton,
  onsubmit,
  handleSubmit,
  errors,
  register,
  isPending,
  isLoading,
}: Props) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-5 shadow-sm">

        <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>

        {isLoading && (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        )}

        {!isLoading && (
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="space-y-4"
          >

            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Store Name
              </label>
              <Input
                placeholder="storeName"
                {...register("storeName")}
                aria-invalid={!!errors.storeName}
                disabled
                className="bg-gray-50 dark:bg-gray-800"
              />
              {errors.storeName && (
                <ErrorMessage>{errors.storeName.message}</ErrorMessage>
              )}
            </div>


            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Name Product
              </label>
              <Input
                placeholder="Product name"
                {...register("nameProdect")}
                aria-invalid={!!errors.nameProdect}
              />
              {errors.nameProdect && (
                <ErrorMessage>{errors.nameProdect.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Description
              </label>
              <Input
                placeholder="Description"
                {...register("description")}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <ErrorMessage>{errors.description.message}</ErrorMessage>
              )}
            </div>

                      


            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Price
              </label>
              <Input
                type="number"
                placeholder="Price"
                {...register("price", { valueAsNumber: true })}
                aria-invalid={!!errors.price}
              />
              {errors.price && (
                <ErrorMessage>{errors.price.message}</ErrorMessage>
              )}
            </div>

  
                
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Type
              </label>
              <Input
                placeholder="Type"
                {...register("type")}
                aria-invalid={!!errors.type}
              />
              {errors.type && (
                <ErrorMessage>{errors.type.message}</ErrorMessage>
              )}
            </div>

       
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Image
              </label>
              <Input
                placeholder="Image URL"
                {...register("image")}
                aria-invalid={!!errors.image}
              />
              {errors.image && (
                <ErrorMessage>{errors.image.message}</ErrorMessage>
              )}
            </div>

       
            <Button className="w-full mt-2" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  {chlidtenButton}
                </div>
              ) : (
                chlidtenButton
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}