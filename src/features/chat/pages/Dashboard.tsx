import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";
import {
  addMessage,
  checkIfChatExists,
  createNewChat,
  getAllUsers,
  getMessages
} from "../services/chat.services";
import { useAuth } from "../../../context/auth.context";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/components/Loader";
import { ChatMessage, ChatUser } from "../utils/types";

function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showChatList, setShowChatList] = useState(false);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserUid, setSelectedUserUid] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

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

  const handleUserClick = async (uid: string) => {
    if (!user) return;

    setSelectedUserUid(uid);

    try {
      const chatExists = await checkIfChatExists(user.uid, uid);

      if (!chatExists) {
        await createNewChat(user.uid, uid);
      }

      const chatMessages = await getMessages(user.uid, uid);
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error al manejar la selección de usuario:", error);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!user || !selectedUserUid) return;

    try {
      await addMessage(user.uid, selectedUserUid, message);
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
    <div className="w-full h-dvh md:flex bg-white text-black">
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
          currentUserId={user?.uid as string}
        />
      </div>
    </div>
  );
}

export default Dashboard;
