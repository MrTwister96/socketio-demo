// Imports
import store from "./store";

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

// Get name input
const nameInput = document.querySelector(".introduction_page_name_input");

nameInput.addEventListener("keyup", (event) => {
    store.setUsername(event.target.value);
});
