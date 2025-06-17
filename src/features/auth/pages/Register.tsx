import { useState } from "react";
import { useAuth } from "../../../context/auth.context";
import RegisterForm from "../components/RegisterFom";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/components/Loader";

type RegisterProps = {};

const Register = ({ }: RegisterProps) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (formData: { email: string; password: string }) => {
    try {
      setLoading(true);
      await register(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error al registrarse:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-dvh w-dvw">
      {loading && <Loader />}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  )
}

export default Register;