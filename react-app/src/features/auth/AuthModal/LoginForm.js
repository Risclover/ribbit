import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../../store/session";
import "./AuthModal.css";

const LoginForm = ({ showLoginForm, setShowLoginForm, setShowSignupForm }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
    setShowLoginForm(false);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let errors = [];
    if (email.length === 0 || email === undefined) {
      errors.push("Please enter a valid email address.");
    }
    if (errors.length > 0) {
      setErrors(errors);
    } else {
      const data = await dispatch(login(email, password));
      if (data && data.length > 0) {
        setErrors(["Incorrect email or password."]);
      } else {
        setShowLoginForm(false);
      }
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {showLoginForm && (
        <div className="login-form-container">
          <form className="login-form" onSubmit={onLogin} autoComplete="off">
            <input
              type="text"
              autoComplete="false"
              style={{ display: "none" }}
            />
            <button className="demo-btn" onClick={handleDemo}>
              <i className="fa-regular fa-address-card demo-id"></i>
              Continue as Demo User
              <span></span>
            </button>
            <div className="or-dividers">
              <div className="or-line"></div>
              <div className="or-label">OR</div>
              <div className="or-line"></div>
            </div>
            <div className="form-field-box">
              <div className="form-field email">
                <input
                  className={errors && errors.length > 0 ? "errors-true" : ""}
                  autoComplete="off"
                  name="email"
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={updateEmail}
                />
                <label
                  htmlFor="email"
                  onClick={(e) => e.target.parentElement.children[0].focus()}
                >
                  Email
                </label>
              </div>
              <div className="login-form-errors">
                {errors?.length > 0 &&
                  errors.map((error, ind) => <div key={ind}>{error}</div>)}
              </div>
            </div>
            <div className="form-field password">
              <input
                className={errors && errors.length > 0 ? "errors-true" : ""}
                autoComplete="new-password"
                name="password"
                type="password"
                placeholder=" "
                value={password}
                onChange={updatePassword}
              />
              <label
                htmlFor="password"
                onClick={(e) => e.target.parentElement.children[0].focus()}
                // onMouseOver={(e) => e.target.parentElement.children[0].focus()}
                // onMouseOut={(e) => e.target.parentElement.children[0].blur()}
              >
                Password
              </label>
            </div>
            <button className="login-form-submit" type="submit">
              Log In
            </button>
            <p className="sign-in-switch">
              New to Ribbit?{" "}
              <span
                onClick={() => {
                  setShowLoginForm(false);
                  setShowSignupForm(true);
                }}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
