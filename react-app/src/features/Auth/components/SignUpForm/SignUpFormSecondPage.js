import React, { useEffect } from "react";
import { AuthModal } from "@/context";
import { AuthFormInput } from "../../components";
import { useSignUpFormSecondPage } from "../../hooks";
import { validatePassword, validateUsername } from "../../utils";

export function SignUpFormSecondPage({
  formType,
  setOpenSecondPage,
  setShowSignupForm,
  email,
  openSecondPage,
}) {
  const {
    username,
    password,
    setUsername,
    setPassword,
    taken,
    setTaken,
    usernameInputProps,
    passwordInputProps,
    handleSignUp,
    submitBtn,
    returnToFirstPage,
  } = useSignUpFormSecondPage({
    setShowSignupForm,
    setOpenSecondPage,
    email,
  });

  useEffect(() => {
    console.log("usernameTaken:", taken);
  }, [taken]);

  return (
    <AuthModal
      title="Create your username and password"
      onClose={returnToFirstPage}
      topbarBtn={formType === "protected" ? "none" : "back"}
      footerBtn={submitBtn}
      onSubmit={(e) => handleSignUp(e)}
      active={openSecondPage}
    >
      <div>
        <p className="auth-modal-agreement">
          Ribbit is anonymous, so your username is what you’ll go by here.
          Choose wisely—because once you get a name, you can’t change it.
        </p>
        <form>
          <AuthFormInput
            props={usernameInputProps}
            onChange={setUsername}
            onBlur={() => validateUsername(username, taken)}
            icon="rotate"
            usernameTaken={taken}
            setTaken={setTaken}
          />
          <AuthFormInput
            props={passwordInputProps}
            onChange={setPassword}
            onBlur={() => validatePassword(password)}
          />
        </form>
      </div>
    </AuthModal>
  );
}
