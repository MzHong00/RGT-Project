"use client";

import { useRouter } from "next/navigation";

import type { IBook } from "@/types/IBook";
import { useDeleteBookMutation } from "@/services/book/mutation/deleteBookMutation";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: IBook["_id"];
}

export const DeleteBookButton = ({ id, ...props }: Props) => {
  const router = useRouter();
  const { mutate } = useDeleteBookMutation();

  return (
    <button
      onClick={() => {
        mutate(id);
        router.back();
      }}
      {...props}
    >
      삭제
    </button>
  );
};
