import { CircleUser } from "lucide-react";
import { ChatUser } from "../utils/types";

type ChatListProps = {
  users: ChatUser[];
  onUserClick: (uid: string) => void;
  onLogout: () => void;
  onShowChatList: () => void;
};


const ChatList = ({ users, onUserClick, onLogout, onShowChatList }: ChatListProps) => {
  return (
    <div className="h-full bg-white flex flex-col text-black px-3 py-5 border-r border-r-neutral-300 dark:bg-(--dark-bg-primary) dark:text-white dark:border-none">
      <div className="flex-1 overflow-y-auto">
        <h2 className="font-bold text-xs mb-2">Usuarios</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => {onUserClick(user.id); onShowChatList()}}
              className="py-2 px-1 cursor-pointer hover:bg-neutral-100 rounded-lg dark:hover:bg-(--dark-bg-tertiary)"
              title={user.displayName || user.email}
            >
              <div className="flex items-center">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "Usuario"}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center">
                    <CircleUser className="w-5 h-5 text-neutral-500 dark:text-neutral-100" />
                  </div>
                )}
                <span className="truncate">{user.displayName || user.email}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-16 flex items-center">
        <button
          onClick={onLogout}
          className="w-full py-2 px-1 border-none focus-visible:outline-none text-center text-black rounded-xl hover:cursor-pointer hover:bg-neutral-100 dark:text-white dark:hover:text-gray-300 dark:hover:bg-(--dark-bg-tertiary)"
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ChatList;
