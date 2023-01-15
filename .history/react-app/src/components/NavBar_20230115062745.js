import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";

const NavBar = ({ setShowLoginForm, setShowSignupForm }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/posts" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
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
        <li>
          <NavLink
            to="/signup"
            exact={true}
            activeClassName="active"
            onClick={() => setShowSignupForm(true)}
          >
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
