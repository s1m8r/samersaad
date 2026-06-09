import { Input } from "../ui/input";
import Button from "./button";
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface ids {
  id: number;
}

type Props = {
  handleSubmit?: UseFormHandleSubmit<ids>;
  onsubmit?: (data: ids) => void;
  errors?: FieldErrors<ids>;
  register?: UseFormRegister<ids>;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "add" | "delete";
  disabled?: boolean;
  description?: string;
  title: string;
  hasAction?: "none" | "inputNumber" | "combobox";
  placeholder?: string;
};

export default function Card({
  handleSubmit,
  onsubmit,
  register,
  children,
  onClick,
  variant,
  disabled,
  description,
  title,
  hasAction = "none",
  placeholder,
}: Props) {
  const showForm = !!(handleSubmit && onsubmit && register);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>

        {description && (
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>

      {hasAction === "none" && (
        <Button
          onClick={onClick}
          disabled={disabled}
          variant={variant}
        >
          {children}
        </Button>
      )}

      {hasAction === "inputNumber" && showForm && (
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="space-y-3"
        >
          <Input
            placeholder={placeholder ?? "Enter ID"}
            type="number"
            {...register("id", { valueAsNumber: true })}
          />

          <Button
            disabled={disabled}
            variant={variant}
          >
            {children}
          </Button>
        </form>
      )}
    </div>
  );
}