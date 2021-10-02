const socket = io("/");

//Connect to Socket.io Server
socket.on("connect", () => {
    console.log(`CONNECTED TO SERVER. SOCKETID: ${socket.id}`);
});
