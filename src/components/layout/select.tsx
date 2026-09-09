import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface types {
  value: string;
  label: string;
}

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  errorMessage?: string;
  items: types[];
  label?: string;
  placeholder?: string;
}

export default function Selected<T extends FieldValues>({
  control,
  name,
  errorMessage,
  items,
  label = "Type",
  placeholder = "Select type",
}: Props<T>) {
  return (
    <Field data-invalid={!!errorMessage} className="w-full">
      <FieldLabel>{label}</FieldLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            value={field.value ?? ""}
            onValueChange={(value) => {
              const selected = items?.find((item) => item.value === value);
              if (selected) field.onChange(value);
            }}
          >
            <SelectTrigger aria-invalid={!!errorMessage}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </Field>
  );
}
