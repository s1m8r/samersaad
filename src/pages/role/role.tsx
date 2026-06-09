import Card from "@/components/layout/card";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DeleteRole from "./DeleteRolw";
import { useGetRole } from "@/API/role";

interface ids {
  id: number;
}

const Role = () => {
  const [id, setId] = useState<number>();
  const [showDel, setShowDel] = useState(false);

  const navigate = useNavigate();

  const editForm = useForm<ids>();
  const deleteForm = useForm<ids>();

  const gotoAdd = () => {
    navigate({
      to: "/role/addrole",
    });
  };

  const onSubmit = (data: ids) => {
    navigate({
      to: "/role/edit/$id",
      params: {
        id: String(data.id),
      },
    });
  };

  const onSubmitdel = (data: ids) => {
    setId(data.id);
    setShowDel(true);
  };

  const { data: user } = useGetRole(id);

  return (
    <div className="flex gap-4 p-4">

      <div className="flex-1">
        <Card
          title="Add Role"
          description="Add a new Role"
          onClick={gotoAdd}
        >
          Add Role
        </Card>
      </div>

      <div className="flex-1">
        <Card
          title="Edit Role"
          description="Edit Role"
          onsubmit={onSubmit}
          register={editForm.register}
          handleSubmit={editForm.handleSubmit}
          placeholder="Enter Role ID"
          hasAction="inputNumber"
        >
          Edit Role
        </Card>
      </div>

      <div className="flex-1">
        <Card
          title="Delete Role"
          description="Delete existing Role"
          onsubmit={onSubmitdel}
          register={deleteForm.register}
          handleSubmit={deleteForm.handleSubmit}
          placeholder="Enter User ID"
          hasAction="inputNumber"
          variant="delete"
        >
          Delete Role
        </Card>
      </div>

      {showDel && id && (
        <DeleteRole
          roleId={id}
          roleName={user?.name ?? ""}
          setShowDel={setShowDel}
        />
      )}
    </div>
  );
};

export default Role;