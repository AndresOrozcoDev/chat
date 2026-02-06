import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth.context";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import Loader from "../../../shared/components/Loader";
import { useNotification } from "../../../context/notify.context";

type LoginProps = {};

const Login = ({ }: LoginProps) => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { error } = useNotification();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err: any) {
      error(err.message);
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