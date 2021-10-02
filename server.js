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

// Handle Incomming Socket.Io Connections
io.on("connection", (socket) => {
    //Log successfull connections
    console.log(`CLIENT CONNECTED: SOCKETID: ${socket.id}`);

    // Emit hello-client to server
    socket.emit("hello-client");

    // On hello-server emiited from client
    socket.on("hello-server", () => {
        console.log(`CLIENT EMITTED: hello-server. SOCKETID: ${socket.id}`);
    });

    // Socket.io Disconnection
    socket.on("disconnect", (reason) => {
        console.log(
            `CLIENT DISCONNECTED. REASON: ${reason} SOCKETID: ${socket.id}`
        );
    });
});

// Start HTTP Server
server.listen(PORT, () => {
    console.log(`SERVER STARTED ON ${PORT}`);
});
