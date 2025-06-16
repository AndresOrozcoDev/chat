import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
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

export const addMessage = async (uidSender: string, uidReceiver: string, messageText: string) => {
  try {
    // Creamos el mensaje para el chat del emisor
    const messageRefSender = collection(db, "users", uidSender, "chats", uidReceiver, "messages");
    const newMessageSender = await addDoc(messageRefSender, {
      text: messageText,
      createdAt: serverTimestamp(),
    });

    // Creamos el mensaje para el chat del receptor
    const messageRefReceiver = collection(db, "users", uidReceiver, "chats", uidSender, "messages");
    await addDoc(messageRefReceiver, {
      text: messageText,
      createdAt: serverTimestamp(),
    });

    console.log("Mensaje enviado correctamente en ambos chats");
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    throw error;
  }
};

export const getMessages = async (uidAuth: string, uidReceiver: string) => {
  try {
    // Acceder a la colección de mensajes del chat entre el usuario autenticado y el receptor
    const messagesRef = collection(db, "users", uidAuth, "chats", uidReceiver, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return messages;
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    throw error;
  }
};

// Verifica si existe un chat entre el usuario autenticado y el receptor
export const checkIfChatExists = async (uidAuth: string, uidReceiver: string) => {
  try {
    const chatRef = collection(db, "users", uidAuth, "chats");
    const q = query(chatRef, where("userId", "==", uidReceiver));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Si no está vacío, significa que ya existe un chat
  } catch (error) {
    console.error("Error al verificar el chat:", error);
    throw error;
  }
};

// Crear un nuevo chat entre el usuario autenticado y el receptor
export const createNewChat = async (uidAuth: string, uidReceiver: string) => {
  try {
    const chatRef = collection(db, "users", uidAuth, "chats");
    const newChatRef = doc(chatRef, uidReceiver);
    await setDoc(newChatRef, {
      userId: uidReceiver,
      createdAt: new Date(),
      messages: [],
    });

    // También se debe crear un chat para el receptor con el usuario autenticado
    const chatReceiverRef = collection(db, "users", uidReceiver, "chats");
    await setDoc(doc(chatReceiverRef, uidAuth), {
      userId: uidAuth,
      createdAt: new Date(),
      messages: [],
    });

    console.log("Nuevo chat creado entre los usuarios");
  } catch (error) {
    console.error("Error al crear el chat:", error);
    throw error;
  }
};