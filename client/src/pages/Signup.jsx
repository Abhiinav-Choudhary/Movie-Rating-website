import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(formData); // context handles backend call & toast
      navigate("/profile");
    } catch (err) {
      console.error(err); // toast already shows error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-lg bg-yellow-400 flex items-center justify-center text-2xl font-bold text-black">
            🎬
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold text-white">Create Account</h2>
        <p className="mt-1 text-center text-sm text-gray-400">Join the community and start rating movies!</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Username</label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="JohnDoe"
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-300 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-700"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="h-px flex-1 bg-gray-700"></div>
        </div>

        {/* Google */}
        <button
          type="button"
          className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-white/5 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="text-yellow-400 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
