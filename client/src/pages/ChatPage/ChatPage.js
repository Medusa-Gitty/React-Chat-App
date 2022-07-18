import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const { data } = await axios.get("http://localhost:5000/api/chat");
    console.log(data);
    setChats(data);
  };

  return (
    <div>
      {chats.map((ch) => (
        <div key={ch._id}>{ch.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
