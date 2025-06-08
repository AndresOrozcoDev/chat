import { useState } from "react";
import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";

function Dashboard() {
  const [showChatList, setShowChatList] = useState(false);

  return (
    <div className='w-full h-dvh md:flex bg-white text-black'>

      <div className={`h-full ${showChatList ? "block" : "hidden"} md:w-2/5 md:block`}>
        <ChatList />
      </div>

      <div className={`h-full w-full ${!showChatList ? "block" : "hidden"} md:block md:w-3-5`} >
        <ChatMessages onShowChatList={() => setShowChatList(true)} />
      </div>

    </div>
  );
}

export default Dashboard;