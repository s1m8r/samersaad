import ErrorPage from "@/pages/pageError/erroePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/401")({
  component: ErrorPage,
});
