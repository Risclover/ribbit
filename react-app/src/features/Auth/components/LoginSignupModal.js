import React, { useEffect, useState } from "react";
import { LoginForm, SignUpForm } from ".";
import { AuthModal } from "../../../context";
import { SignUpFormSecond } from "./SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login, signUp } from "../../../store";

export function LoginSignupModal({ btnText, className, formType }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [openSecondPage, setOpenSecondPage] = useState(false);
  const [loginEmailErrors, setLoginEmailErrors] = useState([]);
  const [loginPasswordErrors, setLoginPasswordErrors] = useState([]);
  const [disabled, setDisabled] = useState();

  const allUsers = useSelector((state) => state.users);

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUp(username, email.toLowerCase(), password));
    setShowSignupForm(false);
    const id = Object.values(allUsers).length + 1;
    history.push(`/users/${id}/profile`);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(loginEmail.toLowerCase(), loginPassword));
    if (data && data.length > 0) {
      let errors = [];
      errors.push("incorrect email or password");
      setLoginEmailErrors([""]);
      setLoginPasswordErrors(errors);
    } else {
      console.log("success");
    }
  };

  return (
    <div style={{ color: "white" }}>
      {formType !== "protected" && (
        <button
          className={className}
          onClick={(e) => {
            e.preventDefault();
            formType === "signup"
              ? setShowSignupForm(true)
              : setShowLoginForm(true);
          }}
        >
          {btnText}
        </button>
      )}
      {(formType === "protected" || showLoginForm) && (
        <AuthModal
          title="Log In"
          onClose={() => setShowLoginForm(false)}
          topbarBtn={formType === "protected" ? "none" : "close"}
          footerBtn={
            <>
              <button
                className="login-form-submit"
                disabled={disabled}
                type="submit"
              >
                Log In
              </button>
            </>
          }
          onSubmit={(e) => handleLogIn(e)}
        >
          <LoginForm
            setShowLoginForm={setShowLoginForm}
            setShowSignupForm={setShowSignupForm}
            setDisabled={setDisabled}
            loginEmail={loginEmail}
            loginPassword={loginPassword}
            setLoginEmail={setLoginEmail}
            setLoginPassword={setLoginPassword}
            loginPasswordErrors={loginPasswordErrors}
            setLoginPasswordErrors={setLoginPasswordErrors}
            loginEmailErrors={loginEmailErrors}
            setLoginEmailErrors={setLoginEmailErrors}
          />
        </AuthModal>
      )}
      {showSignupForm && (
        <AuthModal
          topbarBtn={formType === "protected" ? "none" : "close"}
          title="Sign Up"
          onClose={() => setShowSignupForm(false)}
          setOpenSecondPage={setOpenSecondPage}
          openSecondPage={openSecondPage}
          footerBtn={
            <>
              <button
                className="signup-form-submit"
                disabled={disabled}
                type="submit"
              >
                Continue
              </button>
            </>
          }
          onSubmit={(e) => {
            e.preventDefault();
            setOpenSecondPage(true);
            setShowSignupForm(false);
          }}
        >
          <SignUpForm
            setShowLoginForm={setShowLoginForm}
            setShowSignupForm={setShowSignupForm}
            email={email}
            setEmail={setEmail}
            setDisabled={setDisabled}
          />
        </AuthModal>
      )}
      {openSecondPage && (
        <AuthModal
          title="Create your username and password"
          onClose={() => {
            setOpenSecondPage(false);
            setShowSignupForm(true);
          }}
          topbarBtn={formType === "protected" ? "none" : "back"}
          footerBtn={
            <>
              <button
                className="signup-form-submit"
                disabled={disabled}
                type="submit"
              >
                Sign Up
              </button>
            </>
          }
          onSubmit={(e) => handleSignUp(e)}
        >
          <SignUpFormSecond
            setDisabled={setDisabled}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </AuthModal>
      )}
    </div>
  );
}
