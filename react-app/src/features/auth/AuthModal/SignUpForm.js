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
import SignUpFormInput from "./SignUpFormInput";

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

    SignUpFormUsernameValidator(setUsernameErrors, username);
    SignUpFormEmailValidator(setEmailErrors, email);
    SignUpFormPasswordValidator(password, setPasswordErrors, repeatPassword);

    let usernames = [];
    let emails = [];

    setPasswordErrors([]);
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
