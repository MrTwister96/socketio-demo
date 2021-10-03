import store from "./store.js";
import { appendGroupChatMessage } from "./ui.js";

let socket = null;

const connectToSocketIoServer = () => {
    socket = io("/");

    socket.on("connect", () => {
        registerActiveSession();
        console.log(`${socket.id} CONNECTED TO SERVER.`);
    });

    socket.on("group-chat-message", (messageData) => {
        appendGroupChatMessage(messageData);
    });
};

const registerActiveSession = () => {
    socket.emit("register-new-user", { username: store.getUsername() });
};

const sendGroupChatMessage = (author, messageContent) => {
    socket.emit("group-chat-message", { author, messageContent });
};

export default { connectToSocketIoServer, sendGroupChatMessage };
