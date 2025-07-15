import { useAppSelector } from "@/store";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ children, ...rest }) => {
  const user = useAppSelector((s) => s.session.user);
  const ready = useAppSelector((s) => s.session.isLoaded); // set by restore thunk

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
