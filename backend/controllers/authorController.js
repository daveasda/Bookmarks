import {
  getAuthorById,
  getBooksByAuthorId,
  searchAuthors,
} from "../models/authorModel.js";

export const getAuthorDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Make sure the ID is a positive whole number
    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        message: "Invalid author ID.",
      });
    }

    const author = await getAuthorById(id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found.",
      });
    }

    const books = await getBooksByAuthorId(id);

    return res.status(200).json({
      author,
      books,
    });
  } catch (error) {
    console.error("Error loading author details:", error);

    return res.status(500).json({
      message: "Unable to load author details.",
    });
  }
};


export const searchAuthorResults = async (req, res) => {
  try {
    // Get the search keyword from the URL
    const searchTerm = String(req.query.q || "").trim();

    // Return an empty list if no keyword was entered
    if (!searchTerm) {
      return res.status(200).json({
        authors: [],
      });
    }

    // Search the PostgreSQL database
    const authors = await searchAuthors(searchTerm);

    // Send matching authors back to the frontend
    return res.status(200).json({
      authors,
    });

  } catch (error) {
    console.error("Error searching authors:", error);

    return res.status(500).json({
      message: "Unable to search authors.",
    });
  }
};
