import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BookServices } from "../bookServices";
import { BookQueries } from "../queries/readBookQueries";

export const useDeleteBookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => BookServices.deleteBook(slug),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: BookQueries.keys.list });
    },
  });
};
