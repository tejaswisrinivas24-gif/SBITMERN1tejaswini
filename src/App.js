import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Students from "./components/Students";
import Faculty from "./components/Faculty";
import FeedbackForm from "./components/FeedbackForm";
import Register from "./components/Register"; // 👈 import new Register component

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <center>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* 👈 new register route */}
          <Route path="/students" element={<Students />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/feedback" element={<FeedbackForm />} />
        </Routes>
      </center>
    </Router>
  );
}

export default App;