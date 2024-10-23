import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { LoginSignupModal } from "../features/Auth/components";

export const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.session.user);

  return (
    <Route {...props}>
      {user ? props.children : <LoginSignupModal formType="protected" />}
    </Route>
  );
};
