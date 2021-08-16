import { LoginContext } from "../context/auth";
import { Fragment, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./secureRouter";
import Dashboard from "../view/Dashboard";
import Login from "../view/auth/Login";
import Register from "../view/auth/Register";
import Header from "../view/Header";
import Home from "../view/Home";
import Donate from "../view/Donate";

export default function Routes() {
  const { loggedIn } = useContext(LoginContext);

  return (
    //Don't show anything until loggedIn load
    loggedIn !== null && (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/home" component={Dashboard} />
          <PrivateRoute exact path="/donate" component={Donate} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
        </Switch>
      </Fragment>
    )
  );
}
