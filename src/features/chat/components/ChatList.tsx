type ChatListProps = {
  users: any[];
  onUserClick: (uid: string) => void;
};

const ChatList = ({ users, onUserClick  }: ChatListProps) => {

  const handleClick = (uid: string) => {
    onUserClick(uid);
  };

  return (
    <div className="h-full bg-white text-black px-3 py-5 border-r border-r-neutral-300 dark:bg-(--dark-bg-primary) dark:text-white dark:border-none">
      <h2 className="font-bold text-xs mb-2">Usuarios</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} onClick={() => handleClick(user.id)} className="py-1 cursor-pointer hover:bg-neutral-100 rounded-lg">
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
  )
}

export default ChatList;