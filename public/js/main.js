// Imports
import store from "./store.js";
import { goToChatPage } from "./ui.js";

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

// name input element
const nameInput = document.querySelector(".introduction_page_name_input");

nameInput.addEventListener("keyup", (event) => {
    store.setUsername(event.target.value);
});

// enter chats button element
const chatPageButton = document.getElementById("enter_chats_button");

chatPageButton.addEventListener("click", () => {
    goToChatPage();
});
