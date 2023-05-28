import { useState } from "react";
import { setCookie } from "./../utils/index";
import { useNavigate } from "react-router-dom";

import axios from "axios";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email && !password) {
      setError("Email and password both are required.");
      return;
    }
    axios
      .post("http://localhost:3000/api/v1/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        setCookie("todo-authenticated", response.data.token, 30);
        navigate("/todo");
      })
      .catch(function (error) {
        setError(error.response.data.error);
      });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 p-12">
      <form onSubmit={submitHandler}>
        <div className="max-w-sm rounded-3xl bg-gradient-to-b from-sky-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent">
          <div className="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900">
            <div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Signin to your account
              </h1>
              <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">
                Don't have an account ?&nbsp;
                <a
                  href=""
                  className="text-blue-600 transition duration-200 hover:underline dark:text-blue-400"
                >
                  Signup
                </a>
                &nbsp;for free
              </p>
            </div>
            <div className="mt-8">
              <div>
                <div className="text-red-500 text-sm mt-0 mb-1">{error}</div>
                <input
                  className="mb-5 w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Your Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                />

                <input
                  className="mb-5 w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Your Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
              </div>
              <button
                type="submit"
                className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white"
              >
                Signin
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
