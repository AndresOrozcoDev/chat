import { useState } from "react";
import { AuthUser } from "../../auth/utils/types";
import { CircleUser } from "lucide-react";

type ProfileFormProps = {
    user: AuthUser;
    onSubmit: (formData: { newPassword: string }) => void;
    messages: string;
};

const ProfileForm = ({ user, onSubmit, messages }: ProfileFormProps) => {
    const [newPassword, setNewPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [isVisibleNewpass, setIsVisibleNewpass] = useState(false);

    const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ newPassword });
        setIsVisibleNewpass(false);
        setNewPassword("");
    };
    return (
        <div className="h-full w-full flex items-center justify-center overflow-y-auto bg-neutral-100 text-black dark:bg-(--dark-bg-primary)">
            <div className="overflow-y-auto max-h-[80%] bg-white w-5/6 md:w-3/6 shadow-xl rounded-md py-5 px-4 md:py-10 md:px-8 flex flex-col gap-6 dark:bg-(--dark-bg-secondary) dark:text-white">
                <h2 className="font-bold text-xl text-center">Tus datos!</h2>
                <form >
                    <div className="flex flex-col items-center justify-center">
                        <input type="file" name="" id="" />
                        <CircleUser className="w-20 h-20 rounded-full mr-4 text-neutral-500 dark:text-neutral-100" />
                    </div>
                </form>
                <form >
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="email" className="text-xs font-bold">Correo</label>
                        <input
                            type="email"
                            id="email"
                            disabled
                            value={user.email ?? ''}
                            className="w-full h-10 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-(--dark-bg-primary) dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white" />
                    </div>
                    <div className="flex flex-col gap-2 relative mt-3">
                        <label htmlFor="fullname" className="text-xs font-bold">Full name</label>
                        <input
                            type="password"
                            id="fullname"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-full h-10 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-(--dark-bg-primary) dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white"
                            placeholder="Andres Orozco"
                        />
                    </div>
                </form>
                <form onSubmit={handleChangePassword}>
                    <div className="flex flex-col gap-2 relative">
                        <button onClick={(e) => { e.preventDefault(); setIsVisibleNewpass(!isVisibleNewpass) }} className="absolute top-0 right-0 text-xs font-bold text-neutral-500 cursor-pointer">Editar</button>
                        <label htmlFor="password" className="text-xs font-bold">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            disabled
                            value="********"
                            className="w-full h-10 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-(--dark-bg-primary) dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white"
                        />
                    </div>
                    {isVisibleNewpass &&
                        <div className="flex flex-col gap-2 relative mt-3">
                            <label htmlFor="newpassword" className="text-xs font-bold">Contraseña</label>
                            <input
                                type="password"
                                id="newpassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full h-10 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-(--dark-bg-primary) dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white"
                                placeholder="New password"
                            />
                            <button className="btn btn--primary mt-2" aria-label="Enviar" title="Enviar">Enviar</button>
                        </div>
                    }
                </form>
                <p className="text-sm mt-2 text-center">
                    {messages}
                </p>
            </div>
        </div>
    )
}

export default ProfileForm;