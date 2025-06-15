import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";
import { getAllUsers } from "../services/chat.services";

function Dashboard() {
  const [showChatList, setShowChatList] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await getAllUsers();
        setUsers(usersList);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = (uid: string) => {
    console.log(`El UID del usuario seleccionado es: ${uid}`);
    // setSelectedUserUid(uid); // Aquí puedes almacenar el UID o realizar otra acción
  };

  return (
    <div className='w-full h-dvh md:flex bg-white text-black'>

      <div className={`h-full ${showChatList ? "block" : "hidden"} md:w-1/5 md:block`}>
        <ChatList users={users} onUserClick={handleUserClick} />
      </div>

      <div className={`h-full w-full ${!showChatList ? "block" : "hidden"} md:block md:w-4/5`} >
        <ChatMessages onShowChatList={() => setShowChatList(true)} />
      </div>

    </div>
  );
}

export default Dashboard;
