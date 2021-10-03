// Imports
import store from "./store.js";
import ui from "./ui.js";
import socketHandler from "./socketHandler.js";

// name input element
const nameInput = document.querySelector(".introduction_page_name_input");

nameInput.addEventListener("keyup", (event) => {
    if (store.getUsername() === "" && event.key === " ") {
        nameInput.value = "";
    } else {
        store.setUsername(event.target.value);
    }
});

// enter chats button element
const chatPageButton = document.getElementById("enter_chats_button");

chatPageButton.addEventListener("click", () => {
    ui.goToChatPage();
    socketHandler.connectToSocketIoServer();
});
