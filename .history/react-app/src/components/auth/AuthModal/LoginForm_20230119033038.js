import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../../store/session";
import "./AuthModal.css";

const LoginForm = ({ showLoginForm, setShowLoginForm, setShowSignupForm }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
    history.push("/posts");
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
        console.log(data);
        setErrors(["Incorrect email or password."]);
      } else {
        setShowLoginForm(false);
        // history.push("/posts");
      }
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

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
              <label htmlFor="email">Email</label>
            </div>
            <div className="login-form-errors">
              {errors?.length > 0 &&
                errors.map((error, ind) => <div key={ind}>{error}</div>)}
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
              <label htmlFor="password">Password</label>
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
                  history.push("/signup");
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
