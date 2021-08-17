import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "../../common/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const history = useHistory();
  const [form, setForm] = useState({
    password: "",
    password_confirm: "",
    error: "",
    send: "",
  });

  const handlerSubmit = async (event) => {
    event.preventDefault();
    if (form.password === form.password_confirm) {
      try {
        await axios.post(`/auth/users/reset-password/${token}`, {
          password: form.password,
        });
        history.push("/login");
      } catch (err) {
        if (err.response) {
          setForm({ ...form, error: err.response.data.detail });
        }
      }
    } else {
      setForm({ ...form, error: "It need to match" });
    }
  };

  return (
    <div id="home" className="h-screen">
      <div className="container items-center py-16 mx-auto px-5 md:py-36 lg:px-20">
        <div
          className="w-full bg-white px-5 mx-auto border rounded-lg shadow-xl lg:px-0 text-blueGray-500 lg:w-1/2"
          aria-hidden="false"
          aria-describedby="modalDescription"
          role="dialog"
        >
          <div className="flex flex-col w-full mb-8 text-center py-4">
            <h2 className="mb-8 mt-6 text-2xl font-semibold text-black title-font">
              Reset password
            </h2>
            <form onSubmit={handlerSubmit}>
              <div className="mt-2 flex flex-wrap -mx-3 mb-6">
                <div className="w-full sm:w-1/2 sm:mx-auto px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="password-1"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="password-1"
                    type="password"
                    value={form.password}
                    onChange={(event) =>
                      setForm({ ...form, password: event.target.value })
                    }
                    required
                    minLength="6"
                  />
                </div>
              </div>
              <div className="mt-2 flex flex-wrap -mx-3 mb-6">
                <div className="w-full sm:w-1/2 sm:mx-auto px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="password-2"
                  >
                    Confirm password
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="password-2"
                    type="password"
                    value={form.password_confirm}
                    onChange={(event) =>
                      setForm({ ...form, password_confirm: event.target.value })
                    }
                    required
                    minLength="6"
                  />
                </div>
              </div>

              <div className="mx-auto mb-4">
                {form.error && <p className="text-red-500">{form.error}</p>}
                {form.send && <p className="text-green-500">{form.send}</p>}
              </div>

              <button
                type="submit"
                className="mt-3 mx-auto w-2/5 inline-flex justify-center rounded-md border border-green-300 shadow-sm py-2 bg-green-500 font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 sm:mt-0"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
