import { useAddProduct } from "@/API/product";
import { useGetStore } from "@/API/store";
import Product from "@/features/product/product";
import { Route } from "@/routes/product/addproduct/$id";
import { ProdectScema } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
type productFormData = z.infer<typeof ProdectScema>
const AddProduct = () => {
    const { id } = Route.useParams();
    const { handleSubmit,formState:{errors},register,reset } = useForm({
        resolver:zodResolver(ProdectScema)
    })
    const { mutate, isPending } = useAddProduct()
    
    const onsubmit = (data:productFormData) => {
        mutate(data)
    }
    const { data:getStore ,isLoading} = useGetStore(id)
    useEffect(() => {
        reset({
            storeId: Number(id),
            storeName: getStore?.name,
        })
    }, [reset, getStore, id])
    return (<div>
        <Product
            title="Add Product"
            chlidtenButton="Add Product"
            onsubmit={onsubmit}
            handleSubmit={handleSubmit}
            errors={errors}
            register={register}
            isPending={isPending}
            isLoading={isLoading}
        />
    </div> );
}
export default AddProduct;