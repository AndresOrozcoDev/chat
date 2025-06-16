import { ChangeEvent, KeyboardEvent, useState } from "react";

type ChatMessagesProps = {
  messages: any[];
  onShowChatList: () => void;
  selectedUserUid: string | null;
  onSendMessage: (message: string) => void;
};

const ChatMessages = ({ messages, onShowChatList, selectedUserUid, onSendMessage }: ChatMessagesProps) => {
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.key === "Enter" && (!("shiftKey" in e) || !e.shiftKey) && message.trim()) {
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
    <div className="h-full flex flex-col bg-whit dark:bg-(--dark-bg-secondary) dark:text-white">

      <div className="w-full h-20 flex items-center justify-between md:justify-center px-4 border-b-1 border-neutral-300 dark:border-(--dark-bg-tertiary)">
        <button className="md:hidden text-blue-600 font-semibold w-20 text-left cursor-pointer"
          onClick={onShowChatList}
        >
          Chats
        </button>
        <p className="font-bold text-lg">{selectedUserUid ? selectedUserUid : "Selecciona un usuario"}</p>
        <div className="md:hidden w-20" />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div>No hay mensajes aún</div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="my-2 p-3 w-3/4 bg-gray-100 rounded-xl rounded-tr-none dark:bg-(--dark-bg-tertiary) dark:text-white">
              <p>{message.text}</p>
            </div>
          ))
        )}
      </div>

      <div className="w-full h-24 flex px-4 items-center">
        <input 
          type="text" 
          onChange={handleChange} 
          value={message} 
          disabled={messages.length === 0}
          onKeyDown={handleKeyDown} 
          className="w-full h-14 bg-white border text-black border-neutral-300 px-3 outline-none rounded-xl disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-(--dark-bg-primary) dark:bg-(--dark-bg-tertiary) dark:border-none dark:text-white" 
          placeholder="Responder..." />
      </div>

    </div>
  );
};

export default ChatMessages;
