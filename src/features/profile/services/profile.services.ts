import { updatePassword, updateProfile, User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase-config";

interface UpdateUserData {
  user: User;
  displayName?: string;
  avatarFile?: File;
}

export const changePassword = async (user: User, newPassword: string): Promise<void> => {
  try {
    await updatePassword(user, newPassword);
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async ({
  user,
  displayName,
  avatarFile,
}: UpdateUserData) => {
  try {
    let avatarURL: string | undefined;

    // 1️⃣ Subir avatar
    if (avatarFile) {
      const storageRef = ref(storage, `avatars/${user.uid}/${avatarFile.name}`);
      await uploadBytes(storageRef, avatarFile);
      avatarURL = await getDownloadURL(storageRef);
    }

    // 2️⃣ ACTUALIZAR FIREBASE AUTH (FUENTE DE VERDAD)
    if (displayName || avatarURL) {
      await updateProfile(user, {
        ...(displayName && { displayName }),
        ...(avatarURL && { photoURL: avatarURL }),
      });

      // 🔁 Fuerza refresco del user en memoria
      await user.reload();
    }

    // 3️⃣ SINCRONIZAR FIRESTORE (COPIA)
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      ...(displayName && { displayName }),
      ...(avatarURL && { photoURL: avatarURL }),
    });

    return {
      success: true,
      displayName,
      photoURL: avatarURL,
    };
  } catch (error) {
    console.error("Error actualizando datos de usuario:", error);
    throw error;
  }
};