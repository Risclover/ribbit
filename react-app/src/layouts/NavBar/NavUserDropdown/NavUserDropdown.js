import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { SlLogin } from "react-icons/sl";
import { logout } from "../../../store";
import Poinsettia from "../../../assets/images/user-profile-icons/poinsettia.png";
import "./NavUserDropdown.css";
import { useOutsideClick } from "../../../hooks";

export function NavUserDropdown() {
  const history = useHistory();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser.id]);
  const users = useSelector((state) => state.users);

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  return (
    <div
      ref={wrapperRef}
      className="navbar-user-dropdown"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <div className="navbar-user-dropdown-face">
        <div className="navbar-user-info-box">
          <div className="navbar-user-info-details">
            <img
              className="navbar-user-img"
              src={cuser.profile_img}
              alt="User"
            />
            <div className="navbar-user-info">
              {cuser?.username}
              <div className="user-karma-info">
                <img
                  className="karma-poinsettia"
                  src={Poinsettia}
                  alt="Karma"
                />
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
            <NavLink to={`/users/${cuser.id}/profile/edit`}>
              <div className="nav-user-dropdown-btn">User Settings</div>
            </NavLink>
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
