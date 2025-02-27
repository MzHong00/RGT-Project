import type { IBook, IBookQueryParams } from "../interface/IBook";
import { Book } from "../models/book";

export class BookService {
  // 모든 책을 읽어오는 메서드
  static async readBooks({ page = "0", title, author }: IBookQueryParams) {
    const limit = 10;
    const offset = Number(page) * limit;

    const filter = {
      ...(title && { title: { $regex: title, $options: "i" } }),
      ...(author && { author: { $regex: author, $options: "i" } }),
    };

    try {
      const totalCount = await Book.countDocuments(filter);
      const books = await Book.find(filter, "-__v").skip(offset).limit(limit);

      return { books, totalCount };
    } catch (error) {
      throw new Error("Error reading books: " + error);
    }
  }

  // 특정 책을 ID로 읽어오는 메서드
  static async readBook(bookId: IBook["_id"]) {
    try {
      const book = await Book.findById(bookId, "-__v"); // 특정 ID의 책 데이터 가져오기
      if (!book) throw new Error("Book not found");
      return book;
    } catch (error) {
      throw new Error("Error reading book: " + error);
    }
  }

  // 책을 생성하는 메서드
  static async createBook(bookData: IBook) {
    try {
      const newBook = await Book.create(bookData); // 새 책 생성
      return newBook;
    } catch (error) {
      throw new Error("Error creating book: " + error);
    }
  }

  // 책 정보를 업데이트하는 메서드
  static async updateBook(bookId: IBook["_id"], updatedData: IBook) {
    try {
      const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, {
        new: true,
      }); // 책 업데이트
      if (!updatedBook) throw new Error("Book not found");
      return updatedBook;
    } catch (error) {
      throw new Error("Error updating book: " + error);
    }
  }

  // 책을 삭제하는 메서드
  static async deleteBook(bookId: IBook["_id"]) {
    try {
      const deletedBook = await Book.findByIdAndDelete(bookId); // 책 삭제
      if (!deletedBook) throw new Error("Book not found");
      return deletedBook;
    } catch (error) {
      throw new Error("Error deleting book: " + error);
    }
  }
}
