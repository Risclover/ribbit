import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./AuthModal.css";

const SignUpForm = ({
  showSignupForm,
  setShowSignupForm,
  setShowLoginForm,
}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    let passes = [];
    let usernames = [];
    let emails = [];
    if (password !== repeatPassword) {
      passes.push("Your passwords don't match. Please try again.");
    }
    if (password.length < 8) {
      passes.push("Password must be at least 8 characters long.");
    }
    if (username.length < 3 || username.length > 20) {
      usernames.push("Username must be between 3 and 20 characters.");
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(username) && username.length > 0) {
      usernames.push(
        "Letters, numbers, dashes, and underscores only. Please try again without symbols."
      );
    }
    if (
      !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        email
      )
    ) {
      emails.push("Not a valid email address.");
    }
    if (passes.length > 0) setPasswordErrors(passes);
    if (emails.length > 0) setEmailErrors(emails);
    if (usernames.length > 0) setUsernameErrors(usernames);
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      console.log("DATA:", data);
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].slice(0, 8) === "username") {
            setUsernameErrors(data[i].slice(5));
          }
          if (data[i].slice(0, 5) === "email") {
            setEmailErrors(data[i].slice(8));
          }
        }
        setErrors(data);
      } else {
        if (errors.length === 0) {
          history.push("/posts");
        }
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {showSignupForm && (
        <div className="signup-form-container">
          <form onSubmit={onSignUp} className="signup-form" autoComplete="off">
            <div className="form-field email">
              <input
                type="text"
                name="email"
                autoComplete="off"
                onChange={updateEmail}
                placeholder=" "
                value={email}
                maxLength={255}
              />
              <label>Email</label>
            </div>
            <div className="signup-form-errors">
              {emailErrors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="form-field username">
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                placeholder=" "
                autoComplete="off"
                value={username}
                maxLength={20}
              />
              <label>User Name</label>
            </div>
            <div className="signup-form-errors">
              {usernameErrors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="form-field password">
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                autoComplete="new-password"
                placeholder=" "
                value={password}
              ></input>
              <label>Password</label>
            </div>
            <div className="signup-form-errors">
              {passwordErrors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="form-field repeat">
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                autoComplete="new-password"
                placeholder=" "
                required={true}
              ></input>
              <label>Repeat Password</label>
            </div>
            <div className="signup-form-errors">
              {errors?.length > 0 &&
                errors.map((error, ind) => <div key={ind}>{error}</div>)}
            </div>
            <button className="signup-form-submit">Sign Up</button>
            <p className="sign-in-switch">
              Already a ribbitor?{" "}
              <span
                onClick={() => {
                  setShowLoginForm(true);
                  setShowSignupForm(false);
                  history.push("/login");
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
