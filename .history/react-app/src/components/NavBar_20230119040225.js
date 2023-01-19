import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { Modal } from "../context/Modal";
import LoginForm from "./auth/AuthModal/LoginForm";
import SignUpForm from "./auth/AuthModal/SignUpForm";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/posts" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        {!user && (
          <li>
            <NavLink
              to="/login"
              exact={true}
              activeClassName="active"
              onClick={() => setShowLoginForm(true)}
            >
              Login
            </NavLink>
          </li>
        )}
        {!user && (
          <li>
            <button>Sign Up</button>
          </li>
        )}
        {showLoginForm && (
          <Modal title="Log In" onClose={() => setShowLoginForm(false)}>
            <LoginForm
              setShowLoginForm={setShowLoginForm}
              showLoginForm={showLoginForm}
              showSignupForm={showSignupForm}
              setShowSignupForm={setShowSignupForm}
            />
          </Modal>
        )}
        {showSignupForm && (
          <Modal title="Sign Up" onClose={() => setShowSignupForm(false)}>
            <SignUpForm
              setShowLoginForm={setShowLoginForm}
              showLoginForm={showLoginForm}
              showSignupForm={showSignupForm}
              setShowSignupForm={setShowSignupForm}
            />
          </Modal>
        )}
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        {user && (
          <li>
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
