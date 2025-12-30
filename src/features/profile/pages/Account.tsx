import { Sun } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth.context";
import { useTheme } from "../../../context/ThemeContext";
import ProfileForm from '../components/ProfileForm';
import Loader from '../../../shared/components/Loader';
import { changePassword } from '../services/profile.services';

function Account() {
    const navigate = useNavigate();
    const { user, firebaseUser } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState("");


    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleChangePassword = async ({ newPassword }: { newPassword: string }) => {
        if (!firebaseUser) return;

    try {
      setLoading(true);
      await changePassword(firebaseUser, newPassword);
      setMessages("✅ Constraseña actualizado correctamente.");
    } catch (err) {
      console.error(err);
      setMessages("❌ Error al actualizar la contraseña.");
    } finally {
      setLoading(false);
    }
    }

    return (
        <div className='w-dvw h-dvh relative bg-neutral-100 text-black dark:bg-(--dark-bg-primary) dark:text-white'>
            {loading && <Loader />}
            {user && <ProfileForm user={user} onSubmit={handleChangePassword} messages={messages}/>}

            <div className='bg-neutral-300 rounded-full absolute p-3 right-3 bottom-3 dark:bg-white' title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}>
                <Sun
                    color="black"
                    size={24}
                    onClick={toggleTheme}
                    className='cursor-pointer'
                    aria-label={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
                />
            </div>
        </div>
    )
}

export default Account;