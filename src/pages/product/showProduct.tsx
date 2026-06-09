import Table from "@/components/layout/table";
import z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ProdectScema } from "@/schemas/product";
import { useGetProducts } from "@/API/product";
import DeleteProduct from "./deleteProduct";

type productFormData = z.infer<typeof ProdectScema>;

const ShowProduct = () => {
  const navigate = useNavigate();

  const [showDel, setShowDel] = useState(false);
  const [productId, setProductId] = useState<number>();
  const [productName, setProductName] = useState("");

  const [page, setPage] = useState(1);

  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const order = (value: string) => {
    if (sortBy === value) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }
  };

  const { data } = useGetProducts(sortBy, sortOrder, page);

  const products = data?.data ?? [];
  const pagination = data?.pagination;

  const columns: ColumnDef<productFormData>[] = [
    {
      accessorKey: "id",
      header: () => <span onClick={() => order("id")}>ID</span>,
    },
    {
      accessorKey: "nameProdect",
      header: () => <span onClick={() => order("nameProdect")}>Name</span>,
    },
    {
      accessorKey: "storeName",
      header: () => <span onClick={() => order("storeName")}>Store</span>,
    },
    {
      accessorKey: "description",
      header: () => <span onClick={() => order("description")}>Description</span>,
    },
    {
      accessorKey: "type",
      header: () => <span onClick={() => order("type")}>Type</span>,
    },
    {
      accessorKey: "price",
      header: () => <span onClick={() => order("price")}>Price</span>,
    },
    {
      accessorKey: "edit",
      header: () => <span>Edit</span>,
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <button
            onClick={() =>
              navigate({
                to: "/product/edit/$id",
                params: {
                  id,
                },
              })
            }
          >
            Edit
          </button>
        );
      },
    },
    {
      accessorKey: "delete",
      header: () => <span>Delete</span>,
      cell: ({ row }) => {
        const id = row.original.id;
        const name = row.original.nameProdect;

        return (
          <button
            onClick={() => {
              setShowDel(true);
              setProductId(id);
              setProductName(name);
            }}
          >
            Delete
          </button>
        );
      },
    },
  ];

  return (
    <div>
         <div>
  <h1 className="text-2xl font-bold">Product</h1>
</div>
      {pagination && (
        <Table
          columns={columns}
          data={products}
          pagination={pagination}
          page={page}
          setPage={setPage}
        />
      )}

      {showDel && productId && (
        <DeleteProduct
          productId={productId}
          productName={productName}
          setShowDel={setShowDel}
        />
      )}
    </div>
  );
};

export default ShowProduct;