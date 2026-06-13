import { useAddProduct } from "@/API/product";
import Product from "@/features/product/product";
import { ProdectScema } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import z from "zod";
type productFormData = z.infer<typeof ProdectScema>
type HistoryState = {
  from?: string;
};
const AddProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleSubmit,formState:{errors},register ,setValue ,control} = useForm({
        resolver:zodResolver(ProdectScema)
    })
    const { mutate, isPending } = useAddProduct()
    const from = (location.state as HistoryState)?.from || "/";
    const onsubmit = (data:productFormData) => {
        mutate(data)
         navigate({
    to: from,
  });
        
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