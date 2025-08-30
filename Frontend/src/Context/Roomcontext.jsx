import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const ShopContext = createContext();

const ShopProvider = (props) => {
  const [joined, setJoined] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // connect only once
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected to server", newSocket.id);
    //   setJoined(true)
    });


    newSocket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    //   setJoined(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const value = {
    socket,
    joined,
    setJoined,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
