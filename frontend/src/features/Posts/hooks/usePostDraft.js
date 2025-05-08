import { useCallback, useEffect, useState } from "react";

/**
 * Persist the post-creation draft in sessionStorage so it survives
 * route changes (e.g. /submit  ⇆  /c/:community/submit) and refreshes.
 *
 *   const { draft, updateDraft, clearDraft } = usePostDraft();
 *   updateDraft("title", "Hello world");
 */
export function usePostDraft() {
  const STORAGE_KEY = "ribbit_post_draft";

  // ---------- helpers ----------
  const safeParse = (json) => {
    if (!json) return {}; // <-- new guard
    try {
      const parsed = JSON.parse(json);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  };

  // ---------- state ----------
  const [draft, setDraft] = useState(() =>
    safeParse(sessionStorage.getItem(STORAGE_KEY))
  );

  // ---------- persistence ----------
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  // ---------- api ----------
  const updateDraft = useCallback((field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }, []);

  const clearDraft = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setDraft({});
  }, []);

  return { draft, updateDraft, clearDraft };
}
