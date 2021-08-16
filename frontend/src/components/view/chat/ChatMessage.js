import React from "react";
import ChatInput from "./ChatInput";

export default function ChatMessage({ send, conversation, user }) {
  return (
    <div className="w-full px-5 flex flex-col justify-between border-l-2">
      <div className="flex flex-col mt-5 overflow-y-auto h-my-screen">
        {conversation.map((message, index) => {
          return message.user === user.username ? (
            <div key={index} className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                <div className="font-bold underline">{message.user}:</div>
                <div className="ml-1 break-words min-w-mini max-w-sm md:max-w-2xl lg:max-w-3xl">
                  {message.msg}
                </div>
                {message.date && (
                  <div className="text-right text-sm font-semibold mt-2">
                    {message.date}
                  </div>
                )}
              </div>
              {user.img ? (
                <img
                  src={user.img}
                  className="object-cover h-8 w-8 rounded-full"
                  alt="icon-group"
                />
              ) : (
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt="icon-group"
                />
              )}
            </div>
          ) : (
            <div key={index} className="flex justify-start mb-4">
              <div className="ml-2 py-3 px-4 bg-green-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                <div className="font-bold underline">{message.user}:</div>
                <div className="ml-1 break-words min-w-mini max-w-sm md:max-w-2xl lg:max-w-3xl">
                  {message.msg}
                </div>
                {message.date && (
                  <div className="text-right text-sm font-semibold mt-2">
                    {message.date}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="py-5">
        <ChatInput send={send} />
      </div>
    </div>
  );
}
