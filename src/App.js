import { Link, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { Protected } from "./pages/Protected";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="h-screen font-bold">
      <div className="h-full">
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>|{" "}
        <Link to="/">Home</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/protected/:id" element={<Protected />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
