import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../common/axios";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../context/auth";
import Loading from "../../common/Loading";

export default function Register() {
  let history = useHistory();
  const { setLoggedIn } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    username: "",
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

  const hanlderSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/auth/register", data);
      if (response.status === 200) {
        const params = new URLSearchParams();
        params.append("username", data.email);
        params.append("password", data.password);
        axios.post("/auth/token", params).then((response) => {
          setLoading(true);
          if (response.data.access_token) {
            setTimeout(() => {
              setLoggedIn(true);
              history.push("/login");
            }, 2000);
          }
        });
      }
    } catch (err) {
      if (err.response) {
        setData({ error: err.response.data.detail });
      }
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <section
      id="register"
      className="flex flex-col items-center h-screen md:flex-row opacity-95"
    >
      <div className="flex w-full h-screen px-6 bg-whitelack md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 items-left justify-left">
        <div className="w-full lg:py-6 lg:h-100">
          <h1 className="my-12 font-bold text-center text-green-500 text-4xl sm:text-5xl title-font">
            Create an account.
          </h1>
          {/* Error message */}
          {data.error && (
            <p className="text-red-700 font-semibold text-center">
              {data.error}
            </p>
          )}
          <form className="mt-6" onSubmit={hanlderSubmitForm}>
            <div>
              <label className="text-base font-medium leading-relaxed text-white">
                Username
              </label>
              <input
                type="text"
                onChange={handlerChangeInput}
                name="username"
                id="username"
                placeholder="Your Username"
                className="w-full px-4 py-2 mt-2 text-base border-transparent rounded-lg bg-blueGray-100 ext-blue-700 focus:border-blueGray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-base font-medium leading-relaxed text-white">
                Email Address
              </label>
              <input
                type="email"
                onChange={handlerChangeInput}
                name="email"
                id="email"
                placeholder="Your Email Address"
                className="w-full px-4 py-2 mt-2 text-base border-transparent rounded-lg bg-blueGray-100 ext-blue-700 focus:border-blueGray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-base font-medium leading-relaxed text-white">
                Password
              </label>
              <input
                type="password"
                onChange={handlerChangeInput}
                name="password"
                id="password"
                placeholder="Your Password"
                minLength="6"
                className="w-full px-4 py-2 mt-2 text-base border-transparent rounded-lg bg-blueGray-100 ext-blue-700 focus:border-blueGray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                required
              />
            </div>
            <button className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r bg-green-500 hover:bg-green-700 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black">
              Sign up
            </button>
          </form>
          <p className="mt-2 text-center md:text-lg text-green-500 font-bold md:mt-3 ">
            Have an account?
            <Link
              to="/login"
              className="ml-2 font-bold text-blue-700 md:text-lg hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
