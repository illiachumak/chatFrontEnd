import io from "socket.io-client";

const createSocketConnection = (user) => {
  const socket = io("https://localhost:3001", {
    query: { username: user.username, roomId: user.roomId },
  });

  return socket;
};

export default createSocketConnection;
