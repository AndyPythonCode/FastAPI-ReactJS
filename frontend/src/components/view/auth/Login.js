import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../common/axios";
import { LoginContext } from "../../context/auth";
import Loading from "../../common/Loading";

export default function Login() {
  const { setLoggedIn } = useContext(LoginContext);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handlerChangeInput = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
      error: "",
    });
  };

  const handlerSubmitForm = async (event) => {
    event.preventDefault();
    // You should use URLSearchParams() with application/x-www-form-urlencoded according to axios documentation
    const params = new URLSearchParams();
    params.append("username", data.email);
    params.append("password", data.password);

    try {
      const response = await axios.post("/auth/token", params);
      setLoading(true);

      if (response.data.access_token) {
        setTimeout(() => {
          setLoggedIn(true);
        }, 2000);
      }
    } catch (err) {
      if (err.response) {
        setData({
          ...data,
          error: err.response.data.detail,
        });
      }
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <section className="flex flex-col items-center h-screen md:flex-row">
      <div className="hidden w-full h-screen lg:block md:w-1/3 lg:w-2/3">
        <img
          src="https://i.ibb.co/0DBMQrr/speedometer-arrow-speed.jpg"
          alt="FastRoom"
          className="object-cover w-full h-full opacity-95"
        />
      </div>
      <div className="flex items-center justify-center w-full h-screen px-6 bg-white md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
        <div className="w-full h-100">
          <Link
            to="/"
            className="flex items-center mx-auto w-32 mb-4 font-medium text-blueGray-900 title-font md:mb-0"
          >
            <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600"></div>
            <h2 className="text-lg font-bold tracking-tighter text-black uppercase duration-500 ease-in-out transform ttransition hover:text-lightBlue-500 dark:text-blueGray-400">
              FastRoom
            </h2>
          </Link>
          <h1 className="mt-12 text-2xl font-semibold text-black tracking-ringtighter sm:text-3xl title-font">
            Log in to your account
          </h1>
          <form className="mt-6" onSubmit={handlerSubmitForm}>
            <div>
              <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                onChange={handlerChangeInput}
                name="email"
                id="email"
                placeholder="Your Email "
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
                Password
              </label>
              <input
                type="password"
                required
                onChange={handlerChangeInput}
                name="password"
                id="password"
                placeholder="Your Password"
                minLength="6"
                className="w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              />
            </div>
            <div className="mt-2 text-right">
              <Link
                to="#"
                className="hover:text-blue-700 text-sm font-semibold leading-relaxed text-blueGray-700"
              >
                Forgot Password?
              </Link>
            </div>
            {/* Error message */}
            {data.error && (
              <p className="text-red-700 text-center font-semibold">
                {data.error}
              </p>
            )}
            <button className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">
              Log In
            </button>
          </form>
          <hr className="w-full my-6 border-blueGray-300" />
          <p className="mt-8 text-center">
            Need an account?
            <Link
              to="/register"
              className="ml-2 font-semibold text-blue-500 hover:text-blue-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
