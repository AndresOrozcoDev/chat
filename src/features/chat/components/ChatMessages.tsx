type ChatMessagesProps = {
  onShowChatList: () => void;
};

const ChatMessages = ({ onShowChatList }: ChatMessagesProps) => {

  return (
    <div className="h-full flex flex-col bg-whit dark:bg-(--dark-bg-secondary) dark:text-white">

      <div className="w-full h-20 flex items-center justify-between md:justify-center px-4 border-b-1 border-neutral-300 dark:border-(--dark-bg-tertiary)">
        <button className="md:hidden text-blue-600 font-semibold w-20 text-left cursor-pointer"
          onClick={onShowChatList}
        >
          Chats
        </button>
        <p className="font-bold text-lg">Header</p>
        <div className="md:hidden w-20" />
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        Messages
      </div>

      <div className="w-full h-24 flex px-4 items-center">
        <input type="text" className="w-full h-14 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white" placeholder="Responder..." />
      </div>

    </div>
  );
};

export default ChatMessages;
