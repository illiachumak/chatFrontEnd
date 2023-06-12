import { useState } from "react";

import "./App.css";

import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";
import { set } from "firebase/database";


function App() {
  const [user, setUser] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  const [photoURL, setPhotoURL] = useState("")
 
  const handleAuth = (user) => {
    setUser(user);
  };

  const handleUserId = (userId) => {
    setUserId(userId)
  }

  const handleId = (id) => {
    setId(id);
  };
  const setPhotoURLFunc = (photoURL) => {
    setPhotoURL(photoURL);
  }

  if (!user) {
    return <AuthPage onAuth={handleAuth} roomId = {handleId} userID={handleUserId} photoURL={setPhotoURLFunc} />;
  } 
  
  else {
    return <ChatsPage user={user} roomId={id} userId={userId} photoURL={photoURL}/>;
  }
}

export default App;
