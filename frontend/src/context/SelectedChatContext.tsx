import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

/* ----  Type that represents ONE chat thread in your store ---- */
export interface ChatThread {
  id: number;
  /* add whatever you actually keep here */
  messages?: { id: number; createdAt: string; read: boolean }[];
  createdAt: string;
}

/* ----  Context value shape ---- */
interface SelectedChatContextValue {
  selectedChat: ChatThread | null;
  setSelectedChat: Dispatch<SetStateAction<ChatThread | null>>;
  pendingReceiver: number | null;
  setPendingReceiver: Dispatch<SetStateAction<number | null>>;
}

/* ----  Create context with an *undefined* default so misuse is caught ---- */
const SelectedChatContext = createContext<SelectedChatContextValue | undefined>(
  undefined
);

/* ----  Provider ---- */
export function SelectedChatProvider({ children }: { children: ReactNode }) {
  const [selectedChat, setSelectedChat] = useState<ChatThread | null>(null);
  const [pendingReceiver, setPendingReceiver] = useState<number | null>(null);

  return (
    <SelectedChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        pendingReceiver,
        setPendingReceiver,
      }}
    >
      {children}
    </SelectedChatContext.Provider>
  );
}

/* ----  Convenience hook ---- */
export function useSelectedChat() {
  const ctx = useContext(SelectedChatContext);
  if (!ctx)
    throw new Error(
      "useSelectedChat must be used inside <SelectedChatProvider />"
    );
  return ctx;
}
