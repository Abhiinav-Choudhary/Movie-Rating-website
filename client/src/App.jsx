import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Discussion from "./pages/Discussion";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import MoviePage from "./pages/MoviePage"; 
import toast, { Toaster } from "react-hot-toast";


const App = () => {
  return (
<>
<Toaster position="top-right" reverseOrder={false} />
<div>
 <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/discussion" element={<Discussion />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/movie/:id" element={<MoviePage />} /> 
    </Routes>
    
</div>
  </>
  );
};

export default App;
