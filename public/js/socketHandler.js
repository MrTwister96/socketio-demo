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
};

const sendGroupChatMessage = (author, messageContent) => {
    socket.emit("group-chat-message", { author, messageContent });
};

////////// LOCAL FUNCTIONS //////////
const registerActiveSession = () => {
    socket.emit("register-new-user", { username: store.getUsername() });
};

export default { connectToSocketIoServer, sendGroupChatMessage };
