import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { API_URL } from "../config/api";

const YEAR = new Date().getFullYear();
const count = (value) => Number(value || 0);

function AnimatedNumber({ value, suffix = "" }) {
  const target = count(value);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }
    let frame;
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min((now - start) / 1200, 1);
      setDisplay(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{display.toLocaleString()}{suffix}</>;
}

function Ranking({ items = [], title, eyebrow, description, type }) {
  const max = Math.max(1, ...items.map((item) => count(item.books_read)));
  return (
    <section className={`bw-ranking bw-ranking-${type}`}>
      <div className="bw-section-heading">
        <span className="bw-kicker">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {items.length ? (
        <div className="bw-rank-grid">
          {items.map((item, index) => (
            <div className="bw-rank-card" key={`${type}-${item.author_id ?? item.genre_id ?? index}`} style={{ "--rank-delay": `${index * 90}ms` }}>
              <div className="bw-rank-top"><span>#{String(index + 1).padStart(2, "0")}</span><span className="bw-rank-symbol" aria-hidden="true">{type === "authors" ? "✦" : "✳"}</span></div>
              <h3>{item.name}</h3>
              <p>{count(item.books_read)} {count(item.books_read) === 1 ? "book" : "books"} read</p>
              <div className="bw-rank-track"><div style={{ width: `${Math.max(0, Math.min(100, (count(item.books_read) / max) * 100))}%` }} /></div>
            </div>
          ))}
        </div>
      ) : <p className="bw-empty">Your next great read could start this list.</p>}
    </section>
  );
}

export default function ReadingWrapped() {
  const [wrapped, setWrapped] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadWrapped() {
      try {
        const response = await fetch(`${API_URL}/api/reading/wrapped?year=${YEAR}`, { credentials: "include" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to load Wrapped.");
        if (active) setWrapped(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadWrapped();
    return () => { active = false; };
  }, []);

  const booksRead = count(wrapped?.books_read);
  const goal = count(wrapped?.reading_goal);
  const progress = goal ? Math.min((booksRead / goal) * 100, 100) : 0;
  const topAuthor = wrapped?.top_authors?.[0]?.name;
  const topGenre = wrapped?.top_genres?.[0]?.name;

  return (
    <>
      <Navbar />
      <main className="bw-page">
        <div className="bw-shell">
          <div className="bw-topline"><span>✳ BOOKMARKS PRESENTS</span><Link to="/reading-tracker">← Back to My Reading Tracker</Link></div>
          {loading && <div className="bw-status" role="status">Gathering the stories that made your year…</div>}
          {error && <div className="bw-status bw-error" role="alert">{error}</div>}
          {!loading && !error && wrapped && (
            <>
              <section className="bw-hero">
                <div className="bw-hero-orbit bw-orbit-one" aria-hidden="true" /><div className="bw-hero-orbit bw-orbit-two" aria-hidden="true" />
                <div className="bw-hero-content">
                  <span className="bw-hero-tag">THE YEAR YOU TURNED THE PAGE</span>
                  <h1>YOUR <em>READING</em><br />YEAR, <span>REWRITTEN.</span></h1>
                  <p>All the plot twists, favorite characters, and worlds you escaped into. This was your {YEAR}.</p>
                  <a className="bw-hero-button" href="#bw-numbers">Unwrap your year <span aria-hidden="true">↓</span></a>
                </div>
                <div className="bw-hero-art" aria-hidden="true"><div className="bw-art-sun">✳</div><div className="bw-art-book bw-book-back" /><div className="bw-art-book bw-book-front"><span>THE<br />STORY<br />OF<br />{YEAR}</span><b>✦</b></div><div className="bw-art-star">✦</div></div>
                <div className="bw-hero-bottom">A YEAR IN STORIES <span>01 / 05</span></div>
              </section>

              <section className="bw-numbers" id="bw-numbers">
                <div className="bw-section-heading bw-centered"><span className="bw-kicker">CHAPTER ONE · THE BIG PICTURE</span><h2>You showed up for the stories.</h2><p>And the numbers tell their own kind of magic.</p></div>
                <div className="bw-stat-grid">
                  <article className="bw-stat bw-stat-lime"><span className="bw-stat-icon" aria-hidden="true">✳</span><span className="bw-stat-label">BOOKS COMPLETED</span><strong><AnimatedNumber value={booksRead} /></strong><p>Entire worlds, cover to cover.</p></article>
                  <article className="bw-stat bw-stat-lavender"><span className="bw-stat-icon" aria-hidden="true">✦</span><span className="bw-stat-label">AUTHORS EXPLORED</span><strong><AnimatedNumber value={wrapped.authors_read} /></strong><p>Voices that stayed with you.</p></article>
                  <article className="bw-stat bw-stat-orange"><span className="bw-stat-icon" aria-hidden="true">✺</span><span className="bw-stat-label">GENRES EXPLORED</span><strong><AnimatedNumber value={wrapped.genres_read} /></strong><p>Different universes unlocked.</p></article>
                </div>
              </section>

              <section className="bw-goal">
                <div className="bw-goal-copy"><span className="bw-kicker">CHAPTER TWO · THE CHALLENGE</span><h2>Look how far<br /><em>you've come.</em></h2><p>{goal ? `${booksRead} out of ${goal} books on your reading journey.` : "Every story begins with a first page. Set a goal in your Reading Tracker."}</p><div className="bw-goal-note">{!goal ? "Your next chapter is waiting." : wrapped.goal_completed ? "✦ Goal achieved. You absolute legend!" : `${Math.max(goal - booksRead, 0)} more books until you hit your goal.`}</div></div>
                <div className="bw-goal-visual"><div className="bw-goal-circle" style={{ "--bw-progress": `${progress}%` }}><div className="bw-goal-circle-inner"><strong><AnimatedNumber value={Math.round(progress)} suffix="%" /></strong><span>GOAL COMPLETE</span></div></div><span className="bw-goal-sparkle" aria-hidden="true">✳</span></div>
              </section>

              <div className="bw-rankings">
                <Ranking type="authors" items={wrapped.top_authors || []} eyebrow="CHAPTER THREE · YOUR FAVORITE VOICES" title="The authors you couldn't put down." description={topAuthor ? `You kept coming back to ${topAuthor}. Here are the writers who defined your year.` : "Every favorite author starts with one book."} />
                <Ranking type="genres" items={wrapped.top_genres || []} eyebrow="CHAPTER FOUR · YOUR READING DNA" title="Your kind of plot twist." description={topGenre ? `${topGenre} led the way. Here's where your imagination traveled.` : "Your favorite genres will find their way here."} />
              </div>

              <section className="bw-finale"><span className="bw-finale-star" aria-hidden="true">✳</span><span className="bw-kicker">THE FINAL CHAPTER · FOR NOW</span><h2>THE BEST STORIES<br /><em>AREN'T OVER YET.</em></h2><p>{booksRead ? `You finished ${booksRead} ${booksRead === 1 ? "book" : "books"} in ${YEAR}. Imagine what the next chapter holds.` : `Your ${YEAR} story is just beginning.`}</p><Link to="/reading-tracker" className="bw-finale-link">Continue my reading journey <span aria-hidden="true">↗</span></Link><span className="bw-finale-foot">MADE FOR THE LOVE OF READING · BOOKMARKS {YEAR}</span></section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
