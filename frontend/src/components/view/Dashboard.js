import React, { useContext } from "react";
import { LoginContext } from "../context/auth";

export default function Dashboard() {
  const { user } = useContext(LoginContext);

  return (
    <div>
      <p>Dashboard</p>
      {user &&
        Object.values(user).map((element) => <p key={element}>{element}</p>)}
    </div>
  );
}
