// src/pages/NotFound.tsx
import { MouseEvent, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ribbitLogos } from "@/assets";
import { usePageSettings } from "@/hooks";

/** 404 – Page-not-found screen (React-Router v5) */
export function NotFound(): JSX.Element {
  const history = useHistory();

  /* update <title> and breadcrumb */
  usePageSettings({
    documentTitle: "PAGE NOT FOUND",
    pageTitle: "PAGE NOT FOUND",
    icon: null,
  });

  /* memoised so the component never re-renders on the same fn ref */
  const handleBack = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      history.goBack();
    },
    [history]
  );

  return (
    <main className="not-found-page" aria-labelledby="nf-title">
      <img
        src={ribbitLogos.angry}
        alt="Angry frog logo"
        className="not-found-img"
      />

      <section className="not-found-page-p">
        <h1 id="nf-title" className="sr-only">
          Page not found
        </h1>
        <p>Page not found.</p>
        <p>The page you requested does not exist.</p>

        <button type="button" className="blue-btn-filled" onClick={handleBack}>
          Go Back ↩︎
        </button>
      </section>
    </main>
  );
}
