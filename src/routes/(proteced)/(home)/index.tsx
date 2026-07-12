import Home from "@/pages/home/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/(home)/")({
  component: Home,
});
