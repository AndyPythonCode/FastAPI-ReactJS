import React, { useRef } from "react";

export default function ChatInput({ send }) {
  const inputMessage = useRef(null);

  const handlerConversation = (event) => {
    event.preventDefault();
    send(inputMessage.current.value);
    inputMessage.current.value = "";
  };

  return (
    <form onSubmit={handlerConversation}>
      <input
        className="w-full bg-gray-200 py-5 px-3 rounded-xl"
        type="text"
        placeholder="type your message here..."
        required
        ref={inputMessage}
        // html5 required Message
        onInvalid={(e) => e.target.setCustomValidity("Enter one word at least")}
      />
    </form>
  );
}
