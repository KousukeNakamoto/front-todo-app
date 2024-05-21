import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = () => {
  //   const [authenticated, setAuthenticated] = useState(false);
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
          //   setAuthenticated(true);
        } else {
          console.error("Authentication failed:", response.statusText);
          //   setAuthenticated(false);
          if (localStorage.getItem("JWT")) {
            localStorage.removeItem("JWT");
          }
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to authenticate:", error);
        // setAuthenticated(false);
        navigate("/login");
      }
    };

    if (jwt) {
      checkAuthentication();
    } else {
      //   setAuthenticated(false);
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

export const getToDos = async (id, setTodos) => {
  const jwt = localStorage.getItem("JWT");
  const res = await fetch(`http://localhost:8080/todos/${id}`, {
    headers: {
      "X-AUTH-TOKEN": `Bearer ${jwt}`,
    },
  });
  const data = await res.json();
  setTodos(data);
};
