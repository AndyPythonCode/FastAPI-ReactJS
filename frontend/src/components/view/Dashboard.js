import { LoginContext } from "../context/auth";
import { useState, useEffect, useRef, useContext } from "react";
import ChatSidebar from "./chat/ChatSidebar";
import ChatMessage from "./chat/ChatMessage";

export default function Dashboard() {
  /* 
    Básicamente, usamos UseState en esos casos, en los que el valor del estado debe
    actualizarse con la re-renderización.

    Cuando desee que su información persista durante la vida útil del componente, 
    utilizará UseRef porque simplemente no es para trabajar con la re-renderización.
  */

  const { user } = useContext(LoginContext); //user global
  const ws = useRef(null); //websocket
  const [conversation, setConversation] = useState([]); //database conversation
  const [online, setOnline] = useState(0);
  const [people, setPeople] = useState([]);

  const wsSendMessage = (msg) => {
    ws.current.send(
      JSON.stringify({ message: msg, username: user.username, img: user.img }) // Object to JSON
    );
  };

  // Open and Close Websocket
  useEffect(() => {
    // When open (backend send message 'Join')
    ws.current = new WebSocket(`ws://localhost:8000/chat/ws/${user.username}`);

    return () => {
      // When close (backend send message 'Left')
      ws.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ws.current.onmessage = (event) => {
      let current = JSON.parse(event.data); //JSON string into JS object
      setConversation([
        ...conversation,
        {
          msg: current.msg.message,
          user: current.msg.username,
          date: current.date,
          img: current.msg.img,
        },
      ]);
      current.people && setPeople(current.people);
      setOnline(current.online);
    };
  });

  return (
    // <!-- Chatting -->
    <div className="mx-2">
      <div className="flex flex-row justify-between bg-white">
        <ChatMessage
          send={wsSendMessage}
          conversation={conversation}
          user={user}
        />

        <ChatSidebar people={people} online={online} />
      </div>
    </div>
  );
}
