import store from "./store.js";
import ui from "./ui.js";

let socket = null;

////////// EXPORTED FUNCTIONS //////////
const connectToSocketIoServer = () => {
    socket = io("/");

    socket.on("connect", () => {
        registerActiveSession();
        store.setSocketId(socket.id);
        console.log(`${socket.id} CONNECTED TO SERVER.`);
    });

    socket.on("active-peers", ({ connectedPeers }) => {
        ui.updateActiveChatboxes(connectedPeers);
    });

    socket.on("group-chat-message", (messageData) => {
        ui.appendGroupChatMessage(messageData);
    });

    socket.on("direct-chat-message", (messageData) => {
        ui.appendDirectChatMessage(messageData);
    });

    socket.on("user-disconnected", (socketId) => {
        ui.removeDisconnectedUser(socketId);
    });
};

const sendGroupChatMessage = (author, messageContent) => {
    socket.emit("group-chat-message", { author, messageContent });
};

const sendDirectChatMessage = (socketId, author, messageContent) => {
    socket.emit("direct-chat-message", { socketId, author, messageContent });
};

////////// LOCAL FUNCTIONS //////////
const registerActiveSession = () => {
    socket.emit("register-new-user", { username: store.getUsername() });
};

export default {
    connectToSocketIoServer,
    sendGroupChatMessage,
    sendDirectChatMessage,
};
