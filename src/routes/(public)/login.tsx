import Login from "@/pages/login/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/login")({
  component: Login,
});
