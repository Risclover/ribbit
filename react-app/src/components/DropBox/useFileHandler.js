export const useFileHandler = (
  setImage,
  setPreview,
  setShowBar,
  showBar,
  handlePreview
) => {
  const handleUpload = (event) => {
    const file = event.target.files[0] || event.dataTransfer.files[0];
    if (!file) {
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      const fileRes = btoa(reader.result);
      setPreview(`data:image/jpg;base64,${fileRes}`);
      setShowBar(true);
      handlePreview();
      console.log("showBar:", showBar);
    };

    reader.onerror = () => {
      console.log("There is a problem while uploading...");
    };
  };

  return { handleUpload };
};
