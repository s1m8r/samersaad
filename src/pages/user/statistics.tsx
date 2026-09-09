import { useGetUsers, useGetUsersStatistics } from "@/API/user";
import CardNew from "@/components/layout/cardNew";
import { LineChartItems } from "@/components/layout/charts/lineChart";
import DesignCard from "@/components/layout/DesignCard";
import Padding from "@/components/layout/padding";
import Title from "@/components/layout/title";
import { UserCheck2, UserPlus2, Users2 } from "lucide-react";
import { useState } from "react";

const StatisticsUser = () => {
  const { data: users } = useGetUsers();
  const { data: usersRole } = useGetUsers("id", "asc", 1, "admin");
  const [time, setTime] = useState("");
  const { data: newUsers } = useGetUsersStatistics(time.toString());
  const roleAdmin = usersRole?.data.filter((item) => item.roleId === 1);
  const limitUsers = newUsers?.data.map((item) => ({
    createdAt: item.createdAt!,
  }));
  return (
    <Padding>
      <Title children="Users Analytics" description="View User distribution." />
      <DesignCard>
        <CardNew
          name="Total Users"
          count={users?.pagination.totalItems ?? 0}
          icon={<Users2 />}
        />
        <CardNew
          name="New Users"
          count={newUsers?.pagination.totalItems ?? 0}
          icon={<UserPlus2 />}
        />
        <CardNew
          name="Admin Users"
          count={roleAdmin?.length ?? 0}
          icon={<UserCheck2 />}
          itemSelect="Users with admin role"
        />
      </DesignCard>
      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-12">
          <LineChartItems data={limitUsers ?? []} setTime={setTime} />
        </div>
      </div>
    </Padding>
  );
};

export default StatisticsUser;
