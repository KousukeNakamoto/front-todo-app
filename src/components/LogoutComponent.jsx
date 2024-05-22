import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/auth";

const LogoutComponent = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const jwt = localStorage.getItem("JWT");
    if (!jwt) {
      console.error("No JWT found in localStorage.");
      return;
    }

    try {
      const response = await logout(jwt);
      if (response.status === 200) {
        localStorage.removeItem("JWT");
        navigate("/login"); // ログインページなどにリダイレクト
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutComponent;
