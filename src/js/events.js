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
    hideProjectSelector,
    resetProjectSelector,
    reloadMain,
    removeTodo,
    toggleCompleteTodo,
    loadUsername,
} from "./dom";

import { addProject, saveDetails } from "./app.js";
import { retrieveProjectDetails, retrieveTaskDetails } from "./form.js";

export function setupMainEventListeners(user) {
    // Add task from sidebar/notes
    const sideAddTaskBtn = document.getElementById("add-task");
    sideAddTaskBtn.addEventListener("click", (user) => {
        addTaskPopup();
    });

    // Add project
    const addProjectButton = document.querySelector(".add-project");
    addProjectButton.addEventListener("click", () => {
        addProjectPopup();
    });

    // Click on section
    const sections = document.querySelectorAll(".section");
    for (let section of sections) {
        section.addEventListener("click", () => {
            setActive(section);
            loadSection(user, section);
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
        expandSidebar();
    });

    const focus = document.querySelector(".right");
    focus.addEventListener("click", () => {
        collapseSidebar();
    });

    // Popup exit
    const closeTask = document.querySelector(".exit-task-popup");
    closeTask.addEventListener("click", () => {
        resetProjectSelector();
        exitTaskPopup();
    });
    const closeProject = document.querySelector(".exit-project-popup");
    closeProject.addEventListener("click", () => {
        exitProjectPopup();
    });

    // Popup submit buttons
    const taskBtn = document.getElementById("addTaskBtn");
    taskBtn.addEventListener("click", () => {
        retrieveTaskDetails(user);
        reloadMain(user);
        resetProjectSelector();
        exitTaskPopup();
    });

    const projectBtn = document.getElementById("addProjectBtn");
    projectBtn.addEventListener("click", () => {
        if (retrieveProjectDetails() !== "") {
            addProject(retrieveProjectDetails(), user);
        }
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
        saveDetails(user);
    });
}

export function addDeleteTodoEventListener(
    deleteBtn,
    project,
    todo,
    task,
    user
) {
    deleteBtn.addEventListener("click", () => {
        // Remove task
        removeTodo(project, todo, task, user);
        saveDetails(user);
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
