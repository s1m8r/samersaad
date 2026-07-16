import { Button } from "@/components/ui/button";
import DeleteProduct from "@/pages/product/deleteProduct";
import { useNavigate } from "@tanstack/react-router";
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
      <div className="cursor-pointer h-77 w-60 mx-1 my-4 rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-cover"
          onClick={onClick}
        />
        <div className="p-4">
          <h2
            className="text-base font-semibold text-gray-800 cursor-pointer"
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
              Edit
            </Button>
            <Button
              onClick={() => {
                setShowDel(true);
              }}
              variant="destructive"
              className="flex-1"
            >
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
