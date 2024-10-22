// hooks/useDemoAccountWarning.js
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "@/store";

export function useDemoAccountWarning({
  setShowDemoWarning,
  setShowLoginForm,
  setShowSignupForm,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCancel = (e) => {
    e.preventDefault();
    setShowDemoWarning(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
    setShowLoginForm(false);
    history.push("/");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setShowSignupForm(true);
    setShowLoginForm(false);
    setShowDemoWarning(false);
  };

  return { handleCancel, handleLogin, handleSignup };
}
