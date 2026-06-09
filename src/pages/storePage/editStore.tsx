import { useGetStore, useUpdateStore } from "@/API/store";
import Store from "@/features/storePage/store";
import { Route } from "@/routes/store/edit/$id";
import { storeScema } from "@/schemas/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const EditStore = () => {
    const { id } = Route.useParams();
    const { mutate, isPending } = useUpdateStore()
    const { data:getStore, isLoading } = useGetStore(id)
    type storeFormData = z.infer<typeof storeScema>
    const {register ,control,setValue,handleSubmit,formState:{errors},reset } = useForm({
        resolver:zodResolver(storeScema)
    })
    const onsubmit = (data: storeFormData) => {
        const formatData = {
            ...data,
        }
        mutate({
            id: id,
            data: formatData
        })
    } 
    useEffect(() => {
        if (getStore) reset(getStore)
 },[getStore,reset] )
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
            isLoading={isLoading}
        />
    </div> );
}
export default EditStore;