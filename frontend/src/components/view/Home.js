import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section id="home" className="h-screen">
      <div className="container items-center py-16 mx-auto px-5 md:py-36 lg:px-20">
        <div
          className="w-full bg-white px-5 mx-auto border rounded-lg shadow-xl lg:px-0 text-blueGray-500 lg:w-1/2"
          aria-hidden="false"
          aria-describedby="modalDescription"
          role="dialog"
        >
          <div className="flex flex-col w-full mb-8 text-center py-4">
            <h2 className="mb-8 mt-6 text-xs font-semibold tracking-widest text-black uppercase title-font">
              Chat online with your friends
            </h2>
            <h1 className="mx-auto animate-bounce mt-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:w-1/2 sm:text-4xl title-font">
              What are you waiting for? meeting people from all over the world
            </h1>
            <div className="inline-flex flex-wrap items-center justify-center space-x-4">
              <Link
                to={{
                  pathname:
                    "https://github.com/AndyPythonCode?tab=repositories",
                }}
                target="_blank"
              >
                <button className="px-4 py-2 my-2 font-medium text-blue-600 transition duration-500 ease-in-out transform bg-blue-100 rounded-md border-blueGray-100 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-200 hover:text-blue-900">
                  Creator Github
                </button>
              </Link>
              <Link to="/home">
                <button className="px-4 py-2 my-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800">
                  Start Chatting
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
