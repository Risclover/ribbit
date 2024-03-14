import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../../store";

export const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = async () => {
    await dispatch(logout());
    history.push("/");
  };

  return <button onClick={onLogout}>Logout</button>;
};
