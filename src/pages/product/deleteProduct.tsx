import { useDeleteProduct } from "@/API/product";
import ConfirmDeleteModal from "@/components/layout/delete";

type Props = {
    productId: number;
    productName: string;
    setShowDel: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteProduct = ({ productId, productName, setShowDel }: Props) => {

    const { mutate, isPending } = useDeleteProduct();

    const del = () => {
        mutate(
            { id: productId },
            {
                onSuccess: () => setShowDel(false),
            }
        );
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
                <ConfirmDeleteModal
                    title="Delete Product"
                    message="Are you sure you want to delete:"
                    itemName={productName}
                    isPending={isPending}
                    onCancel={() => setShowDel(false)}
                    onConfirm={del}
                />
            </div>
        </div>
    );
};

export default DeleteProduct;