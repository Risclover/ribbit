import React from "react";
import { useAuthFlow } from "@/context";
import { AuthFormInput, AuthModalLayout } from "../../components";
import { useSignUpFormSecondPage } from "../../hooks";
import { validatePassword, validateUsername } from "../../utils";

/**
 * The second page of the sign-up form
 * - formType: The type of form; controls the topmost form button ('close', 'back', or 'go home')
 */

export function SignUpFormSecondPage({ formType }) {
  const { view, signupFormData } = useAuthFlow();
  const {
    taken,
    setTaken,
    usernameInputProps,
    passwordInputProps,
    usernameBlurred,
    passwordBlurred,
    handleSignUp,
    submitBtn,
    returnToFirstPage,
  } = useSignUpFormSecondPage();

  return (
    <AuthModalLayout
      title="Create your username and password"
      onClose={returnToFirstPage}
      topbarBtn={formType === "protected" ? "none" : "back"}
      footerBtn={submitBtn}
      onSubmit={(e) => handleSignUp(e)}
      active={view}
    >
      <div>
        <p className="auth-modal-agreement">
          Ribbit is anonymous, so your username is what you’ll go by here.
          Choose wisely—because once you get a name, you can’t change it.
        </p>
        <form>
          <AuthFormInput
            props={usernameInputProps}
            icon="rotate"
            blurred={usernameBlurred}
          />
          <AuthFormInput props={passwordInputProps} blurred={passwordBlurred} />
        </form>
      </div>
    </AuthModalLayout>
  );
}
