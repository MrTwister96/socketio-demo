// Import Express
import express from "express";
// Import HTTP
import { createServer } from "http";
// Import Socket.io
import { Server } from "socket.io";
// Import dotenv
import dotenv from "dotenv";

// Configure dotenv
dotenv.config();

// Set HTTP port to listen on
const PORT = process.env.EXPRESS_PORT || 5000;

// Initialize Express
const app = express();
// Create Server With Express App
const server = createServer(app);

// Define static file location
app.use(express.static("public"));

// Default Route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Initialize Socket.io server
const io = new Server(server);

let connectedPeers = [];

// Handle Incomming Socket.Io Connections
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
server.listen(PORT, () => {
    console.log(`SERVER STARTED ON ${PORT}`);
});
