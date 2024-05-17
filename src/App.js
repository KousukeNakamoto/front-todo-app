import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { LoginForm } from "./pages/LoginForm";
import { RegisterForm } from "./pages/RegisterForm";
import { Protected } from "./pages/Protected";

function App() {
  return (
    <div className="">
      <h1>To Do Application with Spring Boot and React</h1>
      <div>
        <BrowserRouter>
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>|{" "}
          <Link to="/">Home</Link>
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/protected" element={<Protected />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
