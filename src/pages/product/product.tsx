import Card from "@/components/layout/card";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetProduct, useGetProductsSearch } from "@/API/product";
import DeleteProduct from "./deleteProduct";

interface ids {
    id: number;
}

const Product = () => {
    const [id, setId] = useState<number>();
    const [showDel, setShowDel] = useState(false);
    const navigate = useNavigate();
    const editForm = useForm<ids>();
    const deleteForm = useForm<ids>();
    const [searchEditProduct, setSearchEditProduct] = useState("")
    const { data: editDataProduct } = useGetProductsSearch(searchEditProduct)    
    const [searchDelProduct, setSearchDelProduct] = useState("")
    const { data: delDataProduct } = useGetProductsSearch(searchDelProduct)
    const gotoAdd = () => {
        navigate({
            to: "/products/addproduct",
        });
    };
const location = useLocation();
const onSubmit = (data: ids) => {
  if (data.id) {
    navigate({
      to: "/products/edit/$id",
      params: {
        id: Number(data.id),
      },
      search: {
        from: location.pathname,
      },
    });
  }
};

  const onSubmitdel = (data: ids) => {
    if (data.id) {
      setId(data.id);
      setShowDel(true);
    }
  };

  const { data: user } = useGetProduct(id);

  return (
    <div className="flex gap-4 p-4">

      <div className="flex-1">
        <Card
          title="Add Product"
          description="Add a new Product"
          onClick={gotoAdd}
          variant="add"
        >
          Add Product
        </Card>
      </div>

      <div className="flex-1">
        <Card
          title="Edit Product"
          description="Edit Product"
          onsubmit={onSubmit}
          register={editForm.register}
          handleSubmit={editForm.handleSubmit}
          placeholder="Enter Product ID"
          hasAction="combobox"
          dataComboboxOne={editDataProduct?.data}
          setValue={editForm.setValue}
          setSearch={setSearchEditProduct}
          variant="add"
        >
          Edit Product
        </Card>
      </div>

      <div className="flex-1">
        <Card
          title="Delete Product"
          description="Delete existing Product"
          onsubmit={onSubmitdel}
          register={deleteForm.register}
          handleSubmit={deleteForm.handleSubmit}
          placeholder="Enter User ID"
          hasAction="combobox"
          variant="delete"
          setValue={deleteForm.setValue}
          setSearch={setSearchDelProduct}
                  dataComboboxOne={delDataProduct?.data}                  
        >
          Delete Role
        </Card>
      </div>

      {showDel && id && (
        <DeleteProduct
          productId={id}
          productName={user?.name ?? ""}
          setShowDel={setShowDel}
        />
      )}
    </div>
  );
};

export default Product;