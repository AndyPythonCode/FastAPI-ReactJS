import React, { useState } from "react";
import axios from "../../common/axios";

export default function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    error: "",
    send: "",
  });

  const handlerSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("auth/users/forgot-password", {
        email: form.email,
      });
      setForm({ ...form, send: response.data });
    } catch (err) {
      if (err.response) {
        setForm({ ...form, error: err.response.data.detail });
      }
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
          <div className="flex flex-col w-full mb-4 text-center py-4">
            <h2 className="mb-8 mt-6 text-2xl font-semibold text-black title-font">
              Forgot password
            </h2>
            <form onSubmit={handlerSubmit}>
              <div className="mt-2 flex flex-wrap -mx-3 mb-6">
                <div className="w-full sm:w-1/2 sm:mx-auto px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ email: event.target.value })}
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
                Send email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
