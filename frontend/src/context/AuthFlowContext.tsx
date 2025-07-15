import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useHistory } from "react-router-dom";

export type AuthView = null | "login" | "signup-first" | "signup-second";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  username: string;
  password: string;
}

export interface AuthFlowContextType {
  /** which auth screen is visible */
  view: AuthView;
  setView: Dispatch<SetStateAction<AuthView>>;

  loginFormData: LoginFormData;
  setLoginFormData: Dispatch<SetStateAction<LoginFormData>>;

  signupFormData: SignupFormData;
  setSignupFormData: Dispatch<SetStateAction<SignupFormData>>;

  openLogin: () => void;
  openSignupPage1: () => void;
  openSignupPage2: () => void;
  closeModal: () => void;
}

interface AuthFlowProviderProps {
  children: ReactNode;
}

const AuthFlowContext = createContext<AuthFlowContextType | undefined>(
  undefined
);

export const AuthFlowProvider = ({ children }: AuthFlowProviderProps) => {
  const [view, setView] = useState<AuthView>(null);
  const history = useHistory();

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [signupFormData, setSignupFormData] = useState<SignupFormData>({
    email: "",
    username: "",
    password: "",
  });

  /* convenience helpers */
  const openLogin = () => setView("login");
  const openSignupPage1 = () => setView("signup-first");
  const openSignupPage2 = () => setView("signup-second");

  const closeModal = () => {
    if (window.location.pathname === "/login") {
      history.goBack();
    }
    setView(null);
  };

  const value: AuthFlowContextType = {
    view,
    setView,
    loginFormData,
    setLoginFormData,
    signupFormData,
    setSignupFormData,
    openLogin,
    openSignupPage1,
    openSignupPage2,
    closeModal,
  };

  return (
    <AuthFlowContext.Provider value={value}>
      {children}
    </AuthFlowContext.Provider>
  );
};

export const useAuthFlow = (): AuthFlowContextType => {
  const ctx = useContext(AuthFlowContext);
  if (!ctx) {
    throw new Error("useAuthFlow must be used within an AuthFlowProvider");
  }
  return ctx;
};
