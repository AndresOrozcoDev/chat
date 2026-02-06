import { updatePassword, updateProfile, User } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

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

    // 1️⃣ Subir avatar a Storage si hay
    if (avatarFile) {
      const storageRef = ref(storage, `avatars/${user.uid}/${avatarFile.name}`);
      await uploadBytes(storageRef, avatarFile);
      avatarURL = await getDownloadURL(storageRef);
    }

    // 2️⃣ Preparar objeto de actualización
    const updateData: { displayName?: string; photoURL?: string } = {};
    if (displayName) updateData.displayName = displayName;
    if (avatarURL) updateData.photoURL = avatarURL;

    // 3️⃣ Actualizar Auth si hay cambios
    if (Object.keys(updateData).length > 0) {
      await updateProfile(user, updateData);

      // 4️⃣ Sincronizar Firestore para que otros clientes lo vean
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, updateData);

      // 5️⃣ Refrescar el usuario en memoria
    }

    return {
      success: true,
      ...updateData,
    };
  } catch (error) {
    console.error("Error actualizando datos de usuario:", error);
    throw error;
  }
};