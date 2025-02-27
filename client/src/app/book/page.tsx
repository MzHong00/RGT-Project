import Link from "next/link";
import { Suspense } from "react";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import type { IBookQueryParams } from "@/types/IBook";
import { IconBox } from "@/components/common/iconBox";
import { SearchBox } from "@/components/features/book/search";
import { BookList } from "@/components/features/book/list/bookList";
import { LoadingSpinner } from "@/components/common/loadingSpinner";
  
import styles from "./page.module.scss";

export default async function BookPage({
  searchParams,
}: {
  searchParams: IBookQueryParams;
}) {
  const params = await searchParams;

  return (
    <div className={styles.page}>
      <section>
        <Link href={"/book/create"} className={styles.createBookButton}>
          <IconBox Icon={RiAddLine}>책 추가</IconBox>
        </Link>
      </section>
      <SearchBox />
      <Suspense fallback={<LoadingSpinner msg="책 목록 로딩 중..." />}>
        <BookList {...params} />
      </Suspense>
    </div>
  );
}
