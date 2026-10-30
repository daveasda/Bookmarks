import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import BookSection from "./BookSection.jsx";
import Footer from "./Footer.jsx";
import { useBooks } from "../context/BookContext.jsx";

export default function Home() {
  const { books, loading, error } = useBooks();

  return (
    <div className="bm-editorial bm-home">
      <Navbar />

      <main>
        {/* MAIN FEATURED BANNER */}
        <section className="home-featured-banner">
          <Link to="/books" aria-label="Explore featured books">
            <img
              src="/books.webp"
              alt="Book Banner"
            />
          </Link>
        </section>

        {/* INTRODUCTION */}
        <section className="home-welcome">
          <span className="home-eyebrow">
            YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h1>Discover your next great read.</h1>

          <p>
            Stories to get lost in. Ideas to live by.
            Books you'll want to keep forever.
          </p>

          <Link to="/books" className="home-primary-link">
            Shop all books
          </Link>
        </section>

        {/* EDITORIAL READING BANNER */}
        <section className="home-reading-banner">
          <Link to="/books" aria-label="Discover more books">
            <img
              src="/conspiracy.webp"
              alt="Books open a window to the world"
              loading="lazy"
            />
          </Link>
        </section>

        {/* BESTSELLERS */}
        <section className="home-shelf">
          <div className="home-shelf-heading">
            <div>
              <span className="home-eyebrow">
                READER FAVORITES
              </span>
              <h2>Bestsellers</h2>
            </div>

            <Link to="/books" className="home-view-all">
              View all books
            </Link>
          </div>

          <BookSection
            title="Popular on our shelves"
            books={books.slice(20, 25)}
          />
        </section>

        {/* EDITORIAL READING BANNER */}
        <section className="home-reading-banner">
          <Link to="/books" aria-label="Discover more books">
            <img
              src="/calamity.webp"
              alt="Books open a window to the world"
              loading="lazy"
            />
          </Link>
        </section>

        {/* CURATED COLLECTION */}
        <section className="home-shelf">
          <div className="home-shelf-heading">
            <div>
              <span className="home-eyebrow">
                HANDPICKED FOR YOU
              </span>
              <h2>Discover something wonderful</h2>
            </div>

            <Link to="/books" className="home-view-all">
              Explore the collection
            </Link>
          </div>

          <BookSection
            title="Explore our bookshelf"
            books={books.slice(15, 20)}
          />
        </section>

        {/* FICTION PROMOTION */}
        <section className="home-feature-story">
          <div className="home-feature-story-image">
            <img
              src="/try.webp"
              alt="A selection of featured fiction books"
              loading="lazy"
            />
          </div>

          <div className="home-feature-story-content">
            <span className="home-eyebrow">
              STORIES WORTH SHARING
            </span>

            <h2>Fiction that stays with you.</h2>

            <p>
              From unforgettable characters to
              extraordinary worlds, discover stories
              that make every page count.
            </p>

            <Link to="/books" className="home-primary-link">
              Explore fiction
            </Link>
          </div>
        </section>

        {/* MORE BOOKS */}
        <section className="home-shelf">
          <div className="home-shelf-heading">
            <div>
              <span className="home-eyebrow">
                KEEP EXPLORING
              </span>
              <h2>More books to love</h2>
            </div>

            <Link to="/books" className="home-view-all">
              Shop the collection
            </Link>
          </div>

          {/* LITERARY SPOTLIGHT */}
          <section className="home-literary-feature">
            <div className="home-literary-content">
              <span className="home-eyebrow">
                THE BOOKMARKS SPOTLIGHT
              </span>

              <h2>A story worth getting lost in.</h2>

              <p>
                Discover captivating fiction, unforgettable
                characters, and stories that stay with you
                long after the final page.
              </p>

              <Link to="/shop" className="home-primary-link">
                Explore fiction
              </Link>
            </div>

            <div className="home-literary-art">
              <img
                src="/peck.jpg"
                alt="Peck and Peck featured novel"
                loading="lazy"
              />
            </div>
          </section>
          <BookSection
            title="More to discover"
            books={books.slice(10, 15)}
          />
        </section>

        
        {/* FEATURED BOOK COLLECTION */}
        <section className="home-featured-collection">

          {/* LEFT: PROMOTIONAL CONTENT */}
          <div className="home-featured-info">

            <span className="home-eyebrow">
              THE BOOKMARKS EDIT
            </span>

            <h2>Stories worth discovering</h2>

            <p>
              Discover unforgettable characters, captivating
              stories, and your next favorite read.
              Explore our carefully selected collection.
            </p>

            <Link to="/shop" className="home-featured-link">
              Explore all books →
            </Link>

          </div>

          {/* RIGHT: BOOK COLLECTION */}
          <div className="home-featured-books">

            <BookSection
              title="Featured Books"
              books={books.slice(0, 4)}
            />

          </div>

        </section>

        {/* FANTASY SPOTLIGHT */}
        <section className="home-fantasy-feature">
          <div className="home-fantasy-art">
            <img
              src="/sarah.jfif"
              alt="Sarah J. Maas fantasy book promotion"
              loading="lazy"
            />
          </div>

          <div className="home-fantasy-content">
            <span className="home-eyebrow">
              ESCAPE INTO ANOTHER WORLD
            </span>

            <h2>Where magic meets imagination.</h2>

            <p>
              Discover enchanting worlds, extraordinary
              adventures, and the stories that make
              fantasy impossible to put down.
            </p>

            <Link to="/shop" className="home-fantasy-button">
              Explore fantasy
            </Link>
          </div>
        </section>
        {/* EDITORIAL READING BANNER */}
        <section className="home-reading-banner">
          <Link to="/books" aria-label="Discover more books">
            <img
              src="/dinosaur.webp"
              alt="Books open a window to the world"
              loading="lazy"
            />
          </Link>
        </section>


        {/* FINAL SHOPPING INVITATION */}
        <section className="home-final-cta">
          <span className="home-eyebrow">
            THE BOOKMARKS BOOKSHELF
          </span>

          <h2>A good book is always a good idea.</h2>

          <p>
            Find the stories, authors, and ideas
            you'll come back to again and again.
          </p>

          <Link to="/books" className="home-primary-link">
            Browse all books
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
