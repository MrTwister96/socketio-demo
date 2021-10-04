import {
    getChatbox,
    getDirectChatMessage,
    getGroupChatMessage,
} from "./elements.js";
import store from "./store.js";
import socketHandler from "./socketHandler.js";

const goToChatPage = () => {
    if (store.getUsername() !== "") {
        // Get page elements
        const introductionPage = document.querySelector(".introduction_page");
        const chatPage = document.querySelector(".chat_page");

        // Hide Introduction Page
        introductionPage.classList.add("display_none");

        // Display Chat page
        chatPage.classList.remove("display_none");
        chatPage.classList.add("display_flex");

        const username = store.getUsername();
        updateUsername(username);

        createGroupChatbox();
    } else {
        alert("Enter valid name!");
    }
};

const chatboxId = "group-chat-chatbox";
const chatboxMessagesId = "group-chat-messages";
const chatboxInputId = "group-chat-input";

const createGroupChatbox = () => {
    const data = {
        chatboxLabel: "Group Chat",
        chatboxMessagesId,
        chatboxInputId,
        chatboxId,
    };

    const chatbox = getChatbox(data);

    const chatboxesContainer = document.querySelector(".chatboxes_container");
    chatboxesContainer.appendChild(chatbox);

    const newMessageInput = document.getElementById(chatboxInputId);
    newMessageInput.addEventListener("keyup", (event) => {
        const key = event.key;

        if (key === "Enter") {
            const author = store.getUsername();
            const messageContent = event.target.value;

            // Make sure the input is not empty or starts with space
            if (messageContent !== "" && !messageContent.startsWith(" ")) {
                // Send to socket.io server
                socketHandler.sendGroupChatMessage(author, messageContent);
                newMessageInput.value = "";
            } else {
                newMessageInput.value = "";
                alert("Enter valid message!");
            }
        }
    });
};

const appendGroupChatMessage = (messageData) => {
    const groupChatboxMessagesContainer =
        document.getElementById(chatboxMessagesId);

    const chatMessage = getGroupChatMessage(messageData);

    groupChatboxMessagesContainer.appendChild(chatMessage);
};

const updateUsername = (username) => {
    const usernameLabel = document.querySelector(".username_label");
    usernameLabel.innerHTML = username;
};

const updateActiveChatboxes = (connectedPeers) => {
    connectedPeers.forEach((peer) => {
        const activeChatboxes = store.getActiveChatboxes();
        const activeChatbox = activeChatboxes.find(
            (c) => peer.socketId === c.socketId
        );
        if (!activeChatbox && peer.socketId !== store.getSocketId()) {
            createNewUserChatbox(peer);
        }
    });
};

const createNewUserChatbox = (peer) => {
    const chatboxId = peer.socketId;
    const chatboxMessagesId = `${peer.socketId}-messages`;
    const chatboxInputId = `${peer.socketId}-input`;

    const data = {
        chatboxId,
        chatboxMessagesId,
        chatboxInputId,
        chatboxLabel: peer.username,
    };

    const chatbox = getChatbox(data);
    //Append new chatbox to DOM
    const chatboxesContainer = document.querySelector(".chatboxes_container");
    chatboxesContainer.appendChild(chatbox);

    const newMessageInput = document.getElementById(chatboxInputId);
    newMessageInput.addEventListener("keyup", (event) => {
        const key = event.key;

        if (key === "Enter") {
            const author = store.getUsername();
            const messageContent = event.target.value;

            // Make sure the input is not empty or starts with space
            if (messageContent !== "" && !messageContent.startsWith(" ")) {
                // Send to socket.io server
                socketHandler.sendDirectChatMessage(
                    peer.socketId,
                    author,
                    messageContent
                );
                newMessageInput.value = "";
            } else {
                newMessageInput.value = "";
                alert("Enter valid message!");
            }
        }
    });

    const activeChatboxes = store.getActiveChatboxes();
    const newActiveChatboxes = [...activeChatboxes, peer];
    store.setActiveChatboxes(newActiveChatboxes);
};

const appendDirectChatMessage = (messageData) => {
    const { senderId, receiverId, messageContent, isAuthor } = messageData;

    const containerId = isAuthor
        ? `${receiverId}-messages`
        : `${senderId}-messages`;

    const alignRight = isAuthor ? true : false;

    const directChatboxMessagesContainer = document.getElementById(containerId);
    const chatMessage = getDirectChatMessage({ alignRight, messageContent });
    directChatboxMessagesContainer.appendChild(chatMessage);
};

const removeDisconnectedUser = (socketId) => {
    const activeChatboxes = store.getActiveChatboxes();
    const newActiveChatboxes = activeChatboxes.filter(
        (c) => c.socketId !== socketId
    );
    store.setActiveChatboxes(newActiveChatboxes);

    const chatbox = document.getElementById(socketId);
    if (chatbox) {
        chatbox.parentElement.removeChild(chatbox);
    }
};

export default {
    goToChatPage,
    appendGroupChatMessage,
    updateActiveChatboxes,
    appendDirectChatMessage,
    removeDisconnectedUser,
};
