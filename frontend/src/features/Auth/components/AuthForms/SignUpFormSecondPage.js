import React from "react";
import { useAuthFlow } from "@/context";
import { AuthFormInput, AuthModalLayout } from "..";
import { useSignUpFormSecondPage } from "../../hooks";

/**
 * Allows new users to set username & password to complete sign-up.
 * - formType: The type of form; controls the topmost form button ('close', 'back', or 'go home')
 */

export function SignUpFormSecondPage({ formType }) {
  const { view } = useAuthFlow();
  const {
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
      active={view}
      onClose={returnToFirstPage}
      title="Create your username and password"
      topbarBtn={formType === "protected" ? "none" : "back"}
      footerBtn={submitBtn}
      onSubmit={(e) => handleSignUp(e)}
    >
      <div>
        <p className="auth-modal-agreement">
          Ribbit is anonymous, so your username is what you’ll go by here.
          Choose wisely—because once you get a name, you can’t change it.
        </p>
        <form>
          {/* username input */}
          <AuthFormInput
            props={usernameInputProps}
            icon="rotate"
            blurred={usernameBlurred}
          />
          {/* password input */}
          <AuthFormInput props={passwordInputProps} blurred={passwordBlurred} />
        </form>
      </div>
    </AuthModalLayout>
  );
}
