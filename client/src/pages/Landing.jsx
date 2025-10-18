import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const canvasRef = useRef(null);
  const { user } = useAuth();

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
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden scroll-smooth">
      {/* Background Animation */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />

      {/* Navbar */}
      <Navbar isAuth={!!user} />

      {/* Hero Section */}
      <main className="flex flex-1 flex-col justify-center items-center text-center px-6 py-24">
        {!user ? (
          <>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Discover, Rate & Discuss <span className="text-yellow-400">Movies</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
              MovieRate is your hub to explore trending films, share reviews, and join a
              vibrant movie-loving community.
            </p>
            <Link
              to="/signup"
              className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition duration-300"
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-pulse">
              Welcome, <span className="text-yellow-400">{user.username || user.name}</span> 🎬
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
              Dive into your personalized movie universe — explore, rate, and connect.
            </p>
          </>
        )}
      </main>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-900/70 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
          About MovieRate
        </h2>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg">
          MovieRate is a platform built for cinema enthusiasts to explore popular and
          upcoming films, post honest ratings, and engage with others who share the same
          passion. Whether you love thrillers, comedies, or classics — we’ve got you covered!
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 text-center bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-yellow-400">
          Why Choose MovieRate?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">⭐ Rate Any Movie</h3>
            <p className="text-gray-400">
              Share your honest ratings and opinions with the community.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">🎬 Discover Trends</h3>
            <p className="text-gray-400">
              Stay updated with trending and top-rated films from TMDB.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">💬 Join the Community</h3>
            <p className="text-gray-400">
              Connect with other movie lovers and share your favorite finds.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-900 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400">
          Contact Us
        </h2>
        <form
          className="max-w-lg mx-auto bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
            required
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="p-3 rounded-lg bg-gray-700 text-white outline-none resize-none"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-90 border-t border-gray-700 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} 🎬 MovieRate. All Rights Reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#about" className="hover:text-yellow-400">
              About
            </a>
            <a href="#features" className="hover:text-yellow-400">
              Features
            </a>
            <a href="#contact" className="hover:text-yellow-400">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
