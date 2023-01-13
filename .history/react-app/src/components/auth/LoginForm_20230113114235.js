import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    let errors = [];
    if (email.length === 0 || email === undefined) {
      errors.push("Please enter a valid email address.");
      setErrors(errors);
    } else {
      errors = [];
      const data = await dispatch(login(email, password));
      if (data) {
        errors.push("Incorrect email or password.");
        setErrors(errors);
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
    <div className="login-form-container">
      <form className="login-form" onSubmit={onLogin} autocomplete="off">
        <input type="text" autocomplete="false" style={{ display: "none" }} />
        <button className="demo-btn">
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
            className={errors.length > 0 ? "errors-true" : ""}
            autocomplete="off"
            name="email"
            type="email"
            placeholder=" "
            value={email}
            onChange={updateEmail}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="login-form-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="form-field password">
          <input
            className={errors.length > 0 ? "errors-true" : ""}
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
          New to Ribbit? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
