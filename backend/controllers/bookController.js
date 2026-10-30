import { getAllBooks } from "../models/bookModel.js";

export const listBooks = async (req, res) => {
  try {
    const books = await getAllBooks();

    return res.status(200).json({ books });
  } catch (error) {
    console.error("Error loading books:", error);

    return res.status(500).json({
      message: "Unable to load books.",
    });
  }
};
