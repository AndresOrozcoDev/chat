import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";
import { addMessage, checkIfChatExists, createNewChat, getAllUsers, getMessages } from "../services/chat.services";
import { useAuth } from "../../../context/auth.context";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/components/Loader";

function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showChatList, setShowChatList] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserUid, setSelectedUserUid] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersList = await getAllUsers();
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        setLoading(false)
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = async (uid: string) => {
    if (!user) return;
    setSelectedUserUid(uid)
    console.log(`El UID del usuario seleccionado es: ${uid}`);
    const chatExists = await checkIfChatExists(user.uid, uid);

    if (chatExists) {
      console.log("El chat ya existe. Continuando...");
      const messages = await getMessages(user.uid, uid);
      setMessages(messages);
    } else {
      console.log("El chat no existe. Creando nuevo chat...");
      await createNewChat(user.uid, uid);
      const messages = await getMessages(user.uid, uid);
      setMessages(messages);
    }
  };

  const fetchMessages = async (uid: string) => {
    if (user && uid) {
      const chatMessages = await getMessages(user.uid, uid);
      setMessages(chatMessages);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (user && selectedUserUid) {
      console.log('mensaje:', message);
      console.log('user id auth:', user.uid);
      console.log('user id receptor:', selectedUserUid);
      try {
        await addMessage(user.uid, selectedUserUid, message);
        fetchMessages(selectedUserUid);
      } catch (error) {
        console.error("Error al enviar el mensaje", error);
      }
    }
  };

  const handleLogOut = async () => {
    setLoading(true);
    try{
      await logout();
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Hubo un error:', error);
      
    }
  }

  return (
    <div className='w-full h-dvh md:flex bg-white text-black'>

      {loading && <Loader />}

      <div className={`h-full ${showChatList ? "block" : "hidden"} md:w-1/5 md:block`}>
        <ChatList users={users} onUserClick={handleUserClick} onLogout={handleLogOut} />
      </div>

      <div className={`h-full w-full ${!showChatList ? "block" : "hidden"} md:block md:w-4/5`} >
        <ChatMessages onShowChatList={() => setShowChatList(true)} onSendMessage={handleSendMessage} messages={messages} selectedUserUid={selectedUserUid}/>
      </div>

    </div>
  );
}

export default Dashboard;
