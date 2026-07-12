import { useDeleteUser } from "@/API/user";
import ConfirmDeleteModal from "@/components/layout/delete";

type Props = {
  userId: number;
  userName: string;
  setShowDel: React.Dispatch<React.SetStateAction<boolean>>;
};
import { toast } from "sonner";
const DeleteUser = ({ userId, userName, setShowDel }: Props) => {
  const { mutate, isPending } = useDeleteUser();
  const del = () => {
    mutate(
      { id: userId },
      {
        onSuccess: () => {
          setShowDel(false);
          toast.success(`${userName} has been deleted successfully`);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <ConfirmDeleteModal
      title="Delete User"
      message="Are you sure you want to delete:"
      itemName={userName}
      isPending={isPending}
      onCancel={() => setShowDel(false)}
      onConfirm={del}
    />
  );
};

export default DeleteUser;
