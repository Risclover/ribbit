import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
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
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
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
      <form className="login-form" onSubmit={onLogin}>
        <div className="login-form-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="form-field email">
          <input
            name="email"
            type="text"
            placeholder=" "
            value={email}
            onChange={updateEmail}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-field password">
          <input
            name="password"
            type="password"
            placeholder=" "
            value={password}
            onChange={updatePassword}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button className="login-form-submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
