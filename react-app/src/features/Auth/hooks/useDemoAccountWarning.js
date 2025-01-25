import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "@/store";
import { useAuthFlow } from "@/context";

export function useDemoAccountWarning({ setShowDemoWarning }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const wrapperRef = useRef(null);

  const { closeModal, openLogin, openSignupPage1, openSignupPage2 } =
    useAuthFlow();

  const handleCancel = (e) => {
    e.preventDefault();
    setShowDemoWarning(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
    closeModal();
    history.push("/");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    openSignupPage1();
    setShowDemoWarning(false);
  };

  return { handleCancel, handleLogin, handleSignup, wrapperRef };
}
