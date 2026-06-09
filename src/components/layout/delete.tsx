import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
    title: string;
    message: string;
    itemName?: string;
    onCancel: () => void;
    onConfirm: () => void;
    isPending?: boolean;
};

export default function ConfirmDeleteModal({
    title,
    message,
    itemName,
    onCancel,
    onConfirm,
    isPending,
}: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h1 className="mb-4 text-xl font-bold text-gray-800">
                    {title}
                </h1>

                <p className="mb-4 text-gray-600">
                    {message}{" "}
                    {itemName && (
                        <b className="text-gray-900">
                            {itemName}
                        </b>
                    )}
                </p>

                <div className="flex justify-end gap-2">

                    <Button
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={onConfirm}
                        disabled={isPending}
                        className="bg-red-600"
                    >
                        {isPending ? (
                            <Spinner data-icon="inline-start" />
                        ) : (
                            "Delete"
                        )}
                    </Button>

                </div>
            </div>
        </div>
    );
}