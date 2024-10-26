import { setupProjectEventListeners, setupTaskEventListeners } from "./events";

export function addDOMProject(project) {
    const projectFolder = document.querySelector(".project-scrollable");
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.id = project.name;

    const projectIcon = document.createElement("i");
    projectIcon.classList.add("icon-folder");
    const projectName = document.createElement("div");
    projectName.classList.add("project-name");
    projectName.textContent = project.name;

    projectDiv.append(projectIcon);
    projectDiv.append(projectName);
    projectFolder.append(projectDiv);

    setupProjectEventListeners(projectDiv);
}

export function addDOMTask() {
    setupTaskEventListeners(task, completeBtn, deleteBtn);
}

export function addTaskPopup() {
    const popup = document.querySelector(".add-task-popup");
    console.log("add task popup");
    popup.classList.add("visible");
}

export function addProjectPopup() {
    const popup = document.querySelector(".add-project-popup");
    console.log("add project popup");
    popup.classList.add("visible");
}

export function exitTaskPopup() {
    const addTaskPopup = document.querySelector(".add-task-popup");
    // Clear the input values
    addTaskPopup.classList.remove("visible");
}

export function exitProjectPopup() {
    const addProjectPopup = document.querySelector(".add-project-popup");
    // Clear the input values
    addProjectPopup.classList.remove("visible");
}
export function loadMain(section) {}

export function setActive(element) {
    // Toggle current active
    const currentActive = document.querySelector(".active");
    currentActive.classList.toggle("active");
    // Set new active
    element.classList.add("active");
}

export function updateTaskCount() {
    const taskCounter = document.querySelector("task-summary");
}
