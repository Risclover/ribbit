import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import Home from "@/assets/images/navbar/home-icon.png";
import All from "@/assets/images/navbar/all-icon2.png";

import "./NavSidebar.css";
import { useAuthFlow } from "@/context/AuthFlowContext";

export function LoggedOutSidebar({ showLoggedOutSidebar }) {
  const { openSignupPage1 } = useAuthFlow();
  const history = useHistory();

  return (
    <>
      {showLoggedOutSidebar && (
        <div className="logged-out-sidebar">
          <div className="logged-out-sidebar-top">
            <div className="nav-left-dropdown-title">Feeds</div>
            <NavLink to="/" className="nav-left-dropdown-navitem">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="20px"
                y="20px"
                style={{ height: "20px", width: "20px" }}
                viewBox="10.07 15.03 79.86 69.94"
              >
                <style type="text/css"></style>
                <path
                  className="st0"
                  d="M55.355,17.231l33.658,25.804c1.239,0.949,1.201,2.683,0.039,3.543c-0.957,0.708-3.432,0.432-5.118,0.432  v33.496c0,2.456-2.01,4.466-4.466,4.466c-6.26,0-12.52,0-18.779,0c-0.433,0-0.783-0.35-0.783-0.783v-16.83  c0-2.632-1.051-5.135-2.91-6.994c-6.278-6.278-16.899-1.711-16.899,6.994v16.83c0,0.433-0.35,0.783-0.783,0.783  c-6.26,0-12.52,0-18.779,0c-2.456,0-4.466-2.01-4.466-4.466V47.01h-3.815c-2.041,0-3.04-2.615-1.265-3.975l33.658-25.804  c2.114-1.621,3.796-2.242,5.355-2.201C51.559,14.989,53.241,15.61,55.355,17.231z"
                ></path>
              </svg>
              <span className="nav-left-dropdown-item">Home</span>
            </NavLink>
            <NavLink to="/all" className="nav-left-dropdown-navitem">
              <img
                src={All}
                className="nav-left-dropdown-item-icon"
                alt="All"
              />
              <span className="nav-left-dropdown-item">All</span>
            </NavLink>
          </div>
          <div className="logged-out-sidebar-bottom">
            <div className="logged-out-sidebar-text">
              Create an account to follow your favorite communities and start
              taking part in conversations.
            </div>
            <button
              className="logged-out-sidebar-btn"
              onClick={openSignupPage1}
            >
              Join Ribbit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
