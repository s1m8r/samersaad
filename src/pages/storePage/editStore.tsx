import { useGetStore, useUpdateStore } from "@/API/store";
import Store from "@/features/storePage/store";
import { Route } from "@/routes/_proteced/stores/edit/$id";
import { storeScema } from "@/schemas/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const EditStore = () => {
    const { id } = Route.useParams();
    const navigate = useNavigate()
    const search =Route.useSearch()
    const { mutate, isPending } = useUpdateStore()
    const { data:getStore, isLoading } = useGetStore(id)
    type storeFormData = z.infer<typeof storeScema>
    const {register ,control,setValue,handleSubmit,formState:{errors,isDirty},reset } = useForm({
        resolver:zodResolver(storeScema)
    })
    const onsubmit = (data: storeFormData) => {
        const formatData = {
            ...data,
        }
        mutate({
            id: id,
            data: formatData,
        },
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
    useEffect(() => {
        if (getStore) reset(getStore)
 },[getStore,reset] )
    return (<div>
        <Store title="Edit Store"
            chlidrenButton="Edit"
            onsubmit={onsubmit}
            register={register}
            control={control}
            setValue={setValue}
            handleSubmit={handleSubmit}
            errors={errors}
            isPending={isPending}
            isLoading={isLoading}
            isDirty={isDirty}
            typeForm="edit"
        />
    </div> );
}
export default EditStore;