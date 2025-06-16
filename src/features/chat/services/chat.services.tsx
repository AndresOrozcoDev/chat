import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { AuthUser } from "../../auth/utils/types";
import { ChatMessage, ChatUser } from "../utils/types";

const usersRef = collection(db, "users");
const userChatsRef = (uid: string) => collection(db, "users", uid, "chats");

export const getAllUsers = async (): Promise<ChatUser[]> => {
  try {
    const usersSnapshot = await getDocs(usersRef);
    return usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ChatUser[];
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const createUser = async (user: AuthUser): Promise<void> => {
  try {
    const userRef = doc(usersRef, user.uid);
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error al crear el usuario en Firestore:", error);
    throw error;
  }
};

export const addMessage = async (uidSender: string, uidReceiver: string, messageText: string): Promise<void> => {
  try {
    const senderRef = collection(db, "users", uidSender, "chats", uidReceiver, "messages");
    const receiverRef = collection(db, "users", uidReceiver, "chats", uidSender, "messages");

    const message = {
      text: messageText,
      createdAt: serverTimestamp(),
      senderId: uidSender,
    };

    await Promise.all([
      addDoc(senderRef, message),
      addDoc(receiverRef, message),
    ]);
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    throw error;
  }
};

export const getMessages = async (uidAuth: string, uidReceiver: string): Promise<ChatMessage[]> => {
  try {
    const messagesRef = collection(db, "users", uidAuth, "chats", uidReceiver, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ChatMessage[];
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    throw error;
  }
};

export const checkIfChatExists = async (uidAuth: string, uidReceiver: string): Promise<boolean> => {
  try {
    const chatRef = userChatsRef(uidAuth);
    const q = query(chatRef, where("userId", "==", uidReceiver));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error al verificar el chat:", error);
    throw error;
  }
};

export const createNewChat = async (uidAuth: string, uidReceiver: string): Promise<void> => {
  try {
    const now = serverTimestamp();

    await Promise.all([
      setDoc(doc(userChatsRef(uidAuth), uidReceiver), {
        userId: uidReceiver,
        createdAt: now,
      }),
      setDoc(doc(userChatsRef(uidReceiver), uidAuth), {
        userId: uidAuth,
        createdAt: now,
      })
    ]);
  } catch (error) {
    console.error("Error al crear el chat:", error);
    throw error;
  }
};