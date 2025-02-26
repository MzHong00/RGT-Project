import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  authors: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  soldCount: { type: Number, required: true },
});

export const Book = mongoose.model("Book", bookSchema);