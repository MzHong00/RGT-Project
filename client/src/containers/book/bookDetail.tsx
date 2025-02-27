"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";

import { BookQueries } from "@/services/book/queries/readBookQueries";
import { DeleteBookButton } from "@/components/features/book/delete/deleteBookButton";

import styles from "./bookDetail.module.scss";

export const BookDetail = ({ id }: { id: string }) => {
  const { data: book } = useSuspenseQuery(BookQueries.readBook(id));

  const { _id, title, author, price, stock, soldCount } = book;

  return (
    <article className={styles.container}>
      <div>판매 개수: {soldCount}</div>
      <section className={styles.book}>
        <header>
          <h2>{title}</h2>
          <div>{author}</div>
        </header>
        <footer>
          <div>￦ {price}원</div>
          <div>재고: {stock - soldCount}</div>
        </footer>
      </section>
      <section className={styles.actionBar}>
        <Link href={`/book/${_id}/update`} className={styles.updateButton}>
          수정
        </Link>
        <DeleteBookButton id={_id} className={styles.deleteButton} />
      </section>
    </article>
  );
};
