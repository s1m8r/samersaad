import { Input } from "../ui/input";
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
   UseFormSetValue,
} from "react-hook-form";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { useState,Dispatch, SetStateAction} from "react";
import z from "zod";
import { roleScema } from "@/schemas/role";
import { storeScema } from "@/schemas/store";
import { ProdectScema } from "@/schemas/product";
import ButtonPending from "./buttonPending";

interface ids {
  id: number;
}
interface ComboboxItem  {
  id: number;
  name: string;
};

type roleType = z.infer<typeof roleScema>
type storeFormData = z.infer<typeof storeScema>
type productFormData = z.infer<typeof ProdectScema>
type Props = {
  handleSubmit?: UseFormHandleSubmit<ids>;
  setValue?: UseFormSetValue<ids>;
  onsubmit?: (data: ids) => void;
  errors?: FieldErrors<ids>;
  register?: UseFormRegister<ids>;
  children: React.ReactNode;
  onClick?: () => void;
  variant: "primary" | "add" | "delete"
  description?: string;
  title: string;
  hasAction?: "none" | "inputNumber" | "combobox";
  placeholder?: string;
  dataComboboxOne?: ComboboxItem[] | roleType[] | storeFormData[] | productFormData[]
  setSearch?: Dispatch<SetStateAction<string>>
};

export default function Card({
  handleSubmit,
  onsubmit,
  register,
  children,
  onClick,
  variant,
  description,
  title,
  hasAction = "none",
  placeholder,
  dataComboboxOne,
  setValue,
  setSearch,

}: Props) {
  const showForm = !!(handleSubmit && onsubmit && register);
  const [valueInput, setInputValue] = useState("")
  const data = dataComboboxOne;
  
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
        <ButtonPending onClick={onClick} disabled={false} variant={variant} children={children} />
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="space-y-3"
        >
          {hasAction === "inputNumber" &&<Input
            placeholder={placeholder ?? "Enter ID"}
            type="number"
            {...register("id", { valueAsNumber: true })}
          />}

          { hasAction === "combobox" &&
            <Combobox items={data}
              onValueChange={(value) => {
                const selected = data?.find((item) => item.id === Number(value))
                if (selected) {
                    setInputValue(selected.name)
                  setValue?.("id", Number(value))
                }
              }
            }
            >
              <ComboboxInput placeholder="Select a framework" value={valueInput}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setSearch?.(e.target.value)
                }
                
              }
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          }
          <ButtonPending variant={variant} disabled={false} children={children} />
        </form>
      )}
    </div>
  );
}