import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "./axios";
import z from "zod";
import { types } from "@/schemas/types";
const queryKey = ["types"];
type typeTypes = z.infer<typeof types>;
export const useGetTypes = () => {
  return useQuery<typeTypes>({
    queryKey,

    queryFn: async () => {
      const res = await api.get(`api/collection/types`);

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
