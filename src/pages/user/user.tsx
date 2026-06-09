import { useGetUser } from "@/API/user";
import Card from "@/components/layout/card";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DeleteUser from "./deleteUser";

interface ids {
  id: number;
}

const User = () => {
  const [id, setId] = useState<number>();
  const [showDel, setShowDel] = useState(false);

  const navigate = useNavigate();

  const editForm = useForm<ids>();
  const deleteForm = useForm<ids>();

  const gotoAdd = () => {
    navigate({
      to: "/users/adduser",
    });
  };

  const onSubmit = (data: ids) => {
    navigate({
      to: "/users/edit/$id",
      params: {
        id: String(data.id),
      },
    });
  };

  const onSubmitdel = (data: ids) => {
    setId(data.id);
    setShowDel(true);
  };

  const { data: user } = useGetUser(id);

  return (
    <div className="flex gap-4 p-4">

      <div className="flex-1">
        <Card
          title="Add User"
          description="Add a new user"
          onClick={gotoAdd}
        >
          Add User
        </Card>
      </div>

      <div className="flex-1">
        <Card
          title="Edit User"
          description="Edit existing user"
          onsubmit={onSubmit}
          register={editForm.register}
          handleSubmit={editForm.handleSubmit}
          placeholder="Enter User ID"
          hasAction="inputNumber"
        >
          Edit User
        </Card>
      </div>

      <div className="flex-1">
        <Card
          title="Delete User"
          description="Delete existing user"
          onsubmit={onSubmitdel}
          register={deleteForm.register}
          handleSubmit={deleteForm.handleSubmit}
          placeholder="Enter User ID"
          hasAction="inputNumber"
          variant="delete"
        >
          Delete User
        </Card>
      </div>

      {showDel && id !== undefined && (
        <DeleteUser
          userId={id}
          userName={user?.firstName}
          setShowDel={setShowDel}
        />
      )}
    </div>
  );
};

export default User;