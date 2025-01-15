import React, { useState } from "react";
import { LoginForm, SignUpForm, SignUpFormSecondPage } from "../components";

export function LoginSignupModal({ btnText, className, formType }) {
  const [email, setEmail] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [openSecondPage, setOpenSecondPage] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();
    return formType === "signup"
      ? setShowSignupForm(true)
      : setShowLoginForm(true);
  };

  return (
    <>
      {formType !== "protected" && formType !== "profile" && (
        <button className={className} onClick={handleOpenModal}>
          {btnText}
        </button>
      )}
      {(formType === "protected" || showLoginForm) && (
        <LoginForm
          setShowLoginForm={setShowLoginForm}
          setShowSignupForm={setShowSignupForm}
          formType={formType}
        />
      )}
      {showSignupForm && (
        <SignUpForm
          setShowLoginForm={setShowLoginForm}
          setShowSignupForm={setShowSignupForm}
          setOpenSecondPage={setOpenSecondPage}
          openSecondPage
          email={email}
          setEmail={setEmail}
          formType={formType}
        />
      )}
      {openSecondPage && (
        <SignUpFormSecondPage
          formType={formType}
          setOpenSecondPage={setOpenSecondPage}
          setShowSignupForm={setShowSignupForm}
          email={email}
        />
      )}
    </>
  );
}
