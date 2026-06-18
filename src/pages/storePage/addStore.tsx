import { useAddStores } from "@/API/store";
import Store from "@/features/storePage/store";
import { Route } from "@/routes/_proteced/stores/addstore";
import { storeScema } from "@/schemas/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import z from "zod";

const AddStore = () => {
    const navigate = useNavigate();
    const search=Route.useSearch()
    const {mutate ,isPending} =useAddStores()
    type storeFormData = z.infer<typeof storeScema>
    const {register ,control,setValue,handleSubmit,formState:{errors} } = useForm({
        resolver:zodResolver(storeScema)
    })
    const onsubmit = (data: storeFormData) => {
        const formatData = {
            ...data,
            isActive: true
        }
        mutate(formatData,
            {
                onSuccess: () => {
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
        <Store title="Add Store"
            chlidrenButton="Add Store"
            onsubmit={onsubmit}
            register={register}
            control={control}
            setValue={setValue}
            handleSubmit={handleSubmit}
            errors={errors}
            isPending={isPending}
        />
    </div> );
}
 
export default AddStore;