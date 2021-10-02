import { getChatbox } from "./elements.js";
import store from "./store.js";

export const goToChatPage = () => {
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
};

const updateUsername = (username) => {
    const usernameLabel = document.querySelector(".username_label");
    usernameLabel.innerHTML = username;
};
