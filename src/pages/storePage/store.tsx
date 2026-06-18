import Card from "@/components/layout/card";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DeleteStore from "./deleteStore";
import { useGetStore, useGetStoresSearch } from "@/API/store";

interface ids {
  id: number;
}

const Store = () => {
  const [id, setId] = useState<number>();
  const [showDel, setShowDel] = useState(false);

  const navigate = useNavigate();

  const editForm = useForm<ids>();
  const deleteForm = useForm<ids>();
  const [searchEdit,setSearchEdit]=useState("")
  const { data: editData } = useGetStoresSearch(searchEdit)
  const [searchDel,setSearchDel]=useState("")
  const { data: delData } = useGetStoresSearch(searchDel)

  const gotoAdd = () => {
    navigate({
      to: "/stores/addstore",
    });
  };

  const onSubmit = (data: ids) => {
    navigate({
      to: "/stores/edit/$id",
      params: {
        id: Number(data.id),
      },
    });
  };

  const onSubmitdel = (data: ids) => {
    setId(data.id);
    setShowDel(true);
  };

  const { data: user } = useGetStore(id);

  return (
    <div className="flex gap-4 p-4 flex-wrap">

      <div className="flex-1">
        <Card
          title="Add Store"
          description="Add a new Store"
          onClick={gotoAdd}
          variant="add"
        >
          Add Store
        </Card>
      </div>

      <div className="flex-1">
        <Card
          title="Edit Store"
          description="Edit Store"
          onsubmit={onSubmit}
          register={editForm.register}
          handleSubmit={editForm.handleSubmit}
          placeholder="Enter Store ID"
          hasAction="combobox"
          dataComboboxOne={editData?.data}
          setValue={editForm.setValue}
          setSearch={setSearchEdit}
          variant="add"
        >
          Edit Store
        </Card>
      </div>

      <div className="flex-1">
        <Card
          title="Delete Store"
          description="Delete existing Store"
          onsubmit={onSubmitdel}
          register={deleteForm.register}
          handleSubmit={deleteForm.handleSubmit}
          placeholder="Enter User ID"
          hasAction="combobox"
          variant="delete"
          dataComboboxOne={delData?.data}
          setValue={deleteForm.setValue}
          setSearch={setSearchDel}
        >
          Delete Store
        </Card>
      </div>

      {showDel && id && (
        <DeleteStore
          storeId={id}
          storeName={user?.name ?? ""}
          setShowDel={setShowDel}
        />
      )}
    </div>
  );
};

export default Store;