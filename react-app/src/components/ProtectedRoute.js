import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.session.user);

  return (
    <Route {...props}>{user ? props.children : <Redirect to="/login" />}</Route>
  );
};
