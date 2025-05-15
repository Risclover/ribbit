import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector((s) => s.session.user);
  const ready = useSelector((s) => s.session.isLoaded); // set by restore thunk

  return (
    <Route {...rest}>
      {
        ready ? (
          user ? (
            children
          ) : (
            <Redirect to="/login" />
          )
        ) : null /* or spinner */
      }
    </Route>
  );
};
