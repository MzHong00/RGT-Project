import { Router } from "express";
import { books } from "./books";

export default () => {
  const app = Router();

  books(app);

  return app;
};
