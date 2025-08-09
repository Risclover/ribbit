import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export const OVERLAYS = {
  NONE: null,
  WELCOME: "WELCOME",
  CREATE: "CREATE",
  INVITE: "INVITE",
  DELETE: "DELETE",
} as const;

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
  openChat: boolean;
  setOpenChat: Dispatch<SetStateAction<boolean>>;
  overlay: string;
  setOverlay: Dispatch<SetStateAction<string>>;
  OVERLAYS: { NONE: null, WELCOME: string, CREATE: string, INVITE: string, DELETE: string}
}

/* ----  Create context with an *undefined* default so misuse is caught ---- */
const SelectedChatContext = createContext<SelectedChatContextValue | undefined>(
  undefined
);

/* ----  Provider ---- */
export function SelectedChatProvider({ children }: { children: ReactNode }) {
  const [selectedChat, setSelectedChat] = useState<ChatThread | null>(null);
  const [pendingReceiver, setPendingReceiver] = useState<number | null>(null);
  const [openChat, setOpenChat] = useState(false);
  const [overlay, setOverlay] = useState(OVERLAYS.NONE);

  return (
    <SelectedChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        pendingReceiver,
        setPendingReceiver,
        openChat,
        setOpenChat,
        overlay,
        setOverlay,
        OVERLAYS
      }}
    >
      {children}
    </SelectedChatContext.Provider>
  );
}

/* ----  Convenience hook ---- */
export function useChat() {
  const ctx = useContext(SelectedChatContext);
  if (!ctx)
    throw new Error("useChat must be used inside <SelectedChatProvider />");
  return ctx;
}
