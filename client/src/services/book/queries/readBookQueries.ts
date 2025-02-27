import { queryOptions } from "@tanstack/react-query";

import type { IBookQueryParams } from "@/types/IBook";
import { BookServices } from "../bookServices";

export class BookQueries {
  static readonly keys = {
    root: ["book"],
    list: ["books"],
  };

  static readBook(slug?: string) {
    return queryOptions({
      queryKey: [...this.keys.root, slug],
      queryFn: ({ signal }) => BookServices.readBook(slug, { signal }),
    });
  }

  static readBooks(params: IBookQueryParams) {
    const { page = 0, title = "", author = "" } = params;

    return queryOptions({
      queryKey: [...this.keys.list, page, title, author],
      queryFn: ({ signal }) => BookServices.readBooks({ signal, params }),
    });
  }
}
