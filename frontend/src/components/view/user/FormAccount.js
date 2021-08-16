import React, { useRef, useState, useContext, useEffect } from "react";
import axios from "../../common/axios";
import { LoginContext } from "../../context/auth";
import { getCurrentUser } from "../../common/CurrentUser";

export default function FormAccount() {
  const inputImage = useRef(null);
  const { user, setLoggedIn, setUser } = useContext(LoginContext);
  const [passwordText, setPasswordText] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
    password: "",
    img: "",
  });

  useEffect(() => {
    setForm({ ...form, img: user.img });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeImage = () => {
    readImage(inputImage.current.files[0]);
  };

  const readImage = (file) => {
    const reader = new FileReader();
    //Start reading
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          //It's done
          setForm({ ...form, img: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlerFileUploada = (event) => {
    event.preventDefault();
    axios
      .post(`/chat/profile/${user.id}`, form)
      .then((_) => {
        getCurrentUser(setLoggedIn, setUser);
        window.location.reload(false); //refresh
      })
      .catch((err) => {
        setError("Opss!! fields have been taken, change it");
      });
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handlerFileUploada}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <div className="mt-1 flex items-center">
          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            {form.img ? (
              <img src={form.img} alt="img" className="h-full w-full" />
            ) : (
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </span>
          <button
            type="button"
            onClick={() => inputImage.current.click()}
            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Change
          </button>
          {/* user image */}
          <input
            className="hidden"
            type="file"
            onChange={changeImage}
            ref={inputImage}
          />
        </div>
      </div>

      {/* username and email */}
      <div className="mt-2 flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Username
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            required
            value={form.username}
            onChange={(event) =>
              setForm({ ...form, username: event.target.value })
            }
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            required
          />
        </div>
      </div>

      {/* admin and active account */}
      <div className="mt-2 flex flex-wrap -mx-3 mb-6 text-center">
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <label className="text-gray-700">
            <input
              className="mr-1"
              type="checkbox"
              checked={user.is_active}
              readOnly={true}
            />
            Active account
          </label>
        </div>
        <div className="w-1/2 px-3">
          <label className="text-gray-700">
            <input
              className="mr-1"
              type="checkbox"
              checked={user.is_admin}
              readOnly={true}
            />
            Admin
          </label>
        </div>
        <div className="w-full">
          <p className="text-gray-600 text-xs italic">Read only</p>
        </div>
      </div>

      {/* password and eyes icon */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Password
          </label>
          <input
            className="inline appearance-none w-5/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password1"
            type={passwordText ? "text" : "password"}
            placeholder="******************"
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setPasswordText(!passwordText)}
            className="inline ml-5 sm:ml-10 p-1 rounded-md border border-gray-300 shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {passwordText ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
          <p className="text-gray-600 text-xs italic">Your new password</p>
        </div>
      </div>

      {/* Joined */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Joined
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="date"
            type="datetime-local"
            value={new Date(user.date_joined).toISOString().substr(0, 16)}
            readOnly={true}
          />
          <p className="text-gray-600 text-xs italic">Read only</p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <p className="text-red-600 text-center">{error && error}</p>
        </div>
      </div>

      {/* update */}
      <button
        type="submit"
        className="mt-3 mx-auto w-full inline-flex justify-center rounded-md border border-green-300 shadow-sm py-2 bg-green-500 font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 sm:mt-0"
      >
        Update
      </button>
    </form>
  );
}
