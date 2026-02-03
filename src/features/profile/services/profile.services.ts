import { updatePassword, User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase-config";

interface UpdateUserData {
  uid: string;
  fullname?: string;
  avatarFile?: File;
}

export const changePassword = async (user: User, newPassword: string): Promise<void> => {
  try {
    await updatePassword(user, newPassword);
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async ({ uid, fullname, avatarFile }: UpdateUserData) => {
  try {
    let avatarURL: string | undefined;

    if (avatarFile) {
      const storageRef = ref(storage, `avatars/${uid}/${avatarFile.name}`);
      await uploadBytes(storageRef, avatarFile);
      avatarURL = await getDownloadURL(storageRef);
    }

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...(fullname && { fullname }),
      ...(avatarURL && { avatar: avatarURL }),
    });

    return { success: true, avatarURL };
  } catch (error) {
    console.error("Error actualizando datos de usuario:", error);
    throw error;
  }
};