import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "./axios";
import { z } from "zod";
import { registerSchema, userScema } from "@/schemas/user";
import { useAuthStore } from "@/stores/userStore";
type loginSchemaType = z.infer<typeof userScema>;
type registerFormData = z.infer<typeof registerSchema>;
type GetUsersResponse = {
  data: registerFormData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
const queryKey = ["users"];
export const useGetUsers = (
  sortBy = "id",
  sortOrder = "asc",
  page = 1,
  search = "",
) => {
  return useQuery<GetUsersResponse>({
    queryKey: [...queryKey, sortBy, sortOrder, page, search],

    queryFn: async () => {
      const res = await api.get(
        `/api/users?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&search=${search}`,
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
export const useGetUsersStatistics = (fromDate?: string) => {
  return useQuery<GetUsersResponse>({
    queryKey: [...queryKey, fromDate],

    queryFn: async () => {
      const res = await api.get(
        `/api/users?&limit=1000000&fromDate=${fromDate}`,
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: loginSchemaType) => {
      const res = await api.post("/api/login", data);
      return res.data;
    },
    onSuccess: (res) => {
      useAuthStore.getState().setToken(res.token);
      useAuthStore.getState().setUser(res.user);
      window.location.href = "/";
    },
  });
};
const changePassword = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
type changePasswordType = z.infer<typeof changePassword>;

export const useRestPassword = () => {
  return useMutation({
    mutationFn: async (data: changePasswordType) => {
      const res = await api.post("/api/reset-password", data);
      return res.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: registerFormData) => {
      const res = await api.post("/api/users", data);
      return res.data.data;
    },
    onSuccess: () => {
      // window.location.href = "/login";
      console.log("Register");
    },
  });
};
export const useGetUser = (id?: number) => {
  return useQuery({
    queryKey: [...queryKey, id],
    queryFn: async () => {
      const res = await api.get(`/api/users/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: registerFormData }) => {
      return api.put(`/api/users/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return api.delete(`/api/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
