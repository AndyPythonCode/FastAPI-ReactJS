import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./secureRouter";
import Dashboard from "../view/Dashboard";
import Login from "../view/auth/Login";
import Register from "../view/auth/Register";
import Header from "../view/Header";
import Home from "../view/Home";
import Team from "../view/Team";

export default function Routes() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/home" component={Dashboard} />
        <PrivateRoute exact path="/team" component={Team} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
      </Switch>
    </Fragment>
  );
}
