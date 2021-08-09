import React from "react";
import "../../styles/loading.css";

export default function Loading() {
  return (
    <div className="load">
      <div className="w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center">
        <div className="loader rounded-full border-4 border-gray-200 h-20 w-20 mb-4"></div>
        <h2 className="text-center text-white text-4xl font-bold">
          Loading...
        </h2>
        <p className="w-1/3 text-center text-white text-2xl font-semibold">
          This may take a few seconds, please don't close this page.
        </p>
      </div>
    </div>
  );
}
