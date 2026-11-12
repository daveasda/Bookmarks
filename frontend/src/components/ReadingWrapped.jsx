import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { API_URL } from "../config/api";

const YEAR = new Date().getFullYear();

export default function ReadingWrapped() {
  const [wrapped, setWrapped] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWrapped() {
      try {
        const response = await fetch(
          `${API_URL}/api/reading/wrapped?year=${YEAR}`,
          { credentials: "include" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load Wrapped."
          );
        }

        setWrapped(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWrapped();
  }, []);

  const booksRead = Number(wrapped?.books_read || 0);
  const goal = Number(wrapped?.reading_goal || 0);
  const progress = goal
    ? Math.min((booksRead / goal) * 100, 100)
    : 0;

  return (
    <>
      <Navbar />

      <main className="wrapped-page">
        <div className="wrapped-container">
          <header className="wrapped-header">
            <span className="wrapped-eyebrow">
              YOUR YEAR IN STORIES
            </span>

            <h1>BookMarks Wrapped {YEAR}</h1>

            <p>
              A look back at the stories, authors, and
              genres that shaped your reading year.
            </p>

            <Link
              to="/reading-tracker"
              className="wrapped-back-link"
            >
              ← Back to My Reading Tracker
            </Link>
          </header>

          {loading && (
            <p>Loading your reading Wrapped...</p>
          )}

          {error && (
            <p className="wrapped-error" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && wrapped && (
            <>
              <section className="wrapped-stats">
                <div className="wrapped-stat-card">
                  <span>BOOKS COMPLETED</span>
                  <strong>{booksRead}</strong>
                  <p>Stories finished this year</p>
                </div>

                <div className="wrapped-stat-card">
                  <span>AUTHORS EXPLORED</span>
                  <strong>{wrapped.authors_read}</strong>
                  <p>Different voices discovered</p>
                </div>

                <div className="wrapped-stat-card">
                  <span>GENRES EXPLORED</span>
                  <strong>{wrapped.genres_read}</strong>
                  <p>Different worlds visited</p>
                </div>
              </section>

              <section className="wrapped-goal-section">
                <div className="wrapped-section-heading">
                  <span className="wrapped-eyebrow">
                    THE READING CHALLENGE
                  </span>
                  <h2>Your Reading Goal</h2>
                </div>

                <div className="wrapped-goal-row">
                  <p>
                    {goal
                      ? `${booksRead} out of ${goal} books`
                      : "You haven't set a reading goal yet."}
                  </p>

                  <strong>
                    {goal ? `${Math.round(progress)}%` : "—"}
                  </strong>
                </div>

                <div className="wrapped-progress-track">
                  <div
                    className="wrapped-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="wrapped-goal-message">
                  {!goal
                    ? "Set your goal in My Reading Tracker."
                    : wrapped.goal_completed
                    ? "You did it! Your reading goal is complete."
                    : `${Math.max(goal - booksRead, 0)} more books to reach your goal.`}
                </p>
              </section>

              <section className="wrapped-ranking-section">
                <div className="wrapped-section-heading">
                  <span className="wrapped-eyebrow">
                    THE PEOPLE BEHIND THE PAGES
                  </span>
                  <h2>Your Top Authors</h2>
                  <p>
                    The writers you returned to most
                    this year.
                  </p>
                </div>

                {wrapped.top_authors?.length ? (
                  <div className="wrapped-ranking-list">
                    {wrapped.top_authors.map(
                      (author, index) => (
                        <div
                          className="wrapped-ranking-item"
                          key={author.author_id}
                        >
                          <span className="wrapped-rank">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="wrapped-ranking-name">
                            <h3>{author.name}</h3>
                            <p>
                              {author.books_read}{" "}
                              {Number(author.books_read) === 1
                                ? "book"
                                : "books"}{" "}
                              read
                            </p>
                          </div>

                          <div className="wrapped-ranking-bar">
                            <div
                              style={{
                                width: `${
                                  (Number(author.books_read) /
                                    Number(
                                      wrapped.top_authors[0].books_read
                                    )) * 100
                                }%`
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p>No completed books to rank yet.</p>
                )}
              </section>

              <section className="wrapped-ranking-section">
                <div className="wrapped-section-heading">
                  <span className="wrapped-eyebrow">
                    YOUR FAVORITE WORLDS
                  </span>
                  <h2>Your Top Genres</h2>
                  <p>
                    The kinds of stories you enjoyed
                    most this year.
                  </p>
                </div>

                {wrapped.top_genres?.length ? (
                  <div className="wrapped-ranking-list">
                    {wrapped.top_genres.map(
                      (genre, index) => (
                        <div
                          className="wrapped-ranking-item"
                          key={genre.genre_id}
                        >
                          <span className="wrapped-rank">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="wrapped-ranking-name">
                            <h3>{genre.name}</h3>
                            <p>
                              {genre.books_read}{" "}
                              {Number(genre.books_read) === 1
                                ? "book"
                                : "books"}{" "}
                              read
                            </p>
                          </div>

                          <div className="wrapped-ranking-bar">
                            <div
                              style={{
                                width: `${
                                  (Number(genre.books_read) /
                                    Number(
                                      wrapped.top_genres[0].books_read
                                    )) * 100
                                }%`
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p>No genres to rank yet.</p>
                )}
              </section>

              <footer className="wrapped-ending">
                <span className="wrapped-eyebrow">
                  THE STORY CONTINUES
                </span>

                <h2>Here's to your next chapter.</h2>

                <p>
                  Every book is a new adventure.
                  Keep turning the pages.
                </p>

                <Link to="/reading-tracker">
                  Continue My Reading Journey
                </Link>
              </footer>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
