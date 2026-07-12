import StatisticsProduct from "@/pages/product/statistics";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/(home)/statisticsproducts")({
  component: StatisticsProduct,
});
