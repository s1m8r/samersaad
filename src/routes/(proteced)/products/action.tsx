import Product from "@/pages/product/product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/products/action")({
  component: Product,
});
