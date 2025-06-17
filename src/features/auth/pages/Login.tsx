import { useState } from "react";
import { useAuth } from "../../../context/auth.context";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/components/Loader";

type LoginProps = {};

const Login = ({ }: LoginProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData: { email: string; password: string }) => {
  try {
    setLoading(true);
    await login(formData.email, formData.password);
    navigate("/dashboard");
  } catch (error: any) {
    setLoading(false);
    console.error("Error al iniciar sesión:", error.message);
  } finally {
      setLoading(false);
    }
};

  return (
    <div className="h-dvh w-dvw">
      {loading && <Loader />}
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}

export default Login;