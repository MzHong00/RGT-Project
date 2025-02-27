import axios from "@/lib/axios";

import type { IBook, IBookQueryParams } from "@/types/IBook";

export class BookServices {
  static readonly root = "books";

  static async readBook(
    slug?: string,
    config?: { signal?: AbortSignal }
  ): Promise<IBook> {
    const res = await axios.get(`${this.root}/${slug}`, config);
    return res.data;
  }

  static async readBooks(config?: {
    params: IBookQueryParams;
    signal?: AbortSignal;
  }): Promise<{ books: IBook[]; totalCount: number }> {
    const res = await axios.get(`${this.root}`, config);
    return res.data;
  }

  static async createBook(book: IBook) {
    const res = await axios.post(`${this.root}`, book);
    return res.data;
  }

  static async updateBook(slug: string, book: IBook) {
    const res = await axios.put(`${this.root}/${slug}`, book);
    return res.data;
  }

  static async deleteBook(slug: string) {
    const res = await axios.delete(`${this.root}/${slug}`);
    return res.data;
  }
}
