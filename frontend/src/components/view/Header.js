import React, { useContext, useState } from "react";
import { LoginContext } from "../context/auth";
import { NavLink, Link } from "react-router-dom";
import DropDown from "./DropDown";
import { AlertInfo } from "../common/Alert";

export default function Header() {
  const navigation = [
    { name: "Dashboard", href: "/home" },
    { name: "Custom chat", href: "/custom-chat" },
  ];

  const { loggedIn } = useContext(LoginContext);
  const [messageLog, setMessageLog] = useState(false);

  const handlerMessageInfo = () => {
    !loggedIn ? setMessageLog(true) : setMessageLog(false);
  };

  return (
    <header className="text-white body-font bg-black">
      {/* show message need login */}
      {messageLog && !loggedIn && (
        <AlertInfo show={messageLog} setShow={setMessageLog} />
      )}
      <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <span className="ml-3 text-2xl">FastRoom</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-lg justify-center">
          {navigation.map((element, index) => {
            return (
              <NavLink
                to={element.href}
                key={index}
                onClick={handlerMessageInfo}
                activeStyle={{
                  fontWeight: "bold",
                  color: "#1d4ed8",
                }}
                className="mr-5 hover:text-blue-500"
              >
                {element.name}
              </NavLink>
            );
          })}
        </nav>
        <div className="inline-block">
          <Link to="/login">
            <button className="inline-flex items-center text-base mt-4 mr-4 md:mt-0">
              Sign in
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
          <Link to="/register">
            <button className="inline-flex mr-4 md:mr-0 items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-700 rounded text-base mt-4 md:mt-0">
              Sign up
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        </div>
        {/* settings */}
        {loggedIn && <DropDown />}
      </div>
    </header>
  );
}
