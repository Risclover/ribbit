import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { CgNotes } from "react-icons/cg";
import { SinglePostKarmabar } from "@/features";
import { bootstrapPostModal, useAppDispatch } from "@/store";
import { PostPopup } from "@/components";
import { useFocusTrap, useScrollLock } from "@/hooks";
import "./PostModalContext.css";
import { PostVoter, Post } from "@/types";

/* ──────────────────────────────── Types ──────────────────────────────── */
interface ProviderProps {
  children: ReactNode;
}

interface ModalProps {
  post: Post;
  onClose(): void;
  format?: "full" | "compact";
}

/* ───────────── Portal target via context ───────────── */
const PostModalContext = createContext<HTMLElement | null>(null);

export function PostModalProvider({ children }: ProviderProps) {
  const [node, setNode] = useState<HTMLElement | null>(
    () => document.getElementById("modal-root") as HTMLElement | null
  );

  useEffect(() => {
    if (node) return;

    const el = document.createElement("div");
    el.id = "modal-root";
    document.body.appendChild(el);
    setNode(el);

    return () => void document.body.removeChild(el);
  }, [node]);

  return (
    <PostModalContext.Provider value={node}>
      {children}
    </PostModalContext.Provider>
  );
}

/* ───────────────────────────── Modal ───────────────────────────── */
export function PostModal({
  post,
  onClose,
  format = "full",
}: ModalProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const portalNode = useContext(PostModalContext);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useScrollLock(true);
  useFocusTrap(true, wrapperRef);

  /* Fetch / hydrate once */
  useEffect(() => {
    dispatch(bootstrapPostModal(post.id));
  }, [dispatch, post.id]);

  const stopPropagation = useCallback(
    (e: ReactMouseEvent | KeyboardEvent) => e.stopPropagation(),
    []
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  if (!portalNode) return null;

  return createPortal(
    <div
      className="post-modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <section
        ref={wrapperRef}
        className="post-modal"
        onClick={stopPropagation}
      >
        {/* Header */}
        <header className="post-modal__header">
          <div className="post-modal__vote">
            <SinglePostKarmabar post={post} format={format} />
          </div>
          <CgNotes className="post-modal__icon" aria-hidden="true" />
          <h2 className="post-modal__title">{post.title}</h2>
          <button
            type="button"
            className="post-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        {/* Body */}
        <section className="post-modal__content">
          {/* post now satisfies the required `community` field */}
          <PostPopup post={post} />
        </section>
      </section>
    </div>,
    portalNode
  );
}
