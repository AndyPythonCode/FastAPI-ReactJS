import React, { useState, useContext } from "react";
import axios from "../common/axios";
import { LoginContext } from "../context/auth";
import Modal from "../common/Modal";
import FormAccount from "./user/FormAccount";

export default function DropDown() {
  const [settingDropdown, setSettingDropdown] = useState(false);
  const { setLoggedIn } = useContext(LoginContext);
  const [modal, setModal] = useState(false);

  const handlerUserLogout = (event) => {
    event.preventDefault();
    axios.get("/auth/users/logout").then((response) => {
      if (response.data.logout) {
        setLoggedIn(false);
      }
    });
  };

  return (
    <div className="relative inline-block text-left -mb-2 md:-mb-0">
      <div>
        <button
          onClick={() => setSettingDropdown(!settingDropdown)}
          className="text-base mt-4 md:ml-6 md:mt-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      {/* dropdown */}
      {settingDropdown && (
        <div
          className="origin-top-right mt-4 absolute -right-24 md:right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => setModal(true)}
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
            >
              Account settings
            </button>
            {modal && (
              <Modal
                title="Account Settings"
                setModal={setModal}
                component={FormAccount}
              />
            )}

            <button
              onClick={handlerUserLogout}
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
