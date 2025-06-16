import { useState } from "react";

type RegisterFormProps = {
  onSubmit: (formData: { email: string; password: string }) => void;
};


const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-dvh w-screen flex items-center justify-center bg-neutral-100 text-black dark:bg-(--dark-bg-primary)">
      <form onSubmit={handleSubmit} className="bg-white w-5/6 md:w-3/6 shadow-xl rounded-md py-5 px-4 md:py-10 md:px-8 flex flex-col gap-4 dark:bg-(--dark-bg-secondary) dark:text-white">
        <div className="flex gap-2 flex-col justify-center items-center">
          <img src="/favicon.png" alt="Logo" className="size-20" />
          <h2 className="font-bold text-xl text-center">Bienvenido</h2>
          <p className="text-sm text-center">Ingresa tus nuevas credenciales.</p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="required text-xs font-bold">Correo</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white" placeholder="user@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="required text-xs font-bold">Contraseña</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white" placeholder="********" />
        </div>
        <div>
          {/* TODO div for btns login provider */}
        </div>
        <div className="flex justify-center w-full">
          <input type="submit" value="Registrarme" className="btn btn--primary" title="Registrarme" aria-label="Registrarme"/>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm;