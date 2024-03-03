import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-white border-gray-200 rounded-lg shadow m-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
            fourpoint
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link to="/login">
            <button
              type="button"
              className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-gray-800"
            >
              Get started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
