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
      usernames.push("Usernames must be between 3 and 20 characters.");
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(username)) {
      usernames.push(
        "Letters, numbers, dashes, and underscores only. Please try again without symbols."
      );
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
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
          <form onSubmit={onSignUp} className="signup-form" autocomplete="off">
            <div className="form-field email">
              <input
                type="text"
                name="email"
                autocomplete="off"
                onChange={updateEmail}
                placeholder=" "
                value={email}
              />
              <label>Email</label>
            </div>
            <div className="form-field username">
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                placeholder=" "
                autoComplete="off"
                value={username}
              />
              <label>User Name</label>
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
            <button type="submit" className="signup-form-submit">
              Sign Up
            </button>
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
