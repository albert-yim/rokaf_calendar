import React, { useState } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route
          path="*"
          element={<Navigate replace to={isLogin ? "home" : "login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
