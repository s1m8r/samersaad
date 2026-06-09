
import { useDeleteUser } from "@/API/user";
import ConfirmDeleteModal from "@/components/layout/delete";



type Props = {
    userId: number;
    userName:string ;
    setShowDel: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteUser = ({ userId , userName, setShowDel }: Props) => {
    const { mutate, isPending } = useDeleteUser();

    const del = () => {
        mutate(
            { id: userId },
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
                    itemName={userName}
                    isPending={isPending}
                    onCancel={() => setShowDel(false)}
                    onConfirm={del}
                />
            </div>
        </div>
    );
};

export default DeleteUser;