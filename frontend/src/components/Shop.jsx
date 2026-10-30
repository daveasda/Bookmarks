import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import BookSection from "./BookSection.jsx";
import Footer from "./Footer.jsx";
import { useBooks } from "../context/BookContext.jsx";

const filters = ["All", "Fiction", "Fantasy", "Dystopian", "Self Help"];

export default function Shop() {
  const { books, loading, error } = useBooks();
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  // Navbar sends searches to /books?search=your-keyword.
  const rawSearch = (searchParams.get("search") || "").trim();
  const searchTerm = rawSearch.toLowerCase();

  const filtered = books.filter((book) => {
    const matchesCategory =
      category === "All" ||
      book.genre?.toLowerCase() === category.toLowerCase();

    const matchesSearch =
      !searchTerm ||
      [book.title, book.author, book.genre, book.description, book.isbn].some(
        (value) => String(value ?? "").toLowerCase().includes(searchTerm)
      );

    return matchesCategory && matchesSearch;
  });

  const shown = [...filtered].sort((a, b) =>
    sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0
  );

  return (
    <div className="bm-editorial bm-shop">
      <Navbar />
      <main>
        <section className="bm-hero" aria-label="BookMarks shop">
          <img src="/shop.webp" alt="Explore the BookMarks collection" />
        </section>

        <header className="bm-shop-intro">
          <span className="bm-kicker">THE BOOKMARKS BOOKSHELF</span>
          <h1>
            {rawSearch ? `Search results for "${rawSearch}"` : "Browse our books"}
          </h1>
          <p>Explore our collection and find something worth turning the page for.</p>
        </header>

        <section className="bm-shop-catalog" aria-label="Browse books">
          <div className="bm-shop-toolbar">
            <div className="bm-filter-list" aria-label="Filter by genre">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={category === filter ? "bm-filter active" : "bm-filter"}
                  onClick={() => setCategory(filter)}
                  aria-pressed={category === filter}
                >
                  {filter === "All" ? "All books" : filter}
                </button>
              ))}
            </div>
            <label className="bm-sort">
              Sort by{" "}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </label>
          </div>

          {loading ? (
            <p className="bm-results">Loading books...</p>
          ) : error ? (
            <p className="bm-empty">Unable to load books: {error}</p>
          ) : (
            <>
              <p className="bm-results">
                {shown.length} {shown.length === 1 ? "book" : "books"}
              </p>
              {shown.length ? (
                <BookSection
                  title={rawSearch ? "Matching books" : category === "All" ? "All books" : category}
                  books={shown}
                />
              ) : (
                <p className="bm-empty">
                  {rawSearch
                    ? "No books found matching your search. Try another keyword or genre."
                    : "No books in this category yet. Try another genre."}
                </p>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
