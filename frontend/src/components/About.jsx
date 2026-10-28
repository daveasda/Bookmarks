
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function About() {
  return (
    <div className="bm-editorial bm-about">
      <Navbar />

      <main>
        {/* TOP BANNER */}
        <section className="about-hero">
          <img
            src="/trunk.webp"
            alt="Uplifting stories and wonderful books"
          />
        </section>

        {/* OUR STORY */}
        <section className="about-story">
          <div className="about-story-art">
            <img
              src="/reading.svg"
              alt="A reader enjoying a book"
              loading="lazy"
            />
          </div>

          <div className="about-story-text">
            <span className="about-eyebrow">
              WHO WE ARE
            </span>

            <h1>Our Story</h1>

            <div className="about-accent-line" />

            <p>
              At BookMarks, we believe every great story
              deserves to be discovered. Our bookstore
              is a place for curious minds, lifelong
              readers, and anyone searching for their
              next favourite book.
            </p>

            <p>
              From unforgettable fiction to books that
              help you learn and grow, we want to make
              finding your next read simple, enjoyable,
              and inspiring.
            </p>

            <p className="about-story-quote">
              "Because every great story begins
              with a single page."
            </p>
          </div>
        </section>

        {/* FULL WIDTH READING BANNER */}
        {/* <section className="about-wide-banner">
          <img
            src="/about-2.jpg"
            alt="Books are a window to the world"
            loading="lazy"
          />
        </section> */}

        {/* OUR VALUES */}
        <section className="about-values">
          <div className="about-values-intro">
            <span className="about-eyebrow">
              WHAT WE BELIEVE
            </span>

            <h2>More Than Just Books</h2>

            <p>
              Reading is about more than turning pages.
              It's about exploring ideas, connecting
              with others, and discovering new perspectives.
            </p>
          </div>

          <div className="about-values-grid">
            <article className="about-value-card">
              <span className="about-value-number">01</span>
              <h3>Discover</h3>
              <p>
                Find stories, ideas, and authors that
                spark your curiosity.
              </p>
            </article>

            <article className="about-value-card">
              <span className="about-value-number">02</span>
              <h3>Connect</h3>
              <p>
                Share the joy of reading and feel
                part of a community of book lovers.
              </p>
            </article>

            <article className="about-value-card">
              <span className="about-value-number">03</span>
              <h3>Inspire</h3>
              <p>
                Let every new book open the door
                to a different way of seeing the world.
              </p>
            </article>
          </div>
        </section>

        {/* ADVENTURE FEATURE */}
        <section className="about-adventure">
          <img
            src="/banner.webp"
            alt="A fantasy landscape with a dragon and castle"
            loading="lazy"
          />
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="about-final">
          <span className="about-eyebrow">
            YOUR NEXT ADVENTURE AWAITS
          </span>

          <h2>Your Next Chapter Starts Here.</h2>

          <p>
            Every great story begins with a single page.
            Find the book that speaks to you.
          </p>

          <Link to="/books" className="about-shop-button">
            Explore Our Books
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
