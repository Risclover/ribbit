// hooks/useLoginForm.js
import { useState, useEffect } from "react";
import { handleErrors } from "../utils/loginFormValidation";

export function useLoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmailErrors, setLoginEmailErrors] = useState([]);
  const [loginPasswordErrors, setLoginPasswordErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const emailErrors = handleErrors(loginEmail);
    const passwordErrors = handleErrors(loginPassword);

    setDisabled(
      loginEmail === "" ||
        emailErrors.length > 0 ||
        loginPassword === "" ||
        passwordErrors.length > 0
    );
  }, [
    loginEmail,
    setLoginEmailErrors,
    loginPassword,
    setLoginPasswordErrors,
    setDisabled,
  ]);

  return {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    loginEmailErrors,
    setLoginEmailErrors,
    loginPasswordErrors,
    setLoginPasswordErrors,
    disabled,
  };
}
