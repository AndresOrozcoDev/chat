import { useState } from "react";
import { useAuth } from "../../../context/auth.context";
import RegisterForm from "../components/RegisterFom";
import { useNavigate } from "react-router-dom";

type RegisterProps = {};

const Register = ({ }: RegisterProps) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (formData: { email: string; password: string }) => {
    try {
      await register(formData.email, formData.password);
      setError(null);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
      console.error("Error al registrarse:", error.message);
    }
  };

  return (
    <div className="h-screen w-screen text-black">
      <RegisterForm onSubmit={handleRegister} />
    </div>
  )
}

export default Register;