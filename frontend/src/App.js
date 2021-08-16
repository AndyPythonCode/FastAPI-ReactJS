import { useState, useEffect } from "react";
import { LoginContext } from "./components/context/auth";
import Routes from "./components/router";
import axios from "./components/common/axios";
import { getCurrentUser } from "./components/common/CurrentUser";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("/auth/users/is-in").then((response) => {
      response.data.is_logged
        ? getCurrentUser(setLoggedIn, setUser)
        : setLoggedIn(false);
    });
  }, [loggedIn]);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      <Routes />
    </LoginContext.Provider>
  );
}

export default App;
