import { LoginContext } from "../context/auth";
import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";

export function PrivateRoute({ component: Component, ...rest }) {
  const { loggedIn } = useContext(LoginContext);

  return (
    <Route {...rest}>
      {loggedIn ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
}

export function PublicRoute({ component: Component, ...rest }) {
  const { loggedIn } = useContext(LoginContext);

  return (
    <Route {...rest}>
      {loggedIn ? <Redirect to="/home" /> : <Component />}
    </Route>
  );
}
