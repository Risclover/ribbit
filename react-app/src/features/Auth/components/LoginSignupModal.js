import React, { useEffect, useState } from "react";
import { LoginForm, SignUpForm } from ".";
import { AuthModal } from "../../../context";
import { adjectives } from "../data/adjectivesList";
import { nouns } from "../data/nounsList";
import { SignUpFormSecond } from "./SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login, signUp } from "../../../store";

export function LoginSignupModal({ btnText, className }) {
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

  const handleSignUp = () => {
    dispatch(signUp(username, email, password));
    setShowSignupForm(false);
    const id = Object.values(allUsers).length + 1;
    history.push(`/users/${id}/profile`);
  };

  const handleLogIn = async () => {
    const data = await dispatch(login(loginEmail, loginPassword));
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
      <button
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setShowLoginForm(true);
        }}
      >
        {btnText}
      </button>
      {showLoginForm && (
        <AuthModal
          title="Log In"
          onClose={() => setShowLoginForm(false)}
          topbarBtn="close"
          footerBtn={
            <>
              <button
                className="login-form-submit"
                onClick={() => {
                  handleLogIn();
                }}
                disabled={disabled}
              >
                Log In
              </button>
            </>
          }
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
          topbarBtn="close"
          title="Sign Up"
          onClose={() => setShowSignupForm(false)}
          setOpenSecondPage={setOpenSecondPage}
          openSecondPage={openSecondPage}
          footerBtn={
            <>
              <button
                className="signup-form-submit"
                onClick={() => {
                  setOpenSecondPage(true);
                  setShowSignupForm(false);
                }}
                disabled={disabled}
              >
                Continue
              </button>
            </>
          }
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
          topbarBtn="back"
          footerBtn={
            <>
              <button
                className="signup-form-submit"
                onClick={() => handleSignUp()}
                disabled={disabled}
              >
                Sign Up
              </button>
            </>
          }
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
