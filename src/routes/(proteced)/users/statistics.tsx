import StatisticsUser from "@/pages/user/statistics";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/users/statistics")({
  component: StatisticsUser,
});
