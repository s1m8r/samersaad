import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./axios";
import { roleScema } from "@/schemas/role";
import z from "zod";
const queryKey =["roles"]
type roleType = z.infer<typeof roleScema>
type roleResponseType = {
  data: roleType[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export const useGetRolesSerch = (search = "") => {
  return useQuery<roleResponseType>({
    queryKey: [...queryKey, search],

    queryFn: async () => {
      const res = await api.get(
        `/api/roles?search=${search}`
      );

      return res.data;
    },
  });
};
export const useGetRoles = (sortBy = "", sortOrder = "", page = 1, search="") => {
  return useQuery<roleResponseType>({
    queryKey: [...queryKey, sortBy, sortOrder, page, search],
    queryFn: async () => {
      const res = await api.get(
        `/api/roles?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&search=${search}`
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};


export const useAddRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: roleType) => {
            const res = await api.post("/api/roles", data)
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey,
            });
        },
    })
}

export const useGetRole = (id?: number) => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const res = await api.get<roleType>(`/api/roles/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
export const useUpdateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: roleType }) => {
            return api.put(`/api/roles/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });
};
export const useRoles = () => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const res = await api.get("/api/roles");
            return res.data.data;
        }
    });
};

export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }: { id: number }) => {
            return api.delete(`/api/roles/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });
};