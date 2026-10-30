
import express from "express";

import {
  getAuthorDetails,
  searchAuthorResults,
} from "../controllers/authorController.js";

const router = express.Router();

// Search authors by name
router.get("/search", searchAuthorResults);

// Get an individual author's details
router.get("/:id", getAuthorDetails);

export default router;
