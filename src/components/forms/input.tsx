import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { ReactNode } from "react";
import { Input } from "../ui/input";

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
    placeholder?: string;
    icon?: ReactNode;
    label: string;
    options?: RegisterOptions<T, Path<T>>;
    type?: "number" | "text";
};

export default function InputForm<T extends FieldValues>({
  register,
  name,
  placeholder,
    icon,
    options,
    label,
    type = "text",
}: Props<T>) {
  return (
    <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>

      <div className="relative">
        {icon && (
                  <div className="absolute left-2 top-1 text-gray-500">
            {icon}
          </div>
        )}

              <Input
              type={type}
          {...register(name, options)}
                  placeholder={placeholder}
          className={`
            ${icon ? "pl-9 pr-3" : "px-3"}
          `}
        />
      </div>

    </div>
  );
}