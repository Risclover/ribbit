import { createContext, useState, useContext, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "@/hooks";
import "./AuthModalContext.css";

const AuthModalContext = createContext<HTMLElement | null>(null);
export const useAuthModalNode = () => useContext(AuthModalContext);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [modalNode, setModalNode] = useState<HTMLElement | null>(null);

  return (
    <>
      <AuthModalContext.Provider value={modalNode}>
        {children}
      </AuthModalContext.Provider>
      <div ref={setModalNode} />
    </>
  );
}

interface AuthModalProps {
  active: boolean;
  onClose: () => void;
  formType?: string; // null | 'login' | 'signup' | 'protected' …
  children: ReactNode;
}

/**
 * AuthModal: The modal in which the auth forms (login and signup) live; includes clickable background behind modal
 * - `active` determines if the modal is displayed.
 * - `onClose` is a function to close the modal (click background or close button).
 */
export function AuthModal({
  active,
  onClose,
  formType,
  children,
}: AuthModalProps) {
  const modalNode = useAuthModalNode();
  useScrollLock(active);
  if (!modalNode) return null;

  return createPortal(
    active ? (
      <div className="auth-modal">
        <div
          className="auth-modal-background"
          onClick={() => formType !== "protected" && onClose()}
        />
        <div className="auth-modal-content">{children}</div>
      </div>
    ) : null,
    modalNode
  );
}
