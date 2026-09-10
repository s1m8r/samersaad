import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { InputGroupAddon } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
interface items {
  id: number;
  name: string;
}
interface Props {
  data: items[];
  setValue?: UseFormSetValue<items>;
  setSelect: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
}
export default function ComboboxItems({
  data,
  setValue,
  setSelect,
  setSearch,
}: Props) {
  const [valueInput, setInputValue] = useState("");
  return (
    <>
      <span className="text-sm font-medium text-muted-foreground md:min-w-[100px]">
        Select Store
      </span>
      <Combobox
        items={data}
        onValueChange={(value) => {
          const selected = data?.find((item) => item.id === Number(value));
          if (selected) {
            setSelect(selected.name);
            setInputValue(selected.name);
            setValue?.("id", Number(value));
          }
        }}
      >
        <div className="flex items-center gap-2">
          <ComboboxInput
            placeholder="Select a store"
            value={valueInput}
            onChange={(e) => {
              setInputValue(e.target.value);
              setSearch(e.target.value);
              setSelect("");
              setValue?.("id", 0);
            }}
          >
            <InputGroupAddon align="inline-start">
              <SearchIcon />
            </InputGroupAddon>
          </ComboboxInput>
        </div>
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
    </>
  );
}
