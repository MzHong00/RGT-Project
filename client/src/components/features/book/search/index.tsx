"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import { IconBox } from "@/components/common/iconBox";

import styles from "./index.module.scss";

const FILTER_TYPES = [
  { query: "title", text: "제목" },
  { query: "author", text: "저자" },
] as const;

type FilterQuery = (typeof FILTER_TYPES)[number]["query"];

export const SearchBox = () => {
  const router = useRouter();
  const [filterMode, setFilterMode] = useState<FilterQuery>(
    FILTER_TYPES[0].query
  );
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      params.set(filterMode, search);

      router.replace(`/book?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, filterMode, router]);

  return (
    <div>
      <nav className={styles.filterTypeBox}>
        <ul>
          {FILTER_TYPES.map(({ query, text }) => (
            <li key={query}>
              <button
                style={{
                  ...(filterMode === query && {
                    background: "rgb(var(--color-main))",
                  }),
                }}
                onClick={() => {
                  setFilterMode(query);
                  setSearch("");
                }}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
        (으)로 검색하기
      </nav>
      <div className={styles.searchBox}>
        <IconBox Icon={RiSearchLine} className={styles.icon} />
        <input
          type="search"
          value={search}
          placeholder="검색어를 입력하세요."
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
};
