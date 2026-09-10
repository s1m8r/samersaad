import { UseFormRegister, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  label: string;
  options?: RegisterOptions<T, Path<T>>;
  errorMessage?: null | string;
};

export default function TextareaForm<T extends FieldValues>({
  register,
  name,
  placeholder,
  label,
  options,
  errorMessage = null,
}: Props<T>) {
  return (
    <div className="space-y-1">
      <Field className="w-full" data-invalid={!!errorMessage}>
        <FieldLabel htmlFor={name}>{label}</FieldLabel>
        <Textarea
          id={name}
          {...register(name, options)}
          placeholder={placeholder}
          aria-invalid={!!errorMessage}
        />
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </Field>
    </div>
  );
}
