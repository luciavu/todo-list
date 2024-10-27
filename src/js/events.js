import {
    addProjectPopup,
    addTaskPopup,
    setActive,
    exitTaskPopup,
    exitProjectPopup,
    expandSidebar,
    collapseSidebar,
    loadProject,
    loadSection,
} from "./dom";

import { retrieveProjectDetails, retrieveTaskDetails } from "./form.js";

export function setupMainEventListeners(user) {
    // Add task from sidebar/notes
    const sideAddTaskBtn = document.getElementById("add-task");
    sideAddTaskBtn.addEventListener("click", (user) => {
        addTaskPopup();
        console.log("Add task button clicked");
    });

    // Add project
    const addProjectButton = document.querySelector(".add-project");
    addProjectButton.addEventListener("click", () => {
        addProjectPopup();
        console.log("Add project button clicked");
    });

    // Click on section
    const sections = document.querySelectorAll(".section");
    for (let section of sections) {
        section.addEventListener("click", () => {
            setActive(section);
            loadSection(user, section);
            console.log(`${section.id} section clicked`);
        });
    }

    // Search text input
    const searchbar = document.getElementById("search-bar");
    searchbar.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            this.blur();
        }
    });
    searchbar.addEventListener("blur", () => {
        console.log(`User searched for ${searchbar.value}`);
    });

    // Sidebar collapse button
    const collapse = document.querySelector(".left");
    collapse.addEventListener("click", () => {
        expandSidebar();
        console.log("User opened the sidebar");
    });

    const focus = document.querySelector(".right");
    focus.addEventListener("click", () => {
        collapseSidebar();
        console.log("User collapsed the sidebar");
    });

    // Popup exit
    const closeTask = document.querySelector(".exit-task-popup");
    closeTask.addEventListener("click", () => {
        console.log("User exited task popup");
        exitTaskPopup();
    });
    const closeProject = document.querySelector(".exit-project-popup");
    closeProject.addEventListener("click", () => {
        console.log("User exited project popup");
        exitProjectPopup();
    });

    // Popup submit buttons
    const taskBtn = document.getElementById("addTaskBtn");
    taskBtn.addEventListener("click", () => {
        retrieveTaskDetails();
        exitTaskPopup();
    });

    const projectBtn = document.getElementById("addProjectBtn");
    projectBtn.addEventListener("click", () => {
        retrieveProjectDetails();
        exitProjectPopup();
    });
}

export function setupUserEventListeners(user) {
    const username = document.getElementById("name");

    username.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            this.blur();
        }
    });

    username.addEventListener("blur", () => {
        user.setName(username.value);
        console.log(`User changed their name to ${username.value}`);
    });
}

export function setupTaskEventListeners(task, completeBtn, deleteBtn) {
    deleteBtn.addEventListener("click", () => {
        // Remove task
        console.log("Remove task");
    });
    // Remove task from all, move to complete on refresh
    completeBtn.addEventListener("click", () => {
        console.log("Complete task");
    });
}

export function setupProjectEventListeners(projectDiv, project) {
    projectDiv.addEventListener("click", () => {
        console.log(`${project.name} folder clicked`);
        setActive(projectDiv);
        loadProject(project, project.name);
    });
}

export function addTaskEventListener(button) {
    button.addEventListener("click", () => {
        console.log("add task through main");
    });
}
