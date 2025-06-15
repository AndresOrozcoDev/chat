import RegisterForm from "../components/RegisterFom";

type RegisterProps = {};

const Register = ({ }: RegisterProps) => {

  return (
    <div className="h-screen w-screen text-black">
      <RegisterForm />
    </div>
  )
}

export default Register;