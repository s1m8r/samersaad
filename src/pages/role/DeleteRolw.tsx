import { useDeleteRole } from "@/API/role";
import ConfirmDeleteModal from "@/components/layout/delete";
import { toast } from "sonner";

type Props = {
  roleId: number;
  roleName: string;
  setShowDel: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteRole = ({ roleId, roleName, setShowDel }: Props) => {
  const { mutate, isPending } = useDeleteRole();

  const del = () => {
    mutate(
      {
        id: roleId,
      },
      {
        onSuccess: () => (
          setShowDel(false),
          toast.success(`${roleName} updated successfully`)
        ),
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <ConfirmDeleteModal
      title="Delete Role"
      message="Are you sure you want to delete:"
      itemName={roleName}
      isPending={isPending}
      onCancel={() => setShowDel(false)}
      onConfirm={del}
    />
  );
};

export default DeleteRole;
