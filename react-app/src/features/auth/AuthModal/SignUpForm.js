import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../../../store/session";
import { SignUpFormInput } from "./SignUpFormInput";
import validator from "validator";
import "./AuthModal.css";
import { getUsers } from "../../../store/users";

export const SignUpForm = ({
  showSignupForm,
  setShowSignupForm,
  setShowLoginForm,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [usernameErrors, setUsernameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  const allUsers = useSelector((state) => Object.values(state.users));

  useEffect(() => {
    getUsers();
  }, [dispatch]);

  const onSignUp = async (e) => {
    e.preventDefault();
    let usernames = [];
    let passes = [];
    let emails = [];
    let errors = [];

    // Username errors
    if (
      username.length < 3 ||
      username.length > 20 ||
      (!/^[a-zA-Z0-9-_]+$/.test(username) && username.length > 0)
    ) {
      if (username.length < 3 || username.length > 20) {
        usernames.push("Username must be between 3 and 20 characters.");
      }
      if (!/^[a-zA-Z0-9-_]+$/.test(username) && username.length > 0) {
        usernames.push(
          "Letters, numbers, dashes, and underscores only. Please try again without symbols."
        );
      }
    } else {
      usernames = [];
      setUsernameErrors([]);
    }

    // Password errors
    if (password.length < 8) {
      passes.push("Password must be at least 8 characters long.");
    } else {
      passes = [];
      setPasswordErrors([]);
    }

    // Repeat password errors
    if (password !== repeatPassword) {
      errors.push("Your passwords don't match. Please try again.");
    } else {
      errors = [];
      setErrors([]);
    }

    // Email errors
    if (!validator.isEmail(email)) {
      emails.push("Not a valid email address.");
    } else {
      emails = [];
      setEmailErrors([]);
    }

    // Setting visual error messages
    if (emails.length > 0) {
      setEmailErrors(emails);
    }
    if (passes.length > 0) {
      setPasswordErrors(passes);
    }
    if (usernames.length > 0) {
      setUsernameErrors(usernames);
    } else {
      setUsernameErrors([]);
    }
    if (errors.length > 0) {
      setErrors(errors);
    } else {
      setErrors([]);
    }

    // If there are no errors, commence with signup
    if (
      emails.length === 0 &&
      usernames.length === 0 &&
      passes.length === 0 &&
      errors.length === 0
    ) {
      setPasswordErrors([]);
      setErrors([]);
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].slice(0, 8) === "username") {
            usernames.push(data[i].slice(8));
            setUsernameErrors(usernames);
          }
          if (data[i].slice(0, 5) === "email") {
            emails.push(data[i].slice(5));
            setEmailErrors(emails);
          }
        }
        setErrors([]);
      } else {
        setShowSignupForm(false);
        let id = 0;
        for (let user of allUsers) {
          id += 1;
        }
        history.push(`/users/${id + 1}/profile`);
      }
    }
  };

  const emailInputProps = {
    type: "email",
    name: "email",
    inputValue: email,
    errors: emailErrors,
    label: "Email",
    maxLength: 255,
    autoCompleteStatus: "off",
  };

  const usernameInputProps = {
    type: "text",
    name: "username",
    inputValue: username,
    errors: usernameErrors,
    maxLength: 20,
    label: "Username",
    autoCompleteStatus: "off",
  };

  const passwordInputProps = {
    type: "password",
    name: "password",
    inputValue: password,
    errors: passwordErrors,
    label: "Password",
    maxLength: 255,
    autoCompleteStatus: "new-password",
  };

  const repeatPasswordInputProps = {
    type: "password",
    name: "repeat-password",
    inputValue: repeatPassword,
    errors: errors,
    label: "Repeat Password",
    maxLength: 255,
    autoCompleteStatus: "new-password",
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <>
      {showSignupForm && (
        <div className="signup-form-container">
          <form onSubmit={onSignUp} className="signup-form" autoComplete="off">
            <SignUpFormInput props={emailInputProps} onChange={setEmail} />
            <SignUpFormInput
              props={usernameInputProps}
              onChange={setUsername}
            />
            <SignUpFormInput
              props={passwordInputProps}
              onChange={setPassword}
            />
            <SignUpFormInput
              props={repeatPasswordInputProps}
              onChange={setRepeatPassword}
            />
            <button className="signup-form-submit">Sign Up</button>
            <p className="sign-in-switch">
              Already a ribbitor?{" "}
              <span
                onClick={() => {
                  setShowLoginForm(true);
                  setShowSignupForm(false);
                }}
              >
                Log In
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};
