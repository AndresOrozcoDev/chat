import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth.context";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import Loader from "../../../shared/components/Loader";

type LoginProps = {};

const Login = ({ }: LoginProps) => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      setErrorMessage("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-dvh w-dvw">
      {loading && <Loader />}
      <LoginForm onSubmit={handleLogin} />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  )
}

export default Login;