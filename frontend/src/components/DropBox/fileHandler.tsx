type Setter<T> = (v: T) => void;

interface FileHandlerOptions {
  accept?: string; // e.g. "image/*"
  devWarn?: boolean; // console.warn on reject
}

/**
 * Handler for file uploaded in DropBox
 *
 * @param setImage - Setter for image uploaded
 * @param setPreview - Setter for preview of image uploaded
 *
 * @example
 * fileHandler(
 *  setImage: setImage,
 *  setPreview: setPreview
 * )
 */
export const fileHandler = (
  setImage: Setter<File | null>,
  setPreview: Setter<string>,
  { accept = "image/*", devWarn = true }: FileHandlerOptions = {}
) => {
  // Lives for the lifetime of this handler (we memoize it in DropBox)
  let currentUrl = null;

  const extractFile = (e: any) => {
    if (e?.dataTransfer?.files?.[0]) return e.dataTransfer.files[0];
    if (e?.target?.files?.[0]) return e.target.files[0];
    return null;
  };

  const handleUpload = (
    e: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Only prevent default for drag/drop (not for input change)
    if ("dataTransfer" in e) e.preventDefault();

    const file = extractFile(e);
    if (!file) return;

    // Basic MIME filter
    if (accept && !new RegExp(accept.replace("*", ".*")).test(file.type)) {
      if (devWarn) console.warn(`Rejected '${file.name}' (${file.type})`);
      return;
    }

    const oldUrl = currentUrl;
    currentUrl = URL.createObjectURL(file);

    setImage(file);
    setPreview(currentUrl);

    if (oldUrl) {
      setTimeout(() => URL.revokeObjectURL(oldUrl), 0);
    }
  };

  const revokePreview = () => {
    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = null;
  };

  return { handleUpload, revokePreview };
};
