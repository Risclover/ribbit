import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";
import { useSelector } from "react-redux";

const NavBar = ({ setShowLoginForm, setShowSignupForm }) => {
  const user = useSelector((state) => state.session.user);
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
            <NavLink
              to="/signup"
              exact={true}
              activeClassName="active"
              onClick={() => setShowSignupForm(true)}
            >
              Sign Up
            </NavLink>
          </li>
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
