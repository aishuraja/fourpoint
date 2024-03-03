import React from "react";
import Header from "../components/Header";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mx-4 flex flex-col h-screen">
      <Header />
      <section className="px-2 sm:px-4 w-full z-20 top-0 left-0 flex items-center justify-center flex-col py-20">
        <div className="bg-main text-center ">
          <div className="wrapper max-w-xl transform -translate-y-18 sm:-translate-y-2xfull ">
            <h1 className="text-black font-header font-bold text-5xl mb-6">
              Open source GPA calculator
            </h1>
            <span className="text-lg text-black">
              Calculate your semester GPI, record semester details, get an overview of your grades in a better way.
            </span>
            <br />
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Link to="/login">
            <button
              type="button"
              className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-gray-800"
            >
              Get started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
