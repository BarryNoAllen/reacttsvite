import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import AppLayout from "../components/Layout/Layout";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 使用根布局组件 */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about/:id" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
