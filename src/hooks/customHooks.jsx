import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToDos } from "../lib/todo";

export const useAuthGuard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const jwt = localStorage.getItem("JWT");
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth", {
          method: "GET",
          headers: {
            "X-AUTH-TOKEN": `Bearer ${jwt}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log("useAuthGuard", data);
          setUser(data);
        } else {
          console.error("Authentication failed:", response.statusText);

          if (localStorage.getItem("JWT")) {
            localStorage.removeItem("JWT");
          }
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to authenticate:", error);

        navigate("/login");
      }
    };

    if (jwt) {
      checkAuthentication();
    } else {
      navigate("/");
    }
  }, [jwt, navigate]);

  return user;
};

export const useGetToDos = (id, setTodos) => {
  useEffect(() => {
    getToDos(id, setTodos);
  }, [id, setTodos]);
};
