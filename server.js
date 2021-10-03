import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app);
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Start Socket.IO
const io = new Server(server);
let connectedPeers = [];
io.on("connection", (socket) => {
    socket.on("register-new-user", ({ username }) => {
        connectedPeers = [...connectedPeers, { username, socketId: socket.id }];
        console.log(`${socket.id} CONNECTED`);
    });

    socket.on("group-chat-message", (messageData) => {
        io.emit("group-chat-message", messageData);
    });

    socket.on("disconnect", (reason) => {
        connectedPeers = connectedPeers.filter((p) => p.socketId !== socket.id);
        console.log(`${socket.id} DISCONNECTED. REASON: ${reason}`);
    });
});

// Start HTTP Server
const PORT = process.env.EXPRESS_PORT || 5000;
server.listen(PORT, () => {
    console.log(`SERVER STARTED ON ${PORT}`);
});
