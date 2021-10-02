let socket = null;

const connectToSocketIoServer = () => {
    // Connect to Socket.io Server
    const socket = io("/");

    // connect event Emitted from server upon successful connection
    socket.on("connect", () => {
        console.log(`CONNECTED TO SERVER. SOCKETID: ${socket.id}`);
    });

    // hello-client event emmited by server
    socket.on("hello-client", () => {
        console.log(`SERVER EMITTED: hello-client. SOCKETID: ${socket.id}`);
        socket.emit("hello-server");
    });
};

export default { connectToSocketIoServer };
