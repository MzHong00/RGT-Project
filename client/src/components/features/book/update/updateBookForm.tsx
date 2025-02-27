"use client";

import { type SubmitHandler, useForm } from "react-hook-form";

import type { IBook } from "@/types/IBook";
import { useUpdateBookMutation } from "@/services/book/mutation/updateBookMutation";

import styles from "./updateBookForm.module.scss";

export const UpdateBookForm = ({ book }: { book: IBook }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>({
    defaultValues: book,
  });
  const { mutate } = useUpdateBookMutation();
  const onSubmit: SubmitHandler<IBook> = (newBook) => {
    mutate({ slug: book._id, book: newBook });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputGroup}>
        <label htmlFor="title">책 제목</label>
        <input
          id="title"
          type="text"
          placeholder="책 제목"
          {...register("title", { required: "책 제목을 입력해주세요." })}
        />
        {errors.title && <ErrorMessage msg={errors.title.message} />}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="author">저자</label>
        <input
          id="author"
          type="text"
          placeholder="저자"
          {...register("author", { required: "저자를 입력해주세요." })}
        />
        {errors.author && <ErrorMessage msg={errors.author.message} />}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="price">가격</label>
        <input
          id="price"
          type="number"
          placeholder="가격"
          {...register("price", {
            required: "가격을 입력해주세요.",
            min: { value: 0, message: "가격은 0 이상이어야 합니다." },
          })}
        />
        {errors.price && <ErrorMessage msg={errors.price.message} />}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="stock">재고 수량</label>
        <input
          id="stock"
          type="number"
          placeholder="재고 수량"
          {...register("stock", {
            required: "재고 수량을 입력해주세요.",
            min: { value: 0, message: "재고는 0 이상이어야 합니다." },
          })}
          disabled
        />
        {errors.stock && <ErrorMessage msg={errors.stock.message} />}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="soldCount">판매 개수</label>
        <input
          id="soldCount"
          type="number"
          placeholder="판매 개수"
          {...register("soldCount", {
            required: "판매 개수를 입력해주세요.",
            min: { value: 0, message: "재고는 0 이상이어야 합니다." },
          })}
        />
        {errors.soldCount && <ErrorMessage msg={errors.soldCount.message} />}
      </div>

      <input type="submit" value="수정하기" />
    </form>
  );
};

const ErrorMessage = ({ msg }: { msg?: string }) => {
  return <p className={styles.errorMessage}>*{msg}</p>;
};
