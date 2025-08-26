
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
io.on("connection",(socket)=>{ 
    console.log("user Connected",socket.id)  // THIS IS  used to connect the new user to your application 
})

server.listen(port,()=>{
    console.log(`server is listening on port ${port} `)
})
