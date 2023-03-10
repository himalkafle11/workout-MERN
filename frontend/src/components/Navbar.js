import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="md:p-8 p-4 m-4  bg-gray-900 text-white">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/">
          <span class="self-center text-xl font-semibold whitespace-nowrap">
            WorkoutBuddy
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
