import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "@/store";
import { useAuthFlow } from "@/context";

/**
 * Handles logic for the demo account warning component.
 * - setShowDemoWarning: State variable setter for whether or not the warning is visible
 */
export function useDemoAccountWarning({ setShowDemoWarning }) {
  const dispatch = useDispatch();
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
    dispatch(login("demo@aa.io", "password"));
    closeModal();
    history.push("/");
  };

  // Logic for the 'Sign Up' button, which closes this warning and opens the sign up form.
  const handleSignup = (e) => {
    e.preventDefault();
    openSignupPage1();
    setShowDemoWarning(false);
  };

  return { handleCancel, handleLogin, handleSignup, wrapperRef };
}
