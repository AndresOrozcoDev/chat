import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { AuthUser } from "../../auth/utils/types";

export const getAllUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const usersList = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return usersList;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const createUser = async (user: AuthUser): Promise<void> => {
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      chats: [],
    });
    console.log("Usuario creado en Firestore con timestamp");

  } catch (error) {
    console.error("Error al crear el usuario en Firestore:", error);
    throw error;
  }
};