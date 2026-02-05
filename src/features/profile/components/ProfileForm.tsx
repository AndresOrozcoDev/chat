import { useState } from "react";
import { AuthUser } from "../../auth/utils/types";
import { CircleUser, ArrowLeft } from "lucide-react";

type ProfileFormProps = {
  user: AuthUser;
  onSubmitGeneral: (formData: { displayName: string; avatar?: File }) => void;
  onSubmitPassword: (formData: { newPassword: string }) => void;
  onBack: () => void;
};

const ProfileForm = ({ user, onSubmitGeneral, onSubmitPassword, onBack }: ProfileFormProps) => {
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [isVisibleNewpass, setIsVisibleNewpass] = useState(false);

  // Manejar previsualización de imagen
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Función para enviar los datos generales (nombre + avatar)
  const handleSubmitGeneral = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitGeneral({ displayName, avatar: selectedFile || undefined });
  };

  // Función para enviar nueva contraseña
  const handleSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitPassword({ newPassword });
    setNewPassword("");
    setIsVisibleNewpass(false);
  };

  return (
    <div className="h-full w-full flex items-center justify-center overflow-y-auto bg-neutral-100 text-black dark:bg-(--dark-bg-primary)">
      <div className="overflow-y-auto max-h-[80%] bg-white w-5/6 md:w-3/6 shadow-xl rounded-md py-5 px-4 md:py-10 md:px-8 flex flex-col gap-6 dark:bg-(--dark-bg-secondary) dark:text-white">
        {/* Header */}
        <div className="relative flex items-center justify-center">
          <ArrowLeft className="absolute left-0 cursor-pointer" onClick={onBack} />
          <h2 className="font-bold text-xl text-center">Tus datos!</h2>
        </div>

        {/* Formulario general: imagen + nombre */}
        <form onSubmit={handleSubmitGeneral} className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-2"
            />
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-neutral-300 dark:border-neutral-600"
              />
            ) : (
              <CircleUser className="w-20 h-20 text-neutral-500 dark:text-neutral-100" />
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="displayname" className="text-xs font-bold">Full Name</label>
            <input
              type="text"
              id="displayname"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full h-10 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white"
              placeholder="Full Name"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          >
            Guardar datos
          </button>
        </form>

        {/* Formulario de contraseña */}
        <form onSubmit={handleSubmitPassword} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 relative">
            <button
              onClick={(e) => { e.preventDefault(); setIsVisibleNewpass(!isVisibleNewpass); }}
              className="absolute top-0 right-0 text-xs font-bold text-neutral-500 cursor-pointer"
            >
              Editar
            </button>
            <label htmlFor="password" className="text-xs font-bold">Contraseña</label>
            <input
              type="password"
              id="password"
              disabled
              value="********"
              className="w-full h-10 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white"
            />
          </div>

          {isVisibleNewpass && (
            <div className="flex flex-col gap-2 relative mt-3">
              <label htmlFor="newpassword" className="text-xs font-bold">Contraseña</label>
              <input
                type="password"
                id="newpassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-10 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white"
                placeholder="New password"
              />
              <button
                type="submit"
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
              >
                Cambiar contraseña
              </button>
            </div>
          )}
        </form>

      </div>
    </div>
  );
};

export default ProfileForm;
