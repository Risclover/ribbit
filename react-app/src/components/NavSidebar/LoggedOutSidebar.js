import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

import Home from "@/assets/images/navbar/home-icon.png";
import All from "@/assets/images/navbar/all-icon2.png";

import "./NavSidebar.css";
import { useAuthFlow } from "@/context/AuthFlowContext";
import AllPostsIcon from "assets/icons/AllPostsIcon";
import { useDispatch, useSelector } from "react-redux";
import { getCommunities } from "store";

export function LoggedOutSidebar({ showLoggedOutSidebar }) {
  const { openSignupPage1 } = useAuthFlow();
  const dispatch = useDispatch();
  const history = useHistory();

  const communities = useSelector((state) => Object.values(state.communities));

  useEffect(() => {
    dispatch(getCommunities());
  }, []);

  const sortedCommunities = communities.sort((a, b) =>
    a.members < b.members ? 1 : -1
  );

  return (
    <>
      {showLoggedOutSidebar && (
        <div className="logged-out-sidebar">
          <div className="logged-out-sidebar-top">
            <div className="logged-out-sidebar-section">
              <div className="nav-left-dropdown-title">Feeds</div>
              <NavLink to="/all" className="nav-left-dropdown-navitem">
                <AllPostsIcon />
                <span className="nav-left-dropdown-item">All</span>
              </NavLink>
            </div>
            <div className="logged-out-sidebar-section">
              <div className="nav-left-dropdown-title">Popular Communities</div>
              <ul className="logged-out-communities">
                {sortedCommunities
                  .map((community) => (
                    <li>
                      <NavLink
                        to={`/c/${community.name}`}
                        className="nav-left-dropdown-navitem"
                      >
                        <img
                          className="nav-left-dropdown-item-img"
                          alt="Community icon"
                          src={
                            community.communitySettings[community?.id]
                              .communityIcon
                          }
                        />
                        <span className="nav-left-dropdown-item">
                          c/{community.name}
                        </span>
                      </NavLink>
                    </li>
                  ))
                  .slice(0, 5)}
              </ul>
            </div>
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
