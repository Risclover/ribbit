import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export interface OpenChatContextType {
  openChat: boolean;
  setOpenChat: Dispatch<SetStateAction<boolean>>;
}

const OpenChatContext = createContext<OpenChatContextType | undefined>(
  undefined
);

interface OpenChatProviderProps {
  children: ReactNode;
}

export const OpenChatProvider = ({ children }: OpenChatProviderProps) => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <OpenChatContext.Provider value={{ openChat, setOpenChat }}>
      {children}
    </OpenChatContext.Provider>
  );
};

export const useOpenChat = () => {
  const ctx = useContext(OpenChatContext);
  return ctx;
};
