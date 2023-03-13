import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="md:p-8 p-4 bg-gray-900 text-white">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            WorkoutBuddy
          </span>
        </Link>
        <div className="flex gap-4">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Sign in
          </button>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
