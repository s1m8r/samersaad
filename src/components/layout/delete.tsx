import { Spinner } from "@/components/ui/spinner";
import Button from "./button";

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
        <h1 className="mb-4 text-xl font-bold text-gray-800">{title}</h1>

        <p className="mb-4 text-gray-600">
          {message} {itemName && <b className="text-gray-900">{itemName}</b>}
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="outline" width="w-fit" onClick={onCancel}>
            Cancel
          </Button>

          <Button
            variant="delete"
            onClick={onConfirm}
            disabled={isPending}
            width="w-fit"
            isPending={isPending}
          >
            {isPending ? <Spinner data-icon="inline-start" /> : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
