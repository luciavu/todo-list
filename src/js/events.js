import {
    addProjectPopup,
    addTaskPopup,
    setActive,
    exitTaskPopup,
    exitProjectPopup,
    toggleSidebar,
    loadProject,
    loadSection,
    hideProjectSelector,
    resetProjectSelector,
    reloadMain,
    removeTodo,
    toggleCompleteTodo,
    addDOMProject,
    clearProjectFolder,
} from "./dom";

import { addProject, saveDetails } from "./app.js";
import { retrieveProjectDetails, retrieveTaskDetails } from "./form.js";

// Helper function for blur when entering text input
function blurOnEnter(element) {
    element.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            element.blur();
        }
    });
}

export function setupMainEventListeners(user) {
    // Add task from sidebar/notes
    document.getElementById("add-task").addEventListener("click", () => {
        addTaskPopup();
    });

    // Add project
    document.querySelector(".add-project").addEventListener("click", () => {
        addProjectPopup();
    });

    // Click on section
    document.querySelectorAll(".section").forEach((section) => {
        section.addEventListener("click", () => {
            setActive(section);
            loadSection(user, section);
        });
    });

    // Search text input
    const searchbar = document.getElementById("search-bar");
    blurOnEnter(searchbar);

    searchbar.addEventListener("blur", () => {
        if (searchbar.value.length > 0) {
            loadSection(user, searchbar);
        } else {
            const allSection = document.getElementById("all");
            loadSection(user, allSection);
            setActive(allSection);
        }
    });

    // Sidebar collapse button
    const collapse = document.querySelector(".left");
    collapse.addEventListener("click", () => {
        toggleSidebar(false); // expand
    });

    const focus = document.querySelector(".right");
    focus.addEventListener("click", () => {
        toggleSidebar(true); //collapse
    });

    // Popup exit
    document.querySelector(".exit-task-popup").addEventListener("click", () => {
        resetProjectSelector();
        exitTaskPopup();
    });
    document.querySelector(".exit-project-popup").addEventListener("click", () => {
        exitProjectPopup();
    });

    // Popup submit buttons
    document.getElementById("addTaskBtn").addEventListener("click", () => {
        retrieveTaskDetails(user);
        reloadMain(user);
        resetProjectSelector();
        exitTaskPopup();
    });

    document.getElementById("addProjectBtn").addEventListener("click", () => {
        if (retrieveProjectDetails() !== "") {
            addProject(retrieveProjectDetails(), user);
        }
        exitProjectPopup();
    });
}

export function setupUserEventListeners(user) {
    const username = document.getElementById("name");
    blurOnEnter(username);

    username.addEventListener("blur", () => {
        user.setName(username.value);
        saveDetails(user);
    });
}

export function addDeleteTodoEventListener(deleteBtn, project, todo, task, user) {
    deleteBtn.addEventListener("click", () => {
        // Remove task
        removeTodo(project, todo, task, user);
        saveDetails(user);
    });
}

export function addDeleteProjectEventListener(div, project, user) {
    div.addEventListener("click", () => {
        console.warn("ITS DELETING PROJECT??");
        console.log("the user is", user);
        // Delete project in User class
        console.log(project);
        user.removeProject(project);
        // Save changes
        saveDetails(user);
        console.log("saved:", user);
        console.log(localStorage);
        // Refresh folder UI
        clearProjectFolder();
        user.projects.forEach((project) => {
            addDOMProject(project, user);
        });

        // Move back to main section
        const allDiv = document.getElementById("all");
        loadSection(user, allDiv);
    });
}

export function addCompleteTodoEventListener(completeBtn, todo, user) {
    // Remove task from all, move to complete on refresh
    completeBtn.addEventListener("click", () => {
        toggleCompleteTodo(todo, completeBtn);
        saveDetails(user);
    });
}

export function setupProjectEventListeners(projectDiv, project, user) {
    console.log(user);
    console.log(localStorage);
    projectDiv.addEventListener("click", () => {
        setActive(projectDiv);
        loadProject(project, project.name, user);
    });
}

export function addTaskEventListener(button, name) {
    button.addEventListener("click", () => {
        addTaskPopup(name);
        hideProjectSelector();
    });
}
