import Link from "next/link";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import type { IBookQueryParams } from "@/types/IBook";
import { IconBox } from "@/components/common/iconBox";
import { SearchBox } from "@/components/features/book/search";
import { BookList } from "@/components/features/book/list/bookList";
import { QueryWrapper } from "@/components/common/queryWrapper";
import { LoadingSpinner } from "@/components/common/loadingSpinner";
  
import styles from "./page.module.scss";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<IBookQueryParams>;
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
      <QueryWrapper supenseFallback={<LoadingSpinner msg="책 목록 로딩 중..." />}>
        <BookList {...params} />
      </QueryWrapper>
    </div>
  );
}
