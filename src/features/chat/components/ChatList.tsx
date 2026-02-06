import { CircleUser } from "lucide-react";
import { ChatUser } from "../utils/types";
import { useAuth } from "../../../context/auth.context";

type ChatListProps = {
  users: ChatUser[];
  onUserClick: (uid: string) => void;
  onLogout: () => void;
  onShowChatList: () => void;
};


const ChatList = ({ users, onUserClick, onLogout, onShowChatList }: ChatListProps) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="h-full bg-white flex flex-col text-black px-3 py-5 border-r border-r-neutral-300 dark:bg-(--dark-bg-primary) dark:text-white dark:border-none">
      <div className="flex-1 overflow-y-auto">
        <a className="flex flex-row my-2 py-2 px-1 rounded-lg items-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-(--dark-bg-tertiary)" href="/account">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "Usuario"}
              className="w-10 h-10 rounded-full mr-4 object-cover"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center">
              <CircleUser className="w-10 h-10 rounded-full mr-4 text-neutral-500 dark:text-neutral-100" />
            </div>
          )}
          <p className="truncate">{user ? (user.displayName || user.email) : 'Usuario'}</p>
        </a>
        <h2 className="font-bold text-xs mb-2">Usuarios</h2>
        <ul className="space-y-2">
          {users.map((contact) => (
            <li
              key={contact.id}
              onClick={() => { onUserClick(contact.id); onShowChatList() }}
              className="py-2 px-1 cursor-pointer hover:bg-neutral-100 rounded-lg dark:hover:bg-(--dark-bg-tertiary)"
              title={contact.displayName || contact.email}
            >
              <div className="flex items-center">
                {contact.photoURL ? (
                  <img
                    src={contact.photoURL}
                    alt={contact.displayName || "Usuario"}
                    className="w-10 h-10 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center">
                    <CircleUser className="w-5 h-5 text-neutral-500 dark:text-neutral-100" />
                  </div>
                )}
                <span className="truncate">{contact.displayName || contact.email}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 items-center">
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
