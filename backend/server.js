import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow React frontend to communicate with backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Read JSON data sent from frontend
app.use(express.json());

// Read authentication cookies
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "BookMarks backend is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});