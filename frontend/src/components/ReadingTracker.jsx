
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { API_URL } from "../config/api";

const CURRENT_YEAR = new Date().getFullYear();

const SHELVES = [
  { key: "want_to_read", label: "TBR" },
  { key: "currently_reading", label: "Current Reads" },
  { key: "read", label: "Read" },
];

export default function ReadingTracker() {
  const [books, setBooks] = useState([]);
  const [goal, setGoal] = useState(null);
  const [target, setTarget] = useState("");
  const [activeShelf, setActiveShelf] = useState("want_to_read");

  const [loading, setLoading] = useState(true);
  const [savingGoal, setSavingGoal] = useState(false);
  const [busyBook, setBusyBook] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadTracker = useCallback(async () => {
    try {
      setError("");

      const [shelvesResponse, goalResponse] = await Promise.all([
        fetch(`${API_URL}/api/reading/shelves`, {
          credentials: "include",
        }),
        fetch(`${API_URL}/api/reading/goal?year=${CURRENT_YEAR}`, {
          credentials: "include",
        }),
      ]);

      const shelvesData = await shelvesResponse.json();
      const goalData = await goalResponse.json();

      if (!shelvesResponse.ok) {
        throw new Error(
          shelvesData.message || "Unable to load shelves."
        );
      }

      if (!goalResponse.ok) {
        throw new Error(
          goalData.message || "Unable to load reading goal."
        );
      }

      setBooks(shelvesData.books || []);
      setGoal(goalData);
      setTarget(goalData.goal?.target_books?.toString() || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTracker();
  }, [loadTracker]);

  async function saveGoal(event) {
    event.preventDefault();

    const number = Number(target);

    if (
      !Number.isInteger(number) ||
      number < 1 ||
      number > 10000
    ) {
      setError("Enter a goal between 1 and 10,000 books.");
      return;
    }

    setSavingGoal(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`${API_URL}/api/reading/goal`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: CURRENT_YEAR,
          target_books: number,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save goal."
        );
      }

      setNotice("Your reading goal has been saved!");
      await loadTracker();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingGoal(false);
    }
  }

  async function moveBook(bookId, shelf) {
    setBusyBook(bookId);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `${API_URL}/api/reading/shelves/${bookId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shelf }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to move book."
        );
      }

      setNotice("Book moved successfully!");
      await loadTracker();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyBook(null);
    }
  }

  async function removeBook(bookId) {
    setBusyBook(bookId);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `${API_URL}/api/reading/shelves/${bookId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to remove book."
        );
      }

      setNotice("Book removed from your shelves.");
      await loadTracker();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyBook(null);
    }
  }

  const shelfBooks = books.filter(
    (book) => book.shelf === activeShelf
  );

  const completed = goal?.completed || 0;
  const goalTarget = goal?.goal?.target_books || 0;

  const percentage = goalTarget
    ? Math.min((completed / goalTarget) * 100, 100)
    : 0;

  return (
    <>
      <Navbar />

      <main className="reading-page">
        <div className="reading-container">

          {/* WELCOME HEADER */}

          <div className="reading-header">
            <div>
              <span className="reading-eyebrow">
                YOUR PERSONAL LIBRARY
              </span>

              <h1>My Reading Tracker</h1>

              <p>
                Every great story deserves a place on your shelf.
              </p>
            </div>

            <Link
              to="/reading-wrapped"
              className="reading-wrapped-btn"
            >
              ✨ View My Wrapped
            </Link>

            {/* Decorative book stack */}
            <img
              src="/images/reading-books.png"
              alt=""
              aria-hidden="true"
              className="reading-header-illustration"
            />
          </div>

          {/* MESSAGES */}

          {error && (
            <p className="reading-error" role="alert">
              {error}
            </p>
          )}

          {notice && (
            <p className="reading-success" role="status">
              {notice}
            </p>
          )}

          {loading ? (
            <p>Loading your reading tracker...</p>
          ) : (
            <>

              {/* READING GOAL */}

              <section className="reading-goal-card">

                <div className="reading-goal-heading">
                  <div>
                    <span className="reading-eyebrow">
                      {CURRENT_YEAR} READING CHALLENGE
                    </span>

                    <h2>Your Reading Goal</h2>

                    <p>
                      {goalTarget
                        ? `${completed} of ${goalTarget} books completed`
                        : "Set a goal to start your reading journey."}
                    </p>
                  </div>

                  <div className="reading-goal-number">
                    {completed}
                    <span>/{goalTarget || "—"}</span>
                  </div>
                </div>

                <div
                  className="reading-progress-track"
                  role="progressbar"
                  aria-valuenow={completed}
                  aria-valuemin={0}
                  aria-valuemax={goalTarget || 1}
                >
                  <div
                    className="reading-progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <p className="reading-progress-caption">
                  {goalTarget
                    ? completed >= goalTarget
                      ? "Amazing! You've reached your goal!"
                      : `${Math.max(
                          goalTarget - completed,
                          0
                        )} books to go!`
                    : "Your reading challenge starts here."}
                </p>

                <form
                  className="reading-goal-form"
                  onSubmit={saveGoal}
                >
                  <label htmlFor="reading-target">
                    My goal for {CURRENT_YEAR}
                  </label>

                  <input
                    id="reading-target"
                    type="number"
                    min="1"
                    max="10000"
                    value={target}
                    onChange={(event) =>
                      setTarget(event.target.value)
                    }
                    placeholder="e.g. 20"
                    required
                  />

                  <button
                    type="submit"
                    disabled={savingGoal}
                  >
                    {savingGoal
                      ? "Saving..."
                      : goalTarget
                      ? "Update Goal"
                      : "Set Goal"}
                  </button>
                </form>
              </section>

              {/* BOOKSHELVES */}

              <section className="reading-shelves-section">
                <div className="reading-section-heading">
                  <h2>My Bookshelves</h2>

                  <p>
                    Keep track of every book on your reading journey.
                  </p>
                </div>

                {/* Shelf tabs */}

                <div
                  className="reading-shelf-tabs"
                  role="group"
                  aria-label="Choose a bookshelf"
                >
                  {SHELVES.map((shelf) => {
                    const count = books.filter(
                      (book) => book.shelf === shelf.key
                    ).length;

                    return (
                      <button
                        key={shelf.key}
                        type="button"
                        className={
                          activeShelf === shelf.key
                            ? "reading-tab active"
                            : "reading-tab"
                        }
                        onClick={() =>
                          setActiveShelf(shelf.key)
                        }
                        aria-pressed={
                          activeShelf === shelf.key
                        }
                      >
                        {shelf.label}
                        <span>{count}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Empty shelf */}

                {shelfBooks.length === 0 ? (
                  <div className="reading-empty-state">
                    <span aria-hidden="true">📖</span>

                    <h3>This shelf is waiting for a story.</h3>

                    <p>
                      Browse our collection and add books
                      to your reading tracker.
                    </p>

                    <Link to="/shop">
                      Explore Books
                    </Link>
                  </div>
                ) : (

                  /* Books grid */

                  <div className="reading-book-grid">
                    {shelfBooks.map((book) => (
                      <article
                        key={book.tracker_id}
                        className="reading-book-card"
                      >
                        <div className="reading-book-cover">
                          {book.cover_url ? (
                            <img
                              src={
                                book.cover_url.startsWith("http")
                                  ? book.cover_url
                                  : `${API_URL}${book.cover_url}`
                              }
                              alt={book.title}
                            />
                          ) : (
                            <div className="reading-no-cover">
                              No cover
                            </div>
                          )}
                        </div>

                        <div className="reading-book-info">
                          <h3>{book.title}</h3>

                          <p>
                            {book.author_name || "Unknown author"}
                          </p>

                          {book.genre_name && (
                            <span className="reading-genre">
                              {book.genre_name}
                            </span>
                          )}

                          <label
                            htmlFor={`shelf-${book.book_id}`}
                          >
                            Move to
                          </label>

                          <select
                            id={`shelf-${book.book_id}`}
                            value={book.shelf}
                            disabled={
                              busyBook === book.book_id
                            }
                            onChange={(event) =>
                              moveBook(
                                book.book_id,
                                event.target.value
                              )
                            }
                          >
                            {SHELVES.map((shelf) => (
                              <option
                                key={shelf.key}
                                value={shelf.key}
                              >
                                {shelf.label}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            className="reading-remove-btn"
                            disabled={
                              busyBook === book.book_id
                            }
                            onClick={() =>
                              removeBook(book.book_id)
                            }
                          >
                            Remove from Shelf
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
