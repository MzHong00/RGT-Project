import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { BookService } from "../../../services/book";
import { IBookQueryParams } from "../../../interface/IBook";

const route = Router();

export const books = (app: Router) => {
  app.use("/books", route);

  // 책 목록 조회
  route.get(
    "/",
    celebrate({
      [Segments.QUERY]: Joi.object({
        page: Joi.string(),
        title: Joi.string().allow(""),
        author: Joi.string().allow(""),
      }),
    }),
    async (req, res) => {
      try {
        const query = req.query as IBookQueryParams;

        const { books, totalCount } = await BookService.readBooks(query);
        res.json({ books, totalCount });
      } catch (error) {
        res.status(500).json({ message: "서버 오류 발생", error });
      }
    }
  );

  // 책 상세 정보 조회
  route.get(
    "/:id",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    async (req, res) => {
      try {
        const { id } = req.params;
        const book = await BookService.readBook(id);

        if (!book) {
          return res.status(404).json({ message: "책을 찾을 수 없습니다." });
        }

        res.json(book);
      } catch (error) {
        res.status(500).json({ message: "서버 오류 발생", error });
      }
    }
  );

  // 책 추가
  route.post(
    "/",
    celebrate({
      [Segments.BODY]: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        price: Joi.number().required().min(0),
        stock: Joi.number().required().min(0),
      }),
    }),
    async (req, res) => {
      try {
        const book = req.body;
        const newBook = await BookService.createBook(book);

        res.status(201).json(newBook);
      } catch (error) {
        res.status(500).json({ message: "책 추가 중 오류 발생", error });
      }
    }
  );

  // 책 수정
  route.put(
    "/:id",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        id: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object({
        _id: Joi.string(),
        title: Joi.string(),
        author: Joi.string(),
        price: Joi.number().min(0),
        stock: Joi.number().min(0),
        soldCount: Joi.number().min(0),
      }),
    }),
    async (req, res) => {
      try {
        const { id } = req.params;
        const book = req.body;

        const updatedBook = await BookService.updateBook(id, book);
        if (!updatedBook) {
          return res.status(404).json({ message: "책을 찾을 수 없습니다." });
        }

        res.json(updatedBook);
      } catch (error) {
        res.status(500).json({ message: "책 수정 중 오류 발생", error });
      }
    }
  );

  // 책 삭제
  route.delete(
    "/:id",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    async (req, res) => {
      try {
        const { id } = req.params;

        const deleted = await BookService.deleteBook(id);
        if (!deleted) {
          return res.status(404).json({ message: "책을 찾을 수 없습니다." });
        }

        res.json({ message: `책 삭제 - ID: ${id}` });
      } catch (error) {
        res.status(500).json({ message: "책 삭제 중 오류 발생", error });
      }
    }
  );
};
