import LoginForm from "../components/LoginForm";

type LoginProps = {};

const Login = ({ }: LoginProps) => {

  const handleLogin = (formData: { email: string; password: string }) => {
    console.log("Formulario recibido en Login:", formData);
  };

  return (
    <div className="h-screen w-screen text-black">
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}

export default Login;