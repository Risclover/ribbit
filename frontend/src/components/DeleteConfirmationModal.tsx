/* DeleteConfirmationModal.tsx — fixed */

import { useEffect, MouseEvent } from "react";
import "../assets/styles/Modals.css";

interface DeleteConfirmationModalProps {
  show: boolean;
  itemLabel: string;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteConfirmationModal({
  show,
  itemLabel,
  onClose,
  onDelete,
}: DeleteConfirmationModalProps): JSX.Element | null {
  const cancel = (e?: MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    onClose();
  };

  useEffect(() => {
    if (!show) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") cancel(e);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="modal-container"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="modal-content">
        <p id="delete-modal-title">
          Are you sure you want to delete this {itemLabel}? This action can’t be
          undone.
        </p>
      </div>

      <div className="modal-buttons">
        <button
          type="button"
          className="delete-modal-btn-left"
          onClick={cancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className="delete-modal-btn-right"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
