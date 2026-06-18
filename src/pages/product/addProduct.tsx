import { useAddProduct } from "@/API/product";
import Product from "@/features/product/product";
import { Route } from "@/routes/_proteced/products/addproduct";
import { ProdectScema } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import z from "zod";
type productFormData = z.infer<typeof ProdectScema>
const AddProduct = () => {
    const navigate = useNavigate();
    const search = Route.useSearch();
    const { handleSubmit,formState:{errors},register ,setValue ,control} = useForm({
        resolver:zodResolver(ProdectScema)
    })
    const { mutate, isPending } = useAddProduct()
    const onsubmit = (data:productFormData) => {
        mutate(data,
             {onSuccess: () => {
                setTimeout(() => {
                    navigate({
                        to: search.from || "/",
                    });
                }, 200);
            },
            }
        )
    }
    return (<div>
        <Product
            title="Add Product"
            chlidtenButton="Add Product"
            onsubmit={onsubmit}
            handleSubmit={handleSubmit}
            errors={errors}
            register={register}
            isPending={isPending}
            setValue={setValue} 
            control={control}
        />
    </div> );
}
export default AddProduct;