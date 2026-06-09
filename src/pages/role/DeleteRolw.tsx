
import { useDeleteRole } from "@/API/role";
import ConfirmDeleteModal from "@/components/layout/delete";

type Props = {
    roleId: number;
    roleName:string ;
    setShowDel: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteRole = ({ roleId , roleName, setShowDel }: Props) => {
    const { mutate, isPending } = useDeleteRole();

    const del = () => {
        mutate(
            { id: roleId },
            {
                onSuccess: () => setShowDel(false),
            }
        );
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
                <ConfirmDeleteModal
                    title="Delete Role"
                    message="Are you sure you want to delete:"
                    itemName={roleName}
                    isPending={isPending}
                    onCancel={() => setShowDel(false)}
                    onConfirm={del}
                />
            </div>
        </div>
    );
};

export default DeleteRole;