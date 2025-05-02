import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CommunityImg } from "@/components/CommunityImg";
import { useAuthFlow } from "@/context/AuthFlowContext";
import { getCommunities } from "@/store";
import { AllPostsIcon } from "@/assets";
import "./NavSidebar.css";

export function LoggedOutSidebar({ showLoggedOutSidebar }) {
  const location = useLocation();
  const { openSignupPage1 } = useAuthFlow();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [recent, setRecent] = useState([]);

  const communities = useSelector((state) => Object.values(state.communities));

  const sortedCommunities = communities.sort((a, b) =>
    a.members < b.members ? 1 : -1
  );

  useEffect(() => {
    if (!user) {
      const stored =
        JSON.parse(localStorage.getItem("recentCommunities")) || [];
      const cleaned = stored.filter(
        (comm) => comm && comm.id && comm.name && comm.icon
      );
      setRecent(cleaned);
    } else {
      setRecent([]);
    }
  }, [user, location.pathname]);

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
            <hr className="logged-out-sidebar-hr" />
            <div className="logged-out-sidebar-section">
              <div className="nav-left-dropdown-title">Popular Communities</div>
              <ul className="logged-out-communities">
                {sortedCommunities
                  .map((community) => (
                    <li key={community.id}>
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
            <hr className="logged-out-sidebar-hr" />
            {recent.length > 0 && (
              <div className="logged-out-sidebar-section">
                <div className="nav-left-dropdown-title">Recent</div>
                <ul>
                  {recent.map((comm) => (
                    <li key={comm?.id}>
                      <NavLink
                        to={`/c/${comm?.name}`}
                        className="nav-left-dropdown-navitem"
                      >
                        <CommunityImg
                          imgSrc={comm?.icon}
                          imgClass="nav-left-dropdown-item-img"
                          imgAlt="Community icon"
                          imgStyle={{
                            backgroundColor: `${comm?.iconBgColor}`,
                          }}
                        />
                        <span className="nav-left-dropdown-item">
                          c/{comm?.name}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
