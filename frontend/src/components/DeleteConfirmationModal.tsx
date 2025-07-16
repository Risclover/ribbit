import "../assets/styles/Modals.css";

export function DeleteConfirmationModal({
  setShowDeleteModal,
  showDeleteModal,
  handleDelete,
  item,
}) {
  const handleCancelClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowDeleteModal(false);
  };

  return (
    <>
      {showDeleteModal && (
        <div className="modal-container">
          <div className="modal-content ">
            Are you sure you want to delete this {item}? This action can't be
            undone.
          </div>
          <div className="modal-buttons">
            <button
              aria-label="Cancel"
              className="delete-modal-btn-left"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              aria-label="Delete"
              className="delete-modal-btn-right"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
