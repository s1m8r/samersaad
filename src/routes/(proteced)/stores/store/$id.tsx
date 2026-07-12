import OnlyStore from "@/pages/storePage/onlyStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/stores/store/$id")({
  component: OnlyStore,
});
