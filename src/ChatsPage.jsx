import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Header from "./components/Header";
import { SpeechConfig, SpeechRecognizer, AudioConfig } from "microsoft-cognitiveservices-speech-sdk";
import "./ChatsPage.css";

const socket = io("https://backend.persprojchat.space");

const ChatsPage = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [recognizer, setRecognizer] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("USER:SET_USERNAME", props.user);
    socket.emit("USER:SET_USERID", props.userId);
    socket.emit("ROOM:JOIN", props.roomId, props.photoURL);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (recognizer) {
      recognizer.stopContinuousRecognitionAsync(() => {
        recognizer.close();
        setRecognizer(null);
      });
    }

    if (message.trim() !== "") {
      const newMessage = {
        username: props.user || "Unknown User",
        text: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        photoURL: props.photoURL, // Додано фото користувача
      };
      socket.emit("MESSAGE:SEND", newMessage);
      setMessage("");
    }
  };

  const handleSpeechRecognition = () => {
    if (!recognizer) {
      const speechConfig = SpeechConfig.fromSubscription(
        "e148cba298894db0ba7d8c459ec3f892",
        "eastus"
      );
      speechConfig.speechRecognitionLanguage = "en-US";
      const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
      const newRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

      newRecognizer.recognizeOnceAsync(
        (result) => {
          setMessage(result.text);
          newRecognizer.close();
          setRecognizer(null);
        },
        (error) => {
          console.error(error);
          newRecognizer.close();
          setRecognizer(null);
        }
      );

      setRecognizer(newRecognizer);
    } else {
      recognizer.stopContinuousRecognitionAsync(() => {
        recognizer.close();
        setRecognizer(null);
      });
    }
  };

  return (
    <div className="wrapper">
      <Header userId={props.userId} 
      photoURL = {props.photoURL} /> {/* Виправлено помилку в передачі пропсу */}
      <div className="chats-container">
        <div className="sidebar">
          <h3>Users in Chat</h3>
          <ul>
            {users.map((user) => (
              <li key={user.userId}>
                <img className="user-avatar" src={user.photoURL} alt="User Avatar" />
                <div className="user-info">
                  <div className="username">{user.username || "Unknown User" }</div>
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
                <img className="user-avatar" src={message.photoURL} alt="User Avatar" />
                <div
                  className={`message-content ${
                    message.username === props.user ? "my-message-content" : ""
                  }`}
                >
                  <div
                    className={`${
                      message.username === props.user ? "my-username" : "username"
                    } `}
                  >
                    {message.username}
                  </div>
                  <div
                    className={`${
                      message.username === props.user ? "text my-text" : "text"
                    } `}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`${
                      message.username === props.user
                        ? "my-message-timestamp"
                        : "message-timestamp"
                    } `}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="message-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message..."
            />
            <button
              type="button"
              onClick={handleSpeechRecognition}
              className={`microphone-icon ${recognizer ? "active" : ""}`}
            ></button>
            <button type="submit" className="send-btn"></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
