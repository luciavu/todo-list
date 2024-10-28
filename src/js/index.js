import "../css/styles.css";
import "../css/fontello.css";
import { setupMainEventListeners } from "./events.js";
import {
    loadDefaultTasks,
    loadDefaultView,
    loadExistingData,
} from "./default.js";
import { User } from "./models.js";
import { recreateUserObject } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
    let user;
    if (!localStorage.getItem("user")) {
        console.log("new user");
        user = new User("New User");
        loadDefaultView(user);
    } else {
        console.log("returning user");
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log(userData);
        user = recreateUserObject(userData);
        loadExistingData(user);
    }

    loadDefaultTasks(user);
    setupMainEventListeners(user);
});
