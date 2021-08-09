import { useState, useLayoutEffect } from "react";
import { LoginContext } from "./components/context/auth";
import Routes from "./components/router";
import axios from "./components/common/axios";
import { getCurrentUser } from "./components/common/CurrentUser";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  //Se jecuta de forma asíncrona, justo después de que React ejecutó todas las mutaciones pero antes de "pintar" en pantalla.
  useLayoutEffect(() => {
    axios.get("/auth/users/is-in").then((response) => {
      if (response.data.is_logged) {
        getCurrentUser(setLoggedIn, setUser);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, user }}>
      <Routes />
    </LoginContext.Provider>
  );
}

export default App;
