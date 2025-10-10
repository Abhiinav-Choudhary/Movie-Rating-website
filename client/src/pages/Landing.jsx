import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ get user auth state

const Landing = () => {
  const canvasRef = useRef(null);
  const { user } = useAuth(); // get logged-in user

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const lines = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255, 255, 0, 0.5)";
      ctx.lineWidth = 1;

      lines.forEach((line) => {
        line.x += line.dx;
        line.y += line.dy;

        if (line.x < 0 || line.x > width) line.dx *= -1;
        if (line.y < 0 || line.y > height) line.dy *= -1;

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.dx * 20, line.y + line.dy * 20);
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      {/* Navbar */}
      <Navbar isAuth={!!user} />

      {/* Hero Section */}
      <main className="flex flex-1 flex-col justify-center items-center text-center px-6">
        {!user ? (
          <>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Discover, Rate & Discuss{" "}
              <span className="text-yellow-400">Movies</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
              Your one-stop hub for exploring new releases, rating your favorites,
              and sharing opinions with a passionate community of movie lovers.
            </p>

           
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-pulse">
              Welcome to MovieRate ,{" "}
              <span className="text-yellow-400">{user.username || user.name}</span>!
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 animate-bounce">
              Enjoy exploring, rating, and discussing movies with the community!
            </p>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-90 border-t border-gray-700 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} 🎬 MovieRating. All Rights Reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-yellow-400">
              About
            </a>
            <a href="#" className="hover:text-yellow-400">
              Contact
            </a>
            <a href="#" className="hover:text-yellow-400">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
