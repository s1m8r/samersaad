import { ProductScema } from "@/schemas/product";
import z from "zod";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
import { useGetStores } from "@/API/store";
import InputForm from "@/components/forms/input";
import TextareaForm from "@/components/forms/textarea";
import {
  Archive,
  CircleDollarSign,
  Image as ImageIcon,
  Package,
  PlusIcon,
  Star,
  Trash2,
} from "lucide-react";
import TitleContent from "@/components/layout/titleContent";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useGetTypes } from "@/API/types";
import Selected from "@/components/layout/select";
import { Input } from "@/components/ui/input";
import { useGetColors } from "@/API/colors";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductFormData = z.infer<typeof ProductScema>;

interface Props {
  title: string;
  childrenButton: string;
  onsubmit: (data: ProductFormData) => void;
  handleSubmit: UseFormHandleSubmit<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  register: UseFormRegister<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  control: Control<ProductFormData>;
  defaultStoreName?: string;
  isPending?: boolean;
  isLoading?: boolean;
  isDirty?: boolean;
  typeForm?: "add" | "edit";
}

export default function Product({
  title,
  childrenButton,
  onsubmit,
  handleSubmit,
  errors,
  register,
  setValue,
  control,
  defaultStoreName = "",
  isPending = false,
  isLoading = false,
  isDirty = false,
  typeForm = "add",
}: Props) {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState(defaultStoreName);

  const { data } = useGetStores("rating", "desc", 1, search);

  const stores = data?.data ?? [];

  const { data: types } = useGetTypes();

  const items =
    types?.data.map((item) => ({
      label: item.name,
      value: item.value,
    })) ?? [];

  const images = useWatch({
    control,
    name: "images",
    defaultValue: [],
  });
  const [valuePath, setValuePath] = useState("");
  const [errPath, setErrPath] = useState(false);
  const addImage = () => {
    if (!valuePath) {
      setErrPath(true);
      return;
    }
    setValue("images", [...images, valuePath], {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    setValuePath("");
  };
  const removeImage = (index: number) => {
    setValue(
      "images",
      images.filter((_, i) => i !== index),
      {
        shouldDirty: true,
      },
    );
  };

  const productColors = useWatch({
    control,
    name: "colors",
    defaultValue: [],
  });
  const [selectedColor, setSelectedColor] = useState("");
  const [errColor, setErrColor] = useState(false);
  const addColor = () => {
    if (!selectedColor) {
      setErrColor(true);
      return;
    }
    setValue("colors", [...productColors, selectedColor], {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    setSelectedColor("");
  };
  const removeColor = (index: number) => {
    setValue(
      "colors",
      productColors.filter((_, i) => i !== index),
      {
        shouldDirty: true,
      },
    );
  };
  const { data: colors } = useGetColors();
  const colorShow = colors?.data.filter(
    (i) => !productColors.includes(i.color),
  );

  return (
    <Container>
      <TitleContent title={title} />

      {isLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {!isLoading && (
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          <Field data-invalid={!!errors?.storeId?.message} className="w-full">
            <FieldLabel>Store Name</FieldLabel>
            <Controller
              control={control}
              name="storeId"
              render={({ field }) => (
                <Combobox
                  items={stores}
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(value) => {
                    const selectedStore = stores.find(
                      (item) => item.id === Number(value),
                    );
                    if (!selectedStore) return;
                    field.onChange(selectedStore.id);
                    setInputValue(selectedStore.name);
                    setValue("storeName", selectedStore.name, {
                      shouldDirty: true,
                    });
                  }}
                >
                  <ComboboxInput
                    aria-invalid={!!errors.storeId}
                    placeholder="Select store"
                    value={inputValue}
                    onChange={(event) => {
                      const value = event.target.value;

                      setInputValue(value);
                      setSearch(value);
                    }}
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
              )}
            />
            {errors.storeId?.message && (
              <FieldError>{errors.storeId.message}</FieldError>
            )}
          </Field>

          <InputForm
            register={register}
            name="name"
            placeholder="Name"
            label="Name"
            icon={<Archive />}
            errorMessage={errors.name?.message}
          />

          <TextareaForm
            register={register}
            name="description"
            label="Description"
            errorMessage={errors.description?.message}
            placeholder="Description"
          />

          <InputForm
            register={register}
            type="number"
            name="price"
            placeholder="Price"
            label="Price"
            icon={<CircleDollarSign />}
            errorMessage={errors.price?.message}
            options={{
              valueAsNumber: true,
            }}
          />
          <InputForm
            register={register}
            type="number"
            name="discountPercentage"
            placeholder="Discount Percentage (%)"
            label="Discount Percentage"
            icon={<CircleDollarSign />}
            errorMessage={errors.discountPercentage?.message}
            options={{
              valueAsNumber: true,
            }}
          />

          <Selected
            control={control}
            name="type"
            errorMessage={errors.type?.message}
            items={items}
          />

          <InputForm
            register={register}
            name="image"
            placeholder="Image Poster"
            label="Image"
            icon={<ImageIcon />}
            errorMessage={errors.image?.message}
          />

          <Field
            data-invalid={errPath || !!errors.images?.message}
            className="w-full"
          >
            <FieldLabel>Image Add</FieldLabel>
            <Input
              aria-invalid={!!errors.images || errPath}
              value={valuePath}
              onChange={(e) => {
                setValuePath(e.target.value);
                setErrPath(false);
              }}
              placeholder="Image path"
            />
            {errPath && <FieldError>Enter an image path</FieldError>}
            {errors.images && <FieldError>{errors.images.message}</FieldError>}
          </Field>

          <Button
            onClick={(e) => {
              e.preventDefault();
              addImage();
            }}
          >
            Add <PlusIcon />
          </Button>
          {images && images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((path, index) => (
                <span
                  key={index}
                  onClick={() => removeImage(index)}
                  className="flex items-center gap-1 rounded-full border bg-muted px-3 py-1 text-sm cursor-pointer hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
                >
                  <img src={path} className="h-6 w-6" />

                  <Trash2 className="h-3 w-3" />
                </span>
              ))}
            </div>
          )}

          <Field
            data-invalid={errColor || !!errors.colors?.message}
            className="w-full"
          >
            <FieldLabel>Color</FieldLabel>
            <Select
              value={selectedColor}
              onValueChange={(value) => {
                setSelectedColor(value);
                setErrColor(false);
              }}
            >
              <SelectTrigger
                aria-invalid={!!errors.colors?.message || errColor}
              >
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {colorShow?.map((item) => (
                    <SelectItem key={item.color} value={item.color}>
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      {item.path}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {errColor && <FieldError>Select a color</FieldError>}
            {errors.colors && <FieldError>{errors.colors.message}</FieldError>}
          </Field>

          <Button
            onClick={(e) => {
              e.preventDefault();
              addColor();
            }}
          >
            Add <PlusIcon />
          </Button>
          {productColors && productColors.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {productColors.map((color, index) => (
                <span
                  key={index}
                  onClick={() => removeColor(index)}
                  className="flex items-center gap-1 rounded-full border bg-muted px-3 py-1 text-sm cursor-pointer hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>

                  <Trash2 className="h-3 w-3" />
                </span>
              ))}
            </div>
          )}

          <InputForm
            register={register}
            type="number"
            name="rating"
            placeholder="Rating"
            label="Rating"
            icon={<Star />}
            errorMessage={errors.rating?.message}
            options={{
              valueAsNumber: true,
            }}
          />

          <InputForm
            register={register}
            type="number"
            name="badge"
            placeholder="Badge"
            label="Badge"
            icon={<Package />}
            errorMessage={errors.badge?.message}
            options={{
              valueAsNumber: true,
            }}
          />

          <Button
            type="submit"
            variant="default"
            disabled={isPending || (typeForm === "edit" && !isDirty)}
            className="w-full"
          >
            {isPending ? <Spinner /> : childrenButton}
          </Button>
        </form>
      )}
    </Container>
  );
}
