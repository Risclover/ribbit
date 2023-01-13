import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

const NavBar = ({ setShowLoginForm }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
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
            to="/sign-up"
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
