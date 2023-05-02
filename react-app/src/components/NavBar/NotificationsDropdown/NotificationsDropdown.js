import React, { useEffect } from "react";
import { VscMailRead } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotifications } from "../../../store/notifications";

export default function NotificationsDropdown() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserNotifications(user.id));
  }, []);

  return (
    <div className="notifications-dropdown">
      <div className="notifications-dropdown-head">
        <p>Notifications</p>
        <div className="notifications-dropdown-head-right">
          <span className="notifications-dropdown-head-messages-btn">
            Messages
          </span>
          <button className="notifications-dropdown-head-btn">
            <VscMailRead />
          </button>
          <button className="notifications-dropdown-head-btn">
            <VscSettingsGear />
          </button>
        </div>
      </div>
      <div className="notifications-dropdown-main"></div>
    </div>
  );
}
