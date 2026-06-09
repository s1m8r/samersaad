import { useQuery } from "@tanstack/react-query";
import api from "./axios";
const queryKey = ["permissions"]
type Permission = {
    id: number;
    name: string;
};
export const usePermissions = () => {
    return useQuery<Permission[]>({
        queryKey,
        queryFn: async () => {
            const res = await api.get("/api/permissions?limit=100");
            return res.data.data;
        }
    });
};

