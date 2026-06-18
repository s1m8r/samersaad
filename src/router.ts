import { createRouter } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/userStore";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
    routeTree,
    context: {
        auth: {
            get token() {
                return useAuthStore.getState().token
            }
        }
    }
});