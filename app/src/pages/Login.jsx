import React from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();
    login({email: email, password:password});
  };
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 max-w-sm">
        <form class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-black">
            Sign in to our platform
          </h5>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-black"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-black"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleLogin}
            class="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
          <div class="text-sm font-medium text-black">
            Not registered?{" "}
            <a
              href="/register"
              class="text-black hover:underline font-bold"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
