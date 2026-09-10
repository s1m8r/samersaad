import { Button } from "@/components/ui/button";
import DeleteProduct from "@/pages/product/deleteProduct";
import { useNavigate } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  type: "stores" | "products";
  productId?: number;
  name: string;
  image: string;
  onClick?: () => void;
}

export default function OnlyCard({
  name,
  image,
  onClick,
  type,
  productId,
}: Props) {
  const [showDel, setShowDel] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="group/item overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="cursor-pointer overflow-hidden" onClick={onClick}>
          <img
            src={image}
            alt={name}
            className="h-40 w-full object-cover transition-transform duration-300 group-hover/item:scale-105"
          />
        </div>
        <div className="p-3">
          <h2
            className="cursor-pointer truncate text-sm font-semibold text-foreground"
            onClick={onClick}
          >
            {name}
          </h2>
        </div>
        {type === "products" && (
          <div className="flex gap-2 p-3 pt-0">
            <Button
              onClick={() =>
                navigate({
                  to: "/products/edit/$id",
                  params: {
                    id: String(productId),
                  },
                })
              }
              variant="default"
              className="flex-1"
            >
              <Pencil />
              Edit
            </Button>
            <Button
              onClick={() => {
                setShowDel(true);
              }}
              variant="destructive"
              className="flex-1"
            >
              <Trash2 />
              Delete
            </Button>
          </div>
        )}
      </div>
      {showDel && (
        <DeleteProduct
          productId={productId!}
          productName={name}
          setShowDel={setShowDel}
        />
      )}
    </>
  );
}
