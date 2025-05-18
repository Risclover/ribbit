import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthFlow } from "@/context";
import { login } from "@/store";
import { demoAccountInfo } from "../data/demoAccountInfo";

/**
 * Handles logic for the demo account warning component.
 * - setShowDemoWarning: State variable setter for whether or not the warning is visible
 */
export function useDemoAccountWarning({ setShowDemoWarning }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const wrapperRef = useRef(null);

  const { closeModal, openSignupPage1 } = useAuthFlow();

  // Logic for the 'Cancel' button, which simply closes the warning
  const handleCancel = (e) => {
    e.preventDefault();
    setShowDemoWarning(false);
  };

  // Logic for the 'Continue as Demo' button, which logs the user in as Demo and closes the auth modal completely before redirecting them to the homepage
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(demoAccountInfo.email, demoAccountInfo.password));
    closeModal();

    if (location.pathname === "/login") {
      history.push("/");
    }
  };

  // Logic for the 'Sign Up' button, which closes this warning and opens the sign up form.
  const handleSignup = (e) => {
    e.preventDefault();
    openSignupPage1();
    setShowDemoWarning(false);
  };

  return { handleCancel, handleLogin, handleSignup, wrapperRef };
}
