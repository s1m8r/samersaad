
import { useDeleteStore } from "@/API/store";
import ConfirmDeleteModal from "@/components/layout/delete";

type Props = {
    storeId: number;
    storeName: string;
    setShowDel: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteStore = ({ storeId, storeName, setShowDel }: Props) => {
    console.log(storeId);
    console.log(storeName);

    const { mutate, isPending } = useDeleteStore();

    const del = () => {
        mutate(
            { id: storeId },
            {
                onSuccess: () => setShowDel(false),
            }
        );
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
                <ConfirmDeleteModal
                    title="Delete Store"
                    message="Are you sure you want to delete:"
                    itemName={storeName}
                    isPending={isPending}
                    onCancel={() => setShowDel(false)}
                    onConfirm={del}
                />
            </div>
        </div>
    );
};

export default DeleteStore;