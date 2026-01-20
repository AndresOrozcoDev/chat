import { ChatMessage, ChatUser } from "../utils/types";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { AlignLeft} from 'lucide-react'

type ChatMessagesProps = {
  messages: ChatMessage[];
  onShowChatList: () => void;
  selectedUserUid: string | null;
  onSendMessage: (message: string) => void;
  selectedUser: ChatUser | null;
  currentUserId: string;
};


const ChatMessages = ({ messages, onShowChatList, selectedUserUid, onSendMessage,  selectedUser, currentUserId }: ChatMessagesProps) => {
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && message.trim()) {
      e.preventDefault();
      handleSubmitMessage();
    }
  };

  const handleSubmitMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message.trim());
    setMessage("");
  };

  return (
    <div className="h-full flex flex-col bg-white text-black dark:bg-(--dark-bg-secondary) dark:text-white">
      <div className="w-full h-20 flex items-center justify-between md:justify-center px-4 border-b border-neutral-300 dark:border-(--dark-bg-tertiary)">
        <button
          className="md:hidden text-blue-600 font-semibold w-20 text-left cursor-pointer"
          onClick={onShowChatList}
        >
          <AlignLeft className="w-6 h-6 text-black dark:text-white" />
        </button>
        <p className="font-bold text-lg truncate">
          {selectedUser?.email ?? "Selecciona un usuario"}
        </p>
        <div className="md:hidden w-20" />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
    <div className="text-neutral-500">No hay mensajes aún</div>
  ) : (
    messages.map((msg) => {
      const isMyMessage = msg.senderId === currentUserId;

      return (
        <div
          key={msg.id}
          className={`my-2 p-3 w-fit max-w-[70%] rounded-xl ${
            isMyMessage
              ? "ml-auto bg-blue-400 text-white rounded-tr-none dark:bg-neutral-600 dark:text-white"
              : "mr-auto bg-gray-100 text-black rounded-tl-none dark:bg-neutral-500 dark:text-white"
          }`}
        >
          <p>{msg.text}</p>
        </div>
      );
    })
  )}
      </div>

      <div className="w-full h-24 flex px-4 items-center">
        <input
          type="text"
          onChange={handleChange}
          value={message}
          disabled={!selectedUserUid}
          onKeyDown={handleKeyDown}
          className="w-full h-14 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-(--dark-bg-primary) dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white"
          placeholder="Escribe un mensaje..."
        />
      </div>
    </div>
  );
};

export default ChatMessages;
