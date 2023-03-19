import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { dispatch } = useAuthContext();

  const { user } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="md:p-8 p-4 bg-gray-900 text-white">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        {user && (
          <>
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              WorkoutBuddy
            </span>
            <div>
              <span className="mr-2 text-white">{user.user.name}</span>
              <Link to="/">
                <button
                  onClick={logout}
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Log out
                </button>
              </Link>
            </div>
          </>
        )}
        {!user && (
          <>
            <Link to="/">
              <span className="self-center text-xl font-semibold whitespace-nowrap">
                WorkoutBuddy
              </span>
            </Link>
            <div className="flex gap-4">
              <Link to="/loginpage">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Log in
                </button>
              </Link>
              <Link to="/registerpage">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Sign up
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
