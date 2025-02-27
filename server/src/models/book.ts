import mongoose from "mongoose";

import type { IBook } from "../interface/IBook";

const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  soldCount: { type: Number, default: 0 },
});

export const Book = mongoose.model<IBook>("Book", bookSchema);