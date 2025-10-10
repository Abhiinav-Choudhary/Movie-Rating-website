// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Signup
  const signup = async (data) => {
    try {
      const res = await API.post("/auth/signup", data);
      setUser(res.data);
      toast.success("🎉 Signed up successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!");
      throw err;
    }
  };

  // Signin
  const signin = async (data) => {
    try {
      const res = await API.post("/auth/signin", data);
      setUser(res.data);
      toast.success("✅ Signed in successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signin failed!");
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      toast.info("👋 Logged out!");
    } catch (err) {
      toast.error("Logout failed!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
