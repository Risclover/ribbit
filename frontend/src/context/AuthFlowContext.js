import React, { createContext, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const AuthFlowContext = createContext();

export function AuthFlowProvider({ children }) {
  // Which auth form is active: null | 'login' | 'signup-first' | 'signup-second'
  const [view, setView] = useState(null);
  const history = useHistory();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [signupFormData, setSignupFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const openLogin = () => setView("login");
  const openSignupPage1 = () => setView("signup-first");
  const openSignupPage2 = () => setView("signup-second");
  const closeModal = () => {
    if (window.location.pathname === "/login") {
      history.goBack();
      setView(null);
    } else {
      setView(null);
    }
  };

  return (
    <AuthFlowContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthFlowContext.Provider>
  );
}

export function useAuthFlow() {
  return useContext(AuthFlowContext);
}
