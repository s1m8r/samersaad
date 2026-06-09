import { useGetProduct, useUpdateProduct } from "@/API/product";
import Product from "@/features/product/product";
import { Route } from "@/routes/product/edit/$id";
import { ProdectScema } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
type productFormData = z.infer<typeof ProdectScema>
const EditProduct = () => {
    const { id } = Route.useParams();
    const { handleSubmit,formState:{errors},register,reset } = useForm({
        resolver:zodResolver(ProdectScema)
    })
    const { mutate, isPending } = useUpdateProduct()
    
    const onsubmit = (data:productFormData) => {
        mutate({
            id: id,
            data:data,
     })
    }
    const { data:getStore ,isLoading} = useGetProduct(id)
    useEffect(() => {
        reset(getStore)
    }, [reset, getStore])
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
export default EditProduct;