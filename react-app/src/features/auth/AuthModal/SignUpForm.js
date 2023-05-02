import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./AuthModal.css";

import {
  SignUpFormUsernameValidator,
  SignUpFormPasswordValidator,
  SignUpFormEmailValidator,
} from "./SignUpFormValidators";
import validator from "validator";
import SignUpFormInput from "./SignUpFormInput";
import { off } from "process";

const SignUpForm = ({
  showSignupForm,
  setShowSignupForm,
  setShowLoginForm,
  val,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const allUsers = useSelector((state) => Object.values(state.users));

  const onSignUp = async (e) => {
    e.preventDefault();
    let usernames = [];
    let passes = [];
    let emails = [];
    let errors = [];
    console.log("password errors:", passwordErrors);

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

    if (password.length < 8) {
      passes.push("Password must be at least 8 characters long.");
    } else {
      passes = [];
      setPasswordErrors([]);
    }

    if (password !== repeatPassword) {
      errors.push("Your passwords don't match. Please try again.");
    } else {
      errors = [];
      setErrors([]);
    }

    if (!validator.isEmail(email)) {
      emails.push("Not a valid email address.");
    } else {
      emails = [];
      setEmailErrors([]);
    }

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
        if (val === "loginpage") history.push(`/users/${id + 1}/profile`);
      }
    }
  };

  return (
    <>
      {showSignupForm && (
        <div className="signup-form-container">
          <form onSubmit={onSignUp} className="signup-form" autoComplete="off">
            <SignUpFormInput
              type="email"
              name="email"
              onChangeValue={setEmail}
              inputValue={email}
              errors={emailErrors}
              label="Email"
              maxLength={255}
              autoCompleteStatus="off"
            />

            <SignUpFormInput
              type="text"
              name="username"
              onChangeValue={setUsername}
              inputValue={username}
              errors={usernameErrors}
              maxLength={20}
              label="Username"
              autoCompleteStatus="off"
            />

            <SignUpFormInput
              type="password"
              name="password"
              onChangeValue={setPassword}
              inputValue={password}
              errors={passwordErrors}
              label="Password"
              maxLength={255}
              autoCompleteStatus="new-password"
            />

            <SignUpFormInput
              type="password"
              name="repeat_password"
              onChangeValue={setRepeatPassword}
              inputValue={repeatPassword}
              errors={errors}
              label="Repeat Password"
              maxLength={255}
              autoCompleteStatus="new-password"
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

export default SignUpForm;
