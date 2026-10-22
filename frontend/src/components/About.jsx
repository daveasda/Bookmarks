import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function About() {
  return (

    <main className="about-page">
    
        <Navbar />

      {/* Introduction */}
      <section className="about-hero">
        <p className="about-eyebrow">
          WELCOME TO BOOKMARKS
        </p>

        <h1>A Story Behind Every Page</h1>

        <p className="about-hero-text">
          Where stories begin, and imagination never ends.
          Discover a world of books, ideas, and inspiration.
        </p>
      </section>

      {/* Our Story */}
      <section className="about-story">
        <div className="about-story-image">
          <img
            src="/reading.svg"
            alt="A welcoming bookstore filled with books"
          />
        </div>

        <div className="about-story-content">
          <p className="about-eyebrow">
            WHO WE ARE
          </p>

          <h2>Our Story</h2>

          <div className="about-small-divider"></div>

          <p>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </p>

          <p>
            Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="about-philosophy">
        <p className="about-eyebrow">
          WHAT WE BELIEVE
        </p>

        <h2>More Than Just Books</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vivamus luctus urna sed
          urna ultricies ac tempor dui sagittis.
          In condimentum facilisis porta.
        </p>

        <div className="about-features">

          <div className="about-feature">
            <span className="about-feature-number">01</span>
            <h3>Discover</h3>
            <p>
              Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
              Integer posuere erat a ante.
            </p>
          </div>

          <div className="about-feature">
            <span className="about-feature-number">02</span>
            <h3>Connect</h3>
            <p>
              Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
              Integer posuere erat a ante.
            </p>
          </div>

          <div className="about-feature">
            <span className="about-feature-number">03</span>
            <h3>Inspire</h3>
            <p>
              Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
              Integer posuere erat a ante.
            </p>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <h2>Your Next Chapter Starts Here.</h2>

        <p>
          Every great story begins with a single page.
          Find the book that speaks to you.
        </p>

        <Link to="/books" className="about-shop-btn">
          Explore Our Books
        </Link>
      </section>

      <Footer />

    </main>
  );
}

export default About;
