import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = () => {
  //   const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
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
          console.log(data);
          setUser(data);
          //   setAuthenticated(true);
        } else {
          console.error("Authentication failed:", response.statusText);
          //   setAuthenticated(false);
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
      navigate("/login");
    }
  }, [jwt, navigate]);

  return user;
};
