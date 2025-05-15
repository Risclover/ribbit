import { useRef, useState, useLayoutEffect } from "react";
import "./SearchTabs.css";
import { SearchResultsNav } from "../SearchResults";

export function SearchTabs({ query, searchPage }) {
  const railRef = useRef(null); // the sliding strip
  const wrapRef = useRef(null); // the masked “viewport”

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  /* ───────── arrow-visibility logic ───────── */
  const updateArrows = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const maxScroll = wrap.scrollWidth - wrap.clientWidth; // right edge
    setShowLeft(wrap.scrollLeft > 0);
    setShowRight(wrap.scrollLeft < maxScroll - 1); // –1 avoids flicker
  };

  /* ───────── arrow click handlers ───────── */
  const page = () => wrapRef.current.clientWidth; // one “page”

  const slideLeft = () =>
    wrapRef.current.scrollBy({ left: -page(), behavior: "smooth" });

  const slideRight = () =>
    wrapRef.current.scrollBy({ left: page(), behavior: "smooth" });

  /* ───────── attach listeners once ───────── */
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    updateArrows(); // initial state
    wrap.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    return () => {
      wrap.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  /* ───────── render ───────── */
  return (
    <div className="tabs-wrapper" aria-label="Search categories">
      {showLeft && (
        <div className="searchtab-arrow-container left">
          <button
            className="searchtab-arrow left"
            onClick={slideLeft}
            aria-label="previous"
          >
            ‹
          </button>
        </div>
      )}

      <div className="tabs-window" ref={wrapRef}>
        <div className="tabs-rail" ref={railRef}>
          <SearchResultsNav query={query} searchPage={searchPage} />
        </div>
      </div>

      {showRight && (
        <div className="searchtab-arrow-container right">
          <button
            className="searchtab-arrow right"
            onClick={slideRight}
            aria-label="next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
