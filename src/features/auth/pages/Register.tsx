import { useState } from "react";
import { useAuth } from "../../../context/auth.context";
import RegisterForm from "../components/RegisterFom";
import { useNavigate } from "react-router-dom";
import Loader from "../../../shared/components/Loader";
import { useNotification } from "../../../context/notify.context";

type RegisterProps = {};

const Register = ({ }: RegisterProps) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { error } = useNotification();

  const handleRegister = async (formData: { email: string; password: string }) => {
    try {
      setLoading(true);
      await register(formData.email, formData.password);
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
      <RegisterForm onSubmit={handleRegister} />
    </div>
  )
}

export default Register;