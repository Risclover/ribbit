import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import { LoginSignupModal } from "@/features";
import { useAuthFlow } from "@/context/AuthFlowContext";

export const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.session.user);
  const { openLogin } = useAuthFlow();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" && !user) openLogin();
  }, []);

  return (
    <Route {...props}>
      {user ? props.children : <LoginSignupModal formType="protected" />}
    </Route>
  );
};
