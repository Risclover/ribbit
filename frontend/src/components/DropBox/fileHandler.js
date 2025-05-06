export const fileHandler = (setImage, setPreview) => {
  const handleUpload = (event) => {
    event.preventDefault();

    let file;
    if (event.dataTransfer && event.dataTransfer.files[0]) {
      file = event.dataTransfer.files[0]; // Drag-and-drop scenario
    } else if (event.target && event.target.files[0]) {
      file = event.target.files[0]; // File input scenario
    }
    if (!file) return;

    // 1. Store the file object in state (for uploading later).
    setImage(file);

    // 2. Generate a blob URL for local preview
    const blobUrl = URL.createObjectURL(file);
    setPreview(blobUrl);
  };

  return { handleUpload };
};
