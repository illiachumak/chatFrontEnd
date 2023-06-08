import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./ChatsPage.css";

const socket = io("https://backend.persprojchat.space");

const ChatsPage = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    socket.emit("USER:SET_USERNAME", props.user);
    socket.emit("USER:SET_USERID", props.userId);
    socket.emit("ROOM:JOIN", props.roomId);

    socket.on("ROOM:JOINED", (users) => {
      setUsers(users);
    });

    socket.on("MESSAGE:RECEIVED", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit("ROOM:LEAVE", props.roomId);
      socket.off("ROOM:JOINED");
      socket.off("MESSAGE:RECEIVED");
    };
  }, [props.user, props.roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const newMessage = {
        username: props.user || "Unknown User",
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      socket.emit("MESSAGE:SEND", newMessage);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("MESSAGE:SAVED", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("MESSAGE:SAVED");
    };
  }, []);

  return (
    <div className="chats-container">
      <div className="sidebar">
        <h3>Users in Chat</h3>
        <ul>
          {users.map((user) => (
            <li key={user.username}>
              <div className="user-avatar"></div>
              <div className="user-info">
                <div className="username">{user.username || "Unknown User"}</div>
                <span className={`status-indicator ${user.status}`}></span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-area">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.username === props.user ? "my-message" : ""}`}
            >
              <div className="user-avatar"></div>
              <div className={`message-content ${message.username === props.user ? "my-message-content" : ""}`}>
                <div className={` ${message.username === props.user ? "my-username" : "username"} `}>{message.username}</div>
                <div className={` ${message.username === props.user ? "text my-text" : "text"} `}>{message.text}</div>
                <div className={` ${message.username === props.user ? "my-message-timestamp" : "message-timestamp"} `}>{message.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatsPage;
