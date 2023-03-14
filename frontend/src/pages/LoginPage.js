import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { email, password };

    const response = await fetch("http://localhost:4000/auth/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setEmail("");
      setPassword("");
      setError(null);
    } else if (data.errors) {
      setError(data.errors[0].msg);
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex justify-center md:mt-28 mt-36 px-4">
      <div className="w-full max-w-xl p-8 bg-gray-300 shadow-xl rounded-lg flex flex-col gap-6">
        <div className=" bg-gray-900 text-white p-4 rounded-xl">
          <div className="flex flex-col ">
            <p className="text-2xl font-bold ">Hello Friends!</p>
            <p>Explore more by connecting with us...</p>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              // name="email"
              placeholder="Email"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              // name="password"
              placeholder="******************"
              autoComplete="off"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold md:py-2 md:px-8 py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign in
            </button>
            <p>
              Don't have an account?
              <span
                onClick={() => navigate("/registerpage")}
                style={{ color: "red" }}
                className="text-red cursor-pointer ml-1"
              >
                Register
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
  );
};

export default LoginPage;
