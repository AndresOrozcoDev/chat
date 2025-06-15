import { useState } from "react";

type LoginFormProps = {
  onSubmit: (formData: { email: string; password: string }) => void;
};

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-neutral-100 text-black dark:bg-(--dark-bg-primary)">
      <form onSubmit={handleSubmit} className="bg-white w-5/6 md:w-3/5 shadow-xl rounded-md py-10 px-8 flex flex-col gap-6 dark:bg-(--dark-bg-secondary) dark:text-white">
        <div className="flex gap-2 flex-col justify-center items-center">
          <img src="/favicon.png" alt="Logo" className="size-24" />
          <h2 className="font-bold text-xl text-center">Bienvenido de regreso</h2>
          <p className="text-sm text-center">Ingresa tus credenciales.</p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="required text-xs font-bold">Correo</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white" placeholder="user@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="required text-xs font-bold">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white" placeholder="********" />
        </div>
        <div>
          <p className="text-center text-xs">No tienes una cuenta? <a className="underline text-blue-500" href="/register">Crear cuenta</a></p>
          {/* TODO div for btns login provider */}
        </div>
        <div className="flex justify-center w-full">
          <input type="submit" value="Iniciar sesion" className="btn btn--primary" />
        </div>
      </form>
    </div>
  )
}

export default LoginForm;