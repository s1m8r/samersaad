import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useState } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  icon?: React.ReactNode;
  label: string;
  options?: RegisterOptions<T, Path<T>>;
  type?: "number" | "text" | "password";
  errorMessage?: null | string;
  isPassword?: boolean;
};

export default function InputForm<T extends FieldValues>({
  register,
  name,
  placeholder,
  icon,
  label,
  options,
  type = "text",
  isPassword,
  errorMessage = null,
}: Props<T>) {
  const [typeshow, setTypeShow] = useState(type);
  const showPassword = () => {
    if (typeshow === "password") {
      setTypeShow("text");
    } else {
      setTypeShow("password");
    }
  };
  return (
    <div className="space-y-1">
      <Field className="w-full" data-invalid={!!errorMessage}>
        <FieldLabel htmlFor={name}>{label}</FieldLabel>
        <InputGroup>
          <InputGroupInput
            type={typeshow}
            {...register(name, options)}
            placeholder={placeholder}
            aria-invalid={!!errorMessage}
            id={name}
            step="any"
          />
          {isPassword && (
            <InputGroupAddon
              align="inline-end"
              className="cursor-pointer"
              onClick={showPassword}
            >
              {typeshow === "password" && <EyeOffIcon />}
              {typeshow === "text" && <EyeIcon />}
            </InputGroupAddon>
          )}
          <InputGroupAddon align="inline-start">{icon}</InputGroupAddon>
        </InputGroup>
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </Field>
    </div>
  );
}
