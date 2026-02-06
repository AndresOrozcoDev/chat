import { Sun } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth.context";
import { useTheme } from "../../../context/theme.context";
import ProfileForm from '../components/ProfileForm';
import Loader from '../../../shared/components/Loader';
import { changePassword, updateUserData } from '../services/profile.services';
import { useNotification } from "../../../context/notify.context";

function Account() {
    const navigate = useNavigate();
    const { user, firebaseUser } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [loading, setLoading] = useState(false);
    const { success, error } = useNotification();


    useEffect(() => {
        if (!user) {
            navigate("/");
        }        
    }, [user, navigate]);

    const handleChangeGeneral = async ({ displayName, avatar }: { displayName: string; avatar?: File }) => {
        if (!firebaseUser) return;
        try {
            setLoading(true);
            await updateUserData({ user: firebaseUser!, displayName, avatarFile: avatar });
            success("Perfil actualizado correctamente");
        } catch (err: any) {
            error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async ({ newPassword }: { newPassword: string }) => {
        if (!firebaseUser) return;
        try {
            setLoading(true);
            await changePassword(firebaseUser, newPassword);
            success("Contraseña actualizada correctamente");
        } catch (err: any) {
            error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate("/dashboard");
    };

    return (
        <div className='w-dvw h-dvh relative bg-neutral-100 text-black dark:bg-(--dark-bg-primary) dark:text-white'>
            {loading && <Loader />}
            {user && <ProfileForm user={user} onSubmitPassword={handleChangePassword} onSubmitGeneral={handleChangeGeneral} onBack={handleBack} />}

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