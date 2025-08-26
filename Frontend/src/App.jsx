import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Room from './Pages/Room'
import Editor from './Pages/Editor'
import {io} from "socket.io-client"

const App = () => {
  const socket=io("http://localhost:5000");

const[joined,setJoined]=useState(false);
socket.on("connect", () => {
  console.log("Connected to server ✅");
  console.log("My Socket ID:", socket.id);
  setJoined(true) // Unique ID for this user
});

if(!joined){
  return <div>user not joined</div>
}

   return (
 
   <div className="min-h-screen bg-[#2E3440] text-[#D8DEE9]">
 <Routes>
        <Route path="/" element={<Room/>} />
        <Route path="/editor:roomid" element={<Editor/>} />

        
      </Routes>
</div>

   )
  

 
}

export default App
