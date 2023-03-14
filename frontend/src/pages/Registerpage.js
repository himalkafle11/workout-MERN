import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = { name, email, password, confPassword };

    const response = await fetch("http://localhost:4000/auth/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      setName("");
      setEmail("");
      setPassword("");
      setConfPassword("");
      setError(null);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else if (data.errors) {
      setError(data.errors[0].msg);
      setSuccess(false);
    } else {
      setError(data.error);
      setSuccess(false);
    }
  };

  return (
    <>
      {success && (
        <div className="fixed md:top-20 top-28 w-full flex justify-center">
          <div className="bg-green-500 text-white p-4 rounded-lg flex items-center animate-bounce">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <span className="text-lg font-bold mr-1">Success!</span>You have
            been registered.
          </div>
        </div>
      )}

      <div className="flex justify-center md:mt-16 mt-28 px-4">
        <div className="w-full max-w-xl p-8 bg-gray-300 shadow-xl rounded-lg flex flex-col gap-6">
          <h1 className="text-xl">Register using the following form...</h1>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confPassword"
                type="password"
                placeholder="******************"
                autoComplete="off"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold md:py-2 md:px-8 py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign up
              </button>
              <p>
                Already have an account?
                <span
                  onClick={() => navigate("/loginpage")}
                  className="text-red cursor-pointer ml-1 text-blue-500"
                >
                  Sign in
                </span>
              </p>
            </div>
            {error && (
              <div className="mt-4 text-red-900 shadow appearance-none border bg-red-300 rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
