type Setter<T> = (v: T) => void;

interface FileHandlerOptions {
  accept?: string; // e.g. 'image/*'
  devWarn?: boolean; // console.warn on reject
}

export const fileHandler = (
  setImage: Setter<File | null>,
  setPreview: Setter<string>,
  { accept = "image/*", devWarn = true }: FileHandlerOptions = {}
) => {
  let currentUrl: string | null = null;

  const extractFile = (evt: any): File | null => {
    if (evt.dataTransfer?.files?.[0]) return evt.dataTransfer.files[0];
    if (evt.target?.files?.[0]) return evt.target.files[0];
    return null;
  };

  const handleUpload = (
    evt: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    evt.preventDefault();

    const file = extractFile(evt);
    if (!file) return;

    if (accept && !file.type.match(accept.replace("*", ".*"))) {
      if (devWarn)
        console.warn(`Rejected file '${file.name}' (type ${file.type})`);
      return;
    }

    // clean up previous preview blob
    if (currentUrl) URL.revokeObjectURL(currentUrl);

    currentUrl = URL.createObjectURL(file);
    setImage(file);
    setPreview(currentUrl);
  };

  /** Call this to release the current preview blob when component unmounts. */
  const revokePreview = () => {
    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = null;
  };

  return { handleUpload, revokePreview };
};
