// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for incoming messages from clients
  socket.on("message", (data) => {
    console.log(`Message from client: ${data.message}`);

    // Broadcast the message to all connected clients
    io.emit("message", { user: data.user, message: data.message });
  });

  // Listen for disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
