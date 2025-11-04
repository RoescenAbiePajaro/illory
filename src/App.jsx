// App.jsx
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Only HomePage remains */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}