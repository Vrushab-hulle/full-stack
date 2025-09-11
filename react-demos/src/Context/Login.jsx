import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: "John Doe" }); // pretend user
    navigate("/dashboard");
  };

  return <button onClick={handleLogin}>Login</button>;
}
