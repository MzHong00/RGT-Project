import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

const route = Router();

export const books = (app: Router) => {
  app.use("/books", route);

  // 책 목록 조회 - 입력 검증 필요 없음
  route.get("/", (req, res) => {
    res.json({ message: "책 목록 조회" });
  });

  // 책 상세 정보 조회 - ID 검증
  route.get(
    "/:id",
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    (req, res) => {
      const { id } = req.params;
      res.json({ message: `책 상세 정보 조회 - ID: ${id}` });
    }
  );

  // 책 추가 - 책 정보 검증
  route.post(
    "/",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        authors: Joi.string().required(),
        price: Joi.number().required().min(0),
        stock: Joi.number().required().min(0),
        soldCount: Joi.number().required().min(0),
      }),
    }),
    (req, res) => {
      res.json({ message: "책 추가", book: req.body });
    }
  );

  // 책 수정 - ID 및 수정 정보 검증
  route.put(
    "/:id",
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().optional(),
        authors: Joi.string().optional(),
        price: Joi.number().optional().min(0),
        stock: Joi.number().optional().min(0),
        soldCount: Joi.number().optional().min(0),
      }),
    }),
    (req, res) => {
      const { id } = req.params;
      res.json({ message: `책 수정 - ID: ${id}`, updatedBook: req.body });
    }
  );

  // 책 삭제 - ID 검증
  route.delete(
    "/:id",
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    (req, res) => {
      const { id } = req.params;
      res.json({ message: `책 삭제 - ID: ${id}` });
    }
  );
};
