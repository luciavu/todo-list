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
    addDOMProject,
    hideProjectSelector,
    resetProjectSelector,
    reloadMain,
    removeTodo,
    toggleCompleteTodo,
} from "./dom";

import { addProject } from "./app.js";
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
        console.log(`User searched for ${searchbar.value}`);
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
        const project = addProject(retrieveProjectDetails(), user);
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

export function addDeleteTodoEventListener(deleteBtn, project, todo, task) {
    deleteBtn.addEventListener("click", () => {
        // Remove task
        removeTodo(project, todo, task);
        console.log("Remove task");
    });
}

export function addCompleteTodoEventListener(completeBtn, todo) {
    // Remove task from all, move to complete on refresh
    completeBtn.addEventListener("click", () => {
        toggleCompleteTodo(todo, completeBtn);
        console.log("Complete task", todo);
    });
}

export function setupProjectEventListeners(projectDiv, project) {
    projectDiv.addEventListener("click", () => {
        console.log(`${project.name} folder clicked`);
        setActive(projectDiv);
        loadProject(project, project.name);
    });
}

export function addTaskEventListener(button, name) {
    button.addEventListener("click", () => {
        console.log(`add task through ${name}`);
        addTaskPopup(name);
        hideProjectSelector();
    });
}
