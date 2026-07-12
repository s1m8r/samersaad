import { useDeleteProduct } from "@/API/product";
import ContainerDel from "@/components/layout/containerDel";
import ConfirmDeleteModal from "@/components/layout/delete";
import { toast } from "sonner";

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
        onSuccess: () => (
          setShowDel(false),
          toast.success("Deleted successfully")
        ),
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <ContainerDel>
      <ConfirmDeleteModal
        title="Delete Product"
        message="Are you sure you want to delete:"
        itemName={productName}
        isPending={isPending}
        onCancel={() => setShowDel(false)}
        onConfirm={del}
      />
    </ContainerDel>
  );
};

export default DeleteProduct;
