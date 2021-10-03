let username;
let socketId;
let activeChatboxes = [];

const getUsername = () => {
    return username;
};

const setUsername = (name) => {
    username = name;
};

const getSocketId = () => {
    return socketId;
};

const setSocketId = (socketId) => {
    socketId = socketId;
};

const getActiveChatboxes = () => {
    return activeChatboxes;
};

const setActiveChatboxes = (activeChatboxes) => {
    activeChatboxes = activeChatboxes;
};

export default {
    getUsername,
    setUsername,
    getSocketId,
    setSocketId,
    getActiveChatboxes,
    setActiveChatboxes,
};
