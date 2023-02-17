import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { logout } from "../../store/session";

import { TbChevronDown } from "react-icons/tb";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { SlLogin } from "react-icons/sl";
import Poinsettia from "../../images/user-profile-icons/poinsettia.png";

// function useOutsideAlerter(ref) {
//   useEffect(() => {
//     /**
//      * Alert if clicked on outside of element
//      */
//     function handleClickOutside(event) {
//       if (ref.current && !ref.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     }
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref]);
// }

export default function NavUserDropdown() {
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

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

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
              src={users[user?.id]?.profile_img}
            />
            <div className="navbar-user-info">
              {user?.username}
              <div className="user-karma-info">
                <img className="karma-poinsettia" src={Poinsettia} />
                {user?.karma} karma
              </div>
            </div>
          </div>
          <TbChevronDown />
        </div>
      </div>
      {showDropdown && (
        <div className="nav-user-dropdown-box">
          <div className="nav-user-top-section">
            <div className="nav-user-dropdown-btn-title">
              <HiOutlineUserCircle /> My Stuff
            </div>
            <NavLink to={`/users/${user.id}/profile`}>
              <div className="nav-user-dropdown-btn">Profile</div>
            </NavLink>
            <NavLink to={`/directory`}>
              <div className="nav-user-dropdown-btn">Communities Directory</div>
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
