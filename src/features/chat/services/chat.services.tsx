import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { AuthUser } from "../../auth/utils/types";
import { ChatMessage, ChatUser } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import { getAssistantReply } from "./openai.services";

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
    await initializeChatbotCollection(user.uid);
  } catch (error) {
    console.error("Error al crear el usuario en Firestore:", error);
    throw error;
  }
};

export const initializeChatbotCollection = async (uid: string): Promise<void> => {
  try {
    const chatbotId = uuidv4();
    const chatbotRef = doc(db, "users", uid, "chatbot", chatbotId);

    await setDoc(chatbotRef, {
      title: "Asistente personal",
      createdAt: serverTimestamp(),
    });

    const messagesRef = collection(chatbotRef, "messages");

    await addDoc(messagesRef, {
      sender: "assistant",
      text: "Hola, soy tu asistente personal. ¿En qué puedo ayudarte hoy?",
      createdAt: serverTimestamp(),
    });

  } catch (error) {
    console.error("Error al inicializar la colección chatbot:", error);
    throw error;
  }
};

export const addMessage = async (uidSender: string, uidReceiver: string, messageText: string): Promise<void> => {
  try {
    const message = {
      text: messageText,
      createdAt: serverTimestamp(),
      senderId: uidSender,
    };

    // 🧠 Si el chat es consigo mismo, escribe solo una vez
    if (uidSender === uidReceiver) {
      const selfRef = collection(db, "users", uidSender, "chats", uidReceiver, "messages");
      await addDoc(selfRef, message);
    } else {
      const senderRef = collection(db, "users", uidSender, "chats", uidReceiver, "messages");
      const receiverRef = collection(db, "users", uidReceiver, "chats", uidSender, "messages");

      await Promise.all([
        addDoc(senderRef, message),
        addDoc(receiverRef, message),
      ]);
    }
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

export const getChatbotId = async (uid: string): Promise<string> => {
  try {
    const chatbotRef = collection(db, "users", uid, "chatbot");
    const snapshot = await getDocs(chatbotRef);

    if (!snapshot.empty) {
      return snapshot.docs[0].id;
    } else {
      throw new Error("No se encontró un chatbot para este usuario.");
    }
  } catch (error) {
    console.error("Error al obtener el chatbotId:", error);
    throw error;
  }
};

export const getChatbotMessages = async (uid: string, chatbotId: string): Promise<ChatMessage[]> => {
  const messagesRef = collection(db, "users", uid, "chatbot", chatbotId, "messages");
  const q = query(messagesRef, orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ChatMessage[];
};

export const sendChatbotMessage = async (uid: string, chatbotId: string, message: string): Promise<void> => {
  try {
    // 1. Guardar mensaje del usuario
    await addMessageToChatbot(uid, chatbotId, "user", message);
    // 2. Obtener respuesta del asistente
    const assistantReply = await getAssistantReply(message);
    // 3. Guardar respuesta del asistente
    await addMessageToChatbot(uid, chatbotId, "assistant", assistantReply);
  } catch (error) {
    console.error("Error en sendChatbotMessage:", error);
    throw error;
  }
};

export const addMessageToChatbot = async (
  uid: string,
  chatbotId: string,
  sender: "user" | "assistant",
  text: string
) => {
  const chatbotRef = collection(db, "users", uid, "chatbot", chatbotId, "messages");

  const message = {
    sender,
    text,
    createdAt: serverTimestamp(),
  };

  await addDoc(chatbotRef, message);
};