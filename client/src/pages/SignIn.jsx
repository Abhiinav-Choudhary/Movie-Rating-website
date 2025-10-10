// src/pages/SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 🔑 context hook

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signin } = useAuth(); // ✅ correct function name

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signin({ email, password }); // ✅ pass object, since context expects data
      navigate("/profile"); // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
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

        <h2 className="text-center text-2xl font-bold text-white">Sign In</h2>
        <p className="mt-1 text-center text-sm text-gray-400">
          Welcome back! Please sign in to continue
        </p>

        {error && (
          <p className="mt-3 text-center text-red-500 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400">
              <input
                type="checkbox"
                className="rounded border-gray-700 bg-black/40 text-yellow-400 focus:ring-yellow-400"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-yellow-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
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
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
