"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { RiBookLine } from "@react-icons/all-files/ri/RiBookLine";
import { RiArrowLeftSLine } from "@react-icons/all-files/ri/RiArrowLeftSLine";
import { RiArrowRightSLine } from "@react-icons/all-files/ri/RiArrowRightSLine";

import type { IBook, IBookQueryParams } from "@/types/IBook";
import { IconBox } from "@/components/common/iconBox";
import { BookQueries } from "@/services/book/queries/readBookQueries";

import styles from "./bookList.module.scss";

const LIMIT = 10;
const PAGE_GROUP_SIZE = 5;

export const BookList = ({ page, title, author }: IBookQueryParams) => {
  const curPage = Number(page) || 1;

  const { data } = useSuspenseQuery(
    BookQueries.readBooks({ page: `${curPage - 1}`, title, author })
  );

  return (
    <ul className={styles.bookContainer}>
      {data.books.map((book) => (
        <li key={book._id}>
          <Link href={`/book/${book._id}`}>
            <Book book={book} />
          </Link>
        </li>
      ))}
      <BookPageNavigation curPage={curPage} totalCount={data?.totalCount} />
    </ul>
  );
};

const Book = ({ book }: { book: IBook }) => {
  const { title, author, stock, soldCount } = book;

  return (
    <div className={styles.book}>
      <h4>
        <RiBookLine /> {title}
      </h4>
      <p>저자: {author}</p>
      <p>재고: {stock - soldCount}</p>
    </div>
  );
};

/*
  page는 1부터 시작
  pageGroup은 0부터 시작 (pageGroup: Nav에서 한 번에 볼 수 있는 page 개수)
*/

const BookPageNavigation = ({
  curPage,
  totalCount,
}: {
  curPage: number;
  totalCount: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getPageGroupSection = (page: number) =>
    Math.floor((page - 1) / PAGE_GROUP_SIZE);

  const endPage = Math.ceil(totalCount / LIMIT);
  const curPageGroupSection = getPageGroupSection(curPage);
  const endPageGroupSection = getPageGroupSection(endPage);

  const movePrevGroupSectionHandler = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", `${PAGE_GROUP_SIZE * curPageGroupSection}`);
    router.push(`?${newParams.toString()}`);
  };

  const moveNextGroupSectionHandler = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    const nextPageGroupsection = curPageGroupSection + 1;
    newParams.set("page", `${PAGE_GROUP_SIZE * nextPageGroupsection + 1}`);
    router.push(`?${newParams.toString()}`);
  };

  const movePageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", e.currentTarget.innerText);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <nav className={styles.bookPageNavigation}>
      {curPageGroupSection > 0 && (
        <button onClick={movePrevGroupSectionHandler}>
          <IconBox Icon={RiArrowLeftSLine} />
        </button>
      )}

      {Array.from({ length: PAGE_GROUP_SIZE }).map((_, i) => {
        const page = curPageGroupSection * PAGE_GROUP_SIZE + i + 1;

        return (
          page <= endPage && (
            <button
              key={page}
              onClick={movePageHandler}
              className={styles.numberPageButton}
              style={{
                ...(curPage === page && {
                  background: "rgb(var(--color-main))",
                }),
              }}
            >
              {page}
            </button>
          )
        );
      })}

      {curPageGroupSection < endPageGroupSection && (
        <button onClick={moveNextGroupSectionHandler}>
          <IconBox Icon={RiArrowRightSLine} />
        </button>
      )}
    </nav>
  );
};
