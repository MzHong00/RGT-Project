import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IBook } from "@/types/IBook";
import { BookServices } from "../bookServices";
import { BookQueries } from "../queries/readBookQueries";

export const useCreateBookMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: IBook) => BookServices.createBook(book),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: BookQueries.keys.list,
      });

      router.back();
    },
  });
};
