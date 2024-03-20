import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { LoginSignupModal } from ".";

export const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.session.user);

  return (
    <Route {...props}>
      {user ? props.children : <LoginSignupModal formType="protected" />}
    </Route>
  );
};
