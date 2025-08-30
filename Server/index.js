
import express from "express"
import http from 'http'
import { Server } from "socket.io";

const app=express()
const server=http.createServer(app);
const port=process.env.PORT||5000

const io=new Server(server,{  // 'Server is used by socket for bidirectional communication'
cors:{
    origin:"*",  // here anyone can connect  from frontend side 
}
})
 const rooms=new Map();
io.on("connection",(socket)=>{ 
    console.log("user Connected",socket.id)// THIS IS  used to connect the new user to your application 
    let currentRoom=null
    let currentUser=null;


    socket.on("join",({roomId,userName})=>{

        if(currentRoom){   // this is for the currentRoom user
    socket.leave(currentRoom);   
    rooms.get(currentRoom).delete(currentUser); // delete the currentUser from the currentRoom
    io.to(currentRoom).emit("userJoined",Array.from(rooms.get(currentRoom))); //converts the Set of usernames into a normal array, so the frontend can display the updated list of users.
        }

        // and this code is for new user to join
        currentRoom=roomId;
        currentUser=userName;
        socket.join(roomId)
        if(!rooms.has(roomId)){
            rooms.set(roomId,new Set());
        }
        rooms.get(roomId).add(userName);
        io.to(roomId).emit("userJoined",Array.from(rooms.get(currentRoom))); // to update the array
        console.log(roomId,userName)
    })

})

server.listen(port,()=>{
    console.log(`server is listening on port ${port} `)
})
