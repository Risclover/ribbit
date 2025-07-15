import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export interface PostFormatContextType {
  format: string;
  setFormat: Dispatch<SetStateAction<string>>;
}

export const PostFormatContext = createContext<PostFormatContextType>({
  format: "Card",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFormat: () => {}, // stub will be replaced by Provider
});

interface PostFormatProviderProps {
  children: ReactNode;
}

/**
 * PostFormatProvider keeps the selected post-list format (“Card”, “Compact” …)
 * in React state and exposes it via context. The initial value comes from
 * localStorage so the user’s last choice survives a page refresh.
 */
export const PostFormatProvider = ({ children }: PostFormatProviderProps) => {
  const [format, setFormat] = useState<string>(
    localStorage.getItem("selectedPostFormat") || "Card"
  );

  return (
    <PostFormatContext.Provider value={{ format, setFormat }}>
      {children}
    </PostFormatContext.Provider>
  );
};

export default PostFormatProvider;
