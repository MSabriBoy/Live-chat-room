const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://live-chat-room-pi.vercel.app/",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
     console.log(`User joined room: ${room}`);
  });
socket.on("send_message", (data) => {
  io.to(data.room).emit("receive_message", data);
});

  socket.on("typing", (data) => {
    socket.to(data.room).emit("typing", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});