import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "./axios";
import z from "zod";
import { colors } from "@/schemas/colors";
const queryKey = ["colors"];
type typeColors = z.infer<typeof colors>;
export const useGetColors = () => {
  return useQuery<typeColors>({
    queryKey,

    queryFn: async () => {
      const res = await api.get(`api/collection/colors?limit=20`);

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
