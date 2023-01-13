import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./AuthModal.css";
const SignUpForm = ({ showSignupForm, setShowSignupForm }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
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
            <div className="signup-form-errors">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="form-field username">
              <label>User Name</label>
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                autoComplete="off"
                value={username}
              ></input>
            </div>
            <div className="form-field email">
              <label>Email</label>
              <input
                type="text"
                name="email"
                autocomplete="off"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className="form-field password">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                autoComplete="new-password"
                value={password}
              ></input>
            </div>
            <div className="form-field repeat">
              <label>Repeat Password</label>
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                autoComplete="new-password"
                required={true}
              ></input>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
