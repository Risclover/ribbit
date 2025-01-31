import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { SlLogin } from "react-icons/sl";
import { logout } from "@/store";
import Poinsettia from "@/assets/images/user-profile-icons/poinsettia.png";
import { useOutsideClick } from "@/hooks";
import "./NavUserDropdown.css";
import { CommunityThemeToggle } from "@/features";
import { useDarkMode } from "@/hooks/useDarkMode";

export function NavUserDropdown() {
  const history = useHistory();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const { theme, toggleTheme } = useDarkMode();
  const [checked, setChecked] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser.id]);

  const onLogout = async () => {
    await dispatch(logout());
    history.push("/");
  };

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  return (
    <div
      className="navbar-user-dropdown"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <div className="navbar-user-dropdown-face">
        <div className="navbar-user-info-box">
          <div className="navbar-user-info-details">
            <img
              className="navbar-user-img"
              src={cuser?.profileImg}
              alt="User"
            />
            <div className="navbar-user-info">
              {cuser?.username}
              <div className="user-karma-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  x="0px"
                  y="0px"
                  viewBox="2 2 32 32"
                  className="karma-poinsettia"
                  fill="#67b54d"
                >
                  <path
                    className="cls-1"
                    d="M9,18a11.29,11.29,0,0,0-3,3.28,8.74,8.74,0,0,1-2.48-1.75L2,18l1.53-1.53A9,9,0,0,1,6,14.7,11.38,11.38,0,0,0,9,18Z"
                  ></path>
                  <path
                    className="cls-1"
                    d="M34,18l-1.54,1.54A19.49,19.49,0,0,1,30,21.3,11.19,11.19,0,0,0,27,18a11.38,11.38,0,0,0,3-3.3,8.42,8.42,0,0,1,2.48,1.76Z"
                  ></path>
                  <path
                    className="cls-1"
                    d="M18,27a11.29,11.29,0,0,0,3.28,3,8.74,8.74,0,0,1-1.75,2.48L18,34l-1.53-1.53A9,9,0,0,1,14.7,30,11.38,11.38,0,0,0,18,27Z"
                  ></path>
                  <path
                    className="cls-1"
                    d="M18,2l1.54,1.54A19.49,19.49,0,0,1,21.3,6,11.19,11.19,0,0,0,18,9a11.38,11.38,0,0,0-3.3-3,8.42,8.42,0,0,1,1.76-2.48Z"
                  ></path>
                  <path
                    className="cls-1"
                    d="M17.67,13.43a4.59,4.59,0,0,0-4.23,4.24A9.44,9.44,0,0,1,8.25,14C6.72,11.73,6.69,9.29,6.69,6.69c2.6,0,5,0,7.27,1.57A9,9,0,0,1,17.67,13.43Z"
                  ></path>
                  <path
                    className="cls-1"
                    d="M29.3,27.14v2.17c-3,0-6.27-.12-8.45-2.51a9.24,9.24,0,0,1-2.55-4.24,4.57,4.57,0,0,0,4.25-4.23,9.07,9.07,0,0,1,5,3.41A9.68,9.68,0,0,1,29.3,27.14Z"
                  ></path>
                  <path
                    className="cls-1"
                    d="M22.56,17.67a4.59,4.59,0,0,0-4.24-4.23A9.44,9.44,0,0,1,22,8.26c2.23-1.53,4.67-1.57,7.27-1.57,0,2.6,0,5-1.57,7.27A9,9,0,0,1,22.56,17.67Z"
                  ></path>
                  <path
                    className="cls-1"
                    d="M8.86,29.31H6.69c0-3,.12-6.27,2.51-8.45a9.24,9.24,0,0,1,4.24-2.55,4.57,4.57,0,0,0,4.23,4.25,9.07,9.07,0,0,1-3.41,5A9.68,9.68,0,0,1,8.86,29.31Z"
                  ></path>
                  <path
                    className="cls-1"
                    d="M20.29,18A2.29,2.29,0,1,1,18,15.71,2.3,2.3,0,0,1,20.29,18Z"
                  ></path>
                </svg>
                {cuser.karma} karma
              </div>
            </div>
          </div>
          <TbChevronDown />
        </div>
      </div>

      {showDropdown && (
        <div className="nav-user-dropdown-box" ref={wrapperRef}>
          <div className="nav-user-top-section">
            <div className="nav-user-dropdown-btn-title">
              <HiOutlineUserCircle /> My Stuff
            </div>
            <NavLink to={`/users/${cuser.id}/profile`}>
              <div className="nav-user-dropdown-btn">Profile</div>
            </NavLink>
            <NavLink to={`/directory`}>
              <div className="nav-user-dropdown-btn">Communities Directory</div>
            </NavLink>
            <NavLink to={`/settings/profile`}>
              <div className="nav-user-dropdown-btn">User Settings</div>
            </NavLink>
            <div
              className="nav-user-dropdown-btn dark-mode-toggle"
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
            >
              Dark Mode{" "}
              <CommunityThemeToggle
                checked={checked}
                handleThemeToggle={toggleTheme}
              />
            </div>
          </div>
          <div className="nav-user-dropdown-logout-btn" onClick={onLogout}>
            <div className="door-icon">
              <SlLogin />
            </div>
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}
