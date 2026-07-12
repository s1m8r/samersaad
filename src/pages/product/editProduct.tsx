import { useGetProduct, useUpdateProduct } from "@/API/product";
import Product from "@/features/product/product";
import { Route } from "@/routes/(proteced)/products/edit/$id";
import { ProdectScema } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type productFormData = z.infer<typeof ProdectScema>;

const EditProduct = () => {
  const { id } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors, isDirty },
    register,
    reset,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(ProdectScema),
  });
  const { mutate, isPending } = useUpdateProduct();
  const { data: getStore, isLoading } = useGetProduct(id);

  useEffect(() => {
    reset(getStore);
  }, [reset, getStore]);

  const onsubmit = (data: productFormData) => {
    mutate(
      { id, data },
      {
        onSuccess: () => {
          setTimeout(() => {
            navigate({
              to: search.from || "/",
            });
            toast.success(`Product ${data.name} updated successfully`);
          }, 300);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };
  return (
    <>
      {getStore?.storeName && (
        <Product
          title="Edit Product"
          chlidtenButton="Save Changes"
          onsubmit={onsubmit}
          handleSubmit={handleSubmit}
          errors={errors}
          register={register}
          isPending={isPending}
          isLoading={isLoading}
          setValue={setValue}
          control={control}
          defaultStoreName={getStore?.storeName}
          isDirty={isDirty}
          typeForm="edit"
        />
      )}
    </>
  );
};

export default EditProduct;
