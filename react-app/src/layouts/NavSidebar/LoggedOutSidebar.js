import React from "react";
import { useHistory } from "react-router-dom";

import Home from "@/assets/images/navbar/home-icon.png";
import All from "@/assets/images/navbar/all-icon2.png";

import { LoginSignupModal } from "@/features";
import "./NavSidebar.css";

export function LoggedOutSidebar({ showLoggedOutSidebar }) {
  const history = useHistory();

  return (
    <>
      {showLoggedOutSidebar && (
        <div className="logged-out-sidebar">
          <div className="logged-out-sidebar-top">
            <div className="nav-left-dropdown-title">Feeds</div>
            <div
              className="nav-left-dropdown-navitem"
              onClick={(e) => {
                e.preventDefault();
                history.push("/");
              }}
            >
              <img
                src={Home}
                className="nav-left-dropdown-item-icon"
                alt="Home"
              />
              <span className="nav-left-dropdown-item">Home</span>
            </div>
            <div
              className="nav-left-dropdown-navitem"
              onClick={(e) => {
                e.preventDefault();
                history.push("/c/all");
              }}
            >
              <img
                src={All}
                className="nav-left-dropdown-item-icon"
                alt="All"
              />
              <span className="nav-left-dropdown-item">All</span>
            </div>
          </div>
          <div className="logged-out-sidebar-bottom">
            <div className="logged-out-sidebar-text">
              Create an account to follow your favorite communities and start
              taking part in conversations.
            </div>

            <LoginSignupModal
              btnText="Join Ribbit"
              className="logged-out-sidebar-btn"
              formType="signup"
            />
          </div>
        </div>
      )}
    </>
  );
}
