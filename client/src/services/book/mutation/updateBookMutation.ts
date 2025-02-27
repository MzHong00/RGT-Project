import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IBook } from "@/types/IBook";
import { BookServices } from "../bookServices";
import { BookQueries } from "../queries/readBookQueries";

export const useUpdateBookMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, book }: { slug: string; book: IBook }) =>
      BookServices.updateBook(slug, book),
    onSuccess: async (data: IBook) => {
      const { root, list } = BookQueries.keys;
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: list,
        }),
        queryClient.refetchQueries({ queryKey: [...root, data._id] }),
      ]);

      router.back();
    },
  });
};
