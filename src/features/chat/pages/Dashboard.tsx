import { Sun } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addMessage,
  checkIfChatExists,
  createNewChat,
  getMessages,
  getUserById,
  subscribeToUsers,
} from "../services/chat.services";
import ChatList from "../components/ChatList";
import Loader from "../../../shared/components/Loader";
import ChatMessages from "../components/ChatMessages";
import { ChatMessage, ChatUser } from "../utils/types";
import { useAuth } from "../../../context/auth.context";
import { useTheme } from "../../../context/theme.context";
import { useNotification } from '../../../context/notify.context';


function Dashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { error } = useNotification();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [showChatList, setShowChatList] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedUserUid, setSelectedUserUid] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = subscribeToUsers(
      (usersList) => {
        setUsers(usersList);
        setLoading(false);
      },
      (err) => {
        error(err);
        setLoading(false);
      }
    );

    // Limpieza al desmontar
    return () => unsubscribe();
  }, []);

  const handleUserClick = async (uid: string) => {
    if (!user) return;
    setSelectedUserUid(uid);
    try {
      const chatExists = await checkIfChatExists(user.uid, uid);
      if (!chatExists) {
        await createNewChat(user.uid, uid);
      }
      const [chatMessages, chatUser] = await Promise.all([
        getMessages(user.uid, uid),
        getUserById(uid),
      ]);

      setMessages(chatMessages);
      setSelectedUser(chatUser);

    } catch (error) {
      console.error("Error al manejar la selección de usuario:", error);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!user || !selectedUserUid) return;

    try {
      // Guarda el mensaje del usuario
      await addMessage(user.uid, selectedUserUid, message);

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
          onLogout={handleLogOut} />
      </div>
      <div className={`h-full w-full ${!showChatList ? "block" : "hidden"} md:block md:w-4/5`}>
        <ChatMessages
          onShowChatList={() => setShowChatList(true)}
          onSendMessage={handleSendMessage}
          messages={messages}
          selectedUserUid={selectedUserUid}
          selectedUser={selectedUser}
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
