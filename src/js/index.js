import "../css/styles.css";
import "../css/fontello.css";
import { setupMainEventListeners } from "./events.js";
import { loadDefaultTasks, loadDefaultUser } from "./default.js";
import { User } from "./models.js";

document.addEventListener("DOMContentLoaded", () => {
    // If no local storage data found,
    const user = new User("New User");
    loadDefaultUser(user);
    loadDefaultTasks(user);

    setupMainEventListeners();

    // else load LocalStorageData
});
