import { useDeleteStore } from "@/API/store";
import ConfirmDeleteModal from "@/components/layout/delete";
import { toast } from "sonner";

type Props = {
  storeId: number;
  storeName: string;
  setShowDel: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteStore = ({ storeId, storeName, setShowDel }: Props) => {
  const { mutate, isPending } = useDeleteStore();
  const del = () => {
    mutate(
      { id: storeId },
      {
        onSuccess: () => (
          setShowDel(false),
          toast.success("Deleted successfully")
        ),
        onError: (err) => {
          toast.error(err?.message);
        },
      },
    );
  };

  return (
    <ConfirmDeleteModal
      title="Delete Store"
      message="Are you sure you want to delete:"
      itemName={storeName}
      isPending={isPending}
      onCancel={() => setShowDel(false)}
      onConfirm={del}
    />
  );
};

export default DeleteStore;
