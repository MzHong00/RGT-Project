"use client";

import { type SubmitHandler, useForm } from "react-hook-form";

import type { IBook } from "@/types/IBook";
import { useCreateBookMutation } from "@/services/book/mutation/ceateBookMutation";

import styles from "./createBookForm.module.scss";

export const CreateBookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();
  const { mutate } = useCreateBookMutation();

  const onSubmit: SubmitHandler<IBook> = (data) => {
    mutate(data);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="책 제목"
        {...register("title", { required: "책 제목을 입력해주세요." })}
      />
      {errors.title && <ErrorMessage msg={errors.title.message} />}

      <input
        type="text"
        placeholder="저자"
        {...register("author", { required: "저자를 입력해주세요." })}
      />
      {errors.author && <ErrorMessage msg={errors.author.message} />}

      <input
        type="number"
        placeholder="가격"
        {...register("price", {
          required: "가격을 입력해주세요.",
          min: { value: 0, message: "가격은 0 이상이어야 합니다." },
        })}
      />
      {errors.price && <ErrorMessage msg={errors.price.message} />}

      <input
        type="number"
        placeholder="재고 수량"
        {...register("stock", {
          required: "재고 수량을 입력해주세요.",
          min: { value: 0, message: "재고는 0 이상이어야 합니다." },
        })}
      />
      {errors.stock && <ErrorMessage msg={errors.stock.message} />}

      <input type="submit" value="생성하기" />
    </form>
  );
};

const ErrorMessage = ({ msg }: { msg?: string }) => {
  return <p className={styles.errorMessage}>*{msg}</p>;
};
