import { Sun } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addMessage,
  checkIfChatExists,
  createNewChat,
  getAllUsers,
  getChatbotId,
  getChatbotMessages,
  getMessages,
  sendChatbotMessage
} from "../services/chat.services";
import ChatList from "../components/ChatList";
import Loader from "../../../utils/components/Loader";
import ChatMessages from "../components/ChatMessages";
import { ChatMessage, ChatUser } from "../utils/types";
import { useAuth } from "../../../context/auth.context";
import { useTheme } from "../../../context/ThemeContext";


function Dashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme()

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [showChatList, setShowChatList] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatbotId, setChatbotId] = useState<string | null>(null);
  const [selectedUserUid, setSelectedUserUid] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersList = await getAllUsers();
        setUsers(usersList);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchChatbot = async () => {
      if (!user) return;
      try {
        const botId = await getChatbotId(user.uid);
        setChatbotId(botId);
      } catch (error) {
        console.error("Error cargando el chatbot:", error);
      }
    };

    fetchChatbot();
  }, [user]);

  const handleUserClick = async (uid: string) => {
    if (!user) return;
    setSelectedUserUid(uid);
    try {
      if (uid === chatbotId) {
        // Mensajes del chatbot
        const chatMessages = await getChatbotMessages(user.uid, chatbotId);
        setMessages(chatMessages);
      } else {
        // Chat con otros usuarios
        const chatExists = await checkIfChatExists(user.uid, uid);
        if (!chatExists) {
          await createNewChat(user.uid, uid);
        }
        const chatMessages = await getMessages(user.uid, uid);
        setMessages(chatMessages);
      }
    } catch (error) {
      console.error("Error al manejar la selección de usuario:", error);
    }
  };

  const handleSendMessage = async (message: string) => {
  if (!user || !selectedUserUid) return;

  try {
    // Guarda el mensaje del usuario
    await addMessage(user.uid, selectedUserUid, message);

    // Si es el chatbot, llama a la función dedicada
    if (selectedUserUid === chatbotId) {
      await sendChatbotMessage(user.uid, chatbotId, message);
    }

    // Actualiza los mensajes sin importar el destinatario
    const updatedMessages = await getMessages(user.uid, selectedUserUid);
    setMessages(updatedMessages);

  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
  }
};

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Hubo un error al cerrar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-dvh relative md:flex bg-white text-black">
      {loading && <Loader />}
      <div className={`h-full ${showChatList ? "block" : "hidden"} md:w-1/5 md:block`}>
        <ChatList
          onShowChatList={() => setShowChatList(false)}
          users={users}
          onUserClick={handleUserClick}
          chatbotId={chatbotId}
          onLogout={handleLogOut} />
      </div>
      <div className={`h-full w-full ${!showChatList ? "block" : "hidden"} md:block md:w-4/5`}>
        <ChatMessages
          onShowChatList={() => setShowChatList(true)}
          onSendMessage={handleSendMessage}
          messages={messages}
          selectedUserUid={selectedUserUid}
          currentUserId={user?.uid as string}
        />
      </div>

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
  );
}

export default Dashboard;
