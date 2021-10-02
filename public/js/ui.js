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
};

const updateUsername = (username) => {
    const usernameLabel = document.querySelector(".username_label");
    usernameLabel.innerHTML = username;
};
