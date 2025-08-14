type Setter<T> = (v: T) => void;

interface FileHandlerOptions {
  accept?: string; // e.g. "image/*"
  devWarn?: boolean; // console.warn on reject
}

export const fileHandler = (
  setImage: Setter<File | null>,
  setPreview: Setter<string>,
  { accept = "image/*", devWarn = true }: FileHandlerOptions = {}
) => {
  // Lives for the lifetime of this handler (we memoize it in DropBox)
  let currentUrl: string | null = null;

  const extractFile = (evt: any): File | null => {
    if (evt?.dataTransfer?.files?.[0]) return evt.dataTransfer.files[0];
    if (evt?.target?.files?.[0]) return evt.target.files[0];
    return null;
  };

  const handleUpload = (
    evt: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Only prevent default for drag/drop (not for input change)
    if ("dataTransfer" in evt) evt.preventDefault();

    const file = extractFile(evt);
    if (!file) return;

    // Basic MIME filter
    if (accept && !new RegExp(accept.replace("*", ".*")).test(file.type)) {
      if (devWarn) console.warn(`Rejected '${file.name}' (${file.type})`);
      return;
    }

    // Defer revoking the old URL until after the next paint
    const oldUrl = currentUrl;

    currentUrl = URL.createObjectURL(file);
    setImage(file);
    setPreview(currentUrl);

    if (oldUrl) {
      // give React a tick to swap the CSS background before we revoke
      setTimeout(() => URL.revokeObjectURL(oldUrl), 0);
    }
  };

  /** Release the current blob when the component unmounts. */
  const revokePreview = () => {
    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = null;
  };

  return { handleUpload, revokePreview };
};
