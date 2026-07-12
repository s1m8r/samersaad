import StatisticsStores from "@/pages/storePage/statistics";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/(home)/statisticsStores")({
  component: StatisticsStores,
});
