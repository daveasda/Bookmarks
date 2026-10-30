import { useState } from "react";
import Navbar from "./Navbar.jsx";
import BookSection from "./BookSection.jsx";
import Footer from "./Footer.jsx";
import { useBooks } from "../context/BookContext.jsx";

const filters = ["All", "Fiction", "Fantasy", "Dystopian", "Self Help"];
export default function Shop() {
  const { books, loading, error } = useBooks();
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const filtered = books.filter((book) => category === "All" || book.genre?.toLowerCase() === category.toLowerCase());
  const shown = [...filtered].sort((a,b) => sort === "low" ? a.price-b.price : sort === "high" ? b.price-a.price : 0);
  return (
    <div className="bm-editorial bm-shop">
      <Navbar />
      <main>
        <section className="bm-hero" aria-label="BookMarks shop"><img src="/shop.webp" alt="Explore the BookMarks collection" /></section>
        <header className="bm-shop-intro"><span className="bm-kicker">THE BOOKMARKS BOOKSHELF</span><h1>Browse our books</h1><p>Explore our collection and find something worth turning the page for.</p></header>
        <section className="bm-shop-catalog" aria-label="Browse books">
          <div className="bm-shop-toolbar"><div className="bm-filter-list" aria-label="Filter by genre">{filters.map(f => <button key={f} type="button" className={category===f?"bm-filter active":"bm-filter"} onClick={()=>setCategory(f)} aria-pressed={category===f}>{f === "All" ? "All books" : f}</button>)}</div><label className="bm-sort">Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
          <p className="bm-results">{shown.length} {shown.length===1?"book":"books"}</p>
          {shown.length ? <BookSection title={category === "All" ? "All books" : category} books={shown} /> : <p className="bm-empty">No books in this category yet. Try another genre.</p>}
        </section>
      </main>
      <Footer />
    </div>
  );
}
