import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useFocusTrap, useScrollLock } from "@/hooks";
import "./ModalContext.css";

/* ─── Context & Provider ───────────────────────────── */

export const ModalContext = createContext<HTMLElement | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalNode(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={portalNode}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

/* ─── Modal component ─────────────────────────────── */

interface ModalProps {
  onClose: () => void; // click-outside or ✕ button
  close: () => void; // callback used by useFocusTrap (Esc key)
  open: boolean;
  title?: string;
  children: ReactNode;
}

export function Modal({
  onClose,
  close,
  children,
  title,
  open,
}: ModalProps): JSX.Element | null {
  useScrollLock(open);

  const modalNode = useContext(ModalContext);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // ✅ pass the boolean `open`, not the callback
  useFocusTrap(open, wrapperRef);

  if (!modalNode || !open) return null;

  return createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />

      <div id="modal-content" ref={wrapperRef}>
        <div id="modal-topbar">
          {title && <h1 className="auth-modal-title">{title}</h1>}
          <button
            type="button"
            className="modal-close-btn"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {children}
      </div>
    </div>,
    modalNode
  );
}
