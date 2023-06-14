import { useState } from "react";

import "./App.css";

import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About"



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
    return(
      <div>
        <Router>
          <Routes>
            <Route path="/" element={
              
              <AuthPage onAuth={handleAuth} roomId = {handleId} userID={handleUserId} photoURL={setPhotoURLFunc} />
            }/>
            
            <Route path="/About" element={
              <About/>
            }/>
    
    </Routes>
    </Router>
    </div>
  )} 
  
  else {
    return <ChatsPage user={user} roomId={id} userId={userId} photoURL={photoURL}/>;
  }
}

export default App;
