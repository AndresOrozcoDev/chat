type ChatListProps = {
  users: any[];
  onUserClick: (uid: string) => void;
  onLogout: () => void;
};

const ChatList = ({ users, onUserClick, onLogout }: ChatListProps) => {

  const handleClick = (uid: string) => {
    onUserClick(uid);
  };

  const handleLogOut = () => {
    onLogout();
  }

  return (
    <div className="h-full bg-white flex flex-col text-black px-3 py-5 border-r border-r-neutral-300 dark:bg-(--dark-bg-primary) dark:text-white dark:border-none">
      <div className="flex-1 overflow-y-auto">
        <h2 className="font-bold text-xs mb-2">Usuarios</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} onClick={() => handleClick(user.id)} className="py-2 px-1 cursor-pointer hover:bg-neutral-100 rounded-lg dark:hover:bg-(--dark-bg-tertiary)">
              <div className="flex flex-row items-center">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span className="overflow-hidden text-ellipsis">{user.displayName || user.email}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-16 flex items-center text-center">
        <ul className="w-full">
          <li onClick={handleLogOut} className="py-2 px-1 cursor-pointer" aria-label="Cerrar sesion" title="Cerrar sesion">
            <span>Cerrar sesion</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ChatList;