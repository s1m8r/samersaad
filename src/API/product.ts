import { ProductScema } from "@/schemas/product";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import z from "zod";
import api from "./axios";

type productFormData = z.infer<typeof ProductScema>;
type storeResponseType = {
  data: productFormData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
const queryKey = ["product"];

export const useGetProducts = (
  sortBy = "id",
  sortOrder = "asc",
  page = 1,
  search = "",
) => {
  return useQuery<storeResponseType>({
    queryKey: [...queryKey, sortBy, sortOrder, page, search],

    queryFn: async () => {
      const res = await api.get(
        `api/collection/product?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&search=${search}&limit=10`,
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
export const useGetProductsStatistics = (
  sortBy = "id",
  sortOrder = "asc",
  search = "",
  page = 1,
) => {
  return useQuery<storeResponseType>({
    queryKey: [...queryKey, sortBy, sortOrder, search, page],

    queryFn: async () => {
      const res = await api.get(
        `api/collection/product?sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}&page=${page}`,
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
export const useGetProductsLimit = (search: string, fromDate: string) => {
  return useQuery<storeResponseType>({
    queryKey: [...queryKey, search, fromDate],

    queryFn: async () => {
      const res = await api.get(
        `api/collection/product?limit=9999999&search=${search}&fromDate=${fromDate}`,
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetProductsSearch = (search = "") => {
  return useQuery<storeResponseType>({
    queryKey: [...queryKey, search],

    queryFn: async () => {
      const res = await api.get(`api/collection/product?search=${search}`);

      return res.data;
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: productFormData) => {
      const res = await api.post("/api/collection/product", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
};

export const useGetProduct = (id?: number) => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const res = await api.get<productFormData>(
        `/api/collection/product/${id}`,
      );
      return res.data;
    },
    enabled: !!id,
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: productFormData }) => {
      return api.put(`/api/collection/product/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return api.delete(`/api/collection/product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
