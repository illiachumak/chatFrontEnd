import { useState } from "react";

import "./App.css";

import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";

function App() {
  const [user, setUser] = useState(undefined);
  const [id, setId] = useState(undefined);

  const handleAuth = (user) => {
    setUser(user);
  };
  const handleId = (id) => {
    setId(id);
  };

  if (!user) {
    return <AuthPage onAuth={handleAuth} roomId = {handleId} />;
  } else {
    return <ChatsPage user={user} roomId={id}/>;
  }
}

export default App;
