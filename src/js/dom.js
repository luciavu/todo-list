import {
    addTaskEventListener,
    setupProjectEventListeners,
    setupTaskEventListeners,
} from "./events";
import { User } from "./models.js";

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

    setupProjectEventListeners(projectDiv, project);
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

export function setActive(element) {
    // Toggle current active
    const currentActive = document.querySelector(".active");
    currentActive.classList.toggle("active");
    // Set new active
    element.classList.add("active");
}

export function updateTaskCount(numTasks) {
    const taskCounter = document.querySelector("task-summary");
    taskCounter.textContent = `${this.totalTasks} tasks remaining`;
}

export function collapseSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector("main");
    sidebar.style.display = "none";
    main.style.display = "block";
}

export function expandSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector("main");
    sidebar.style.display = "block";
    main.style.display = "none";
}

function clearTasks() {
    const tasks = document.querySelectorAll(".task-container");
    for (let task of tasks) {
        task.remove();
    }
}

export function loadSection(user, section) {
    console.log(user);
    console.log(section.id);
    console.log(user.getProjects().length);
    switch (section.id) {
        case "all":
            console.log("here");
            loadProject(user.getProjects(), "All");

            break;
        case "today":
            break;
        case "scheduled":
            break;
        case "completed":
            break;
    }
}

export function loadProject(projects, mainHeading) {
    // Clear task display
    clearTasks();
    const main = document.querySelector("main");

    const heading = document.querySelector(".section-heading");
    heading.textContent = mainHeading;

    console.log("projects:" + projects);

    // Change to array
    if (!Array.isArray(projects)) {
        projects = [projects];
    }

    for (let project of projects) {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        const taskGroup = document.createElement("div");
        taskGroup.classList.add("task-project-group");

        const taskHeading = document.createElement("div");
        taskHeading.classList.add("task-heading");
        taskHeading.textContent = project.name;
        taskGroup.append(taskHeading);

        for (let todo of project.todos) {
            const task = document.createElement("div");
            task.classList.add("task");

            const deleteTask = document.createElement("i");
            deleteTask.classList.add("icon-trash-empty");
            deleteTask.classList.add("delete-task");

            const taskMain = document.createElement("div");
            taskMain.classList.add("task-main");

            const taskCheck = document.createElement("i");
            taskCheck.classList.add("icon-circle-thin");
            taskCheck.classList.add("task-completed");

            const taskDetails = document.createElement("div");
            taskDetails.classList.add("task-details");

            const taskDescription = document.createElement("div");
            taskDescription.classList.add("task-description");
            taskDescription.textContent = todo.description;

            const taskDate = document.createElement("div");
            taskDate.classList.add("task-date");

            loadTodoIcons(
                taskDate,
                todo.priority,
                todo.dueDate,
                todo.dueTime,
                todo.overdue
            );

            taskDetails.append(taskDescription);
            taskDetails.append(taskDate);
            taskMain.append(taskCheck);
            taskMain.append(taskDetails);
            task.append(taskMain);
            task.append(deleteTask);
            taskGroup.append(task);
            taskContainer.append(taskGroup);
            main.append(taskContainer);

            setupTaskEventListeners(taskContainer, taskCheck, deleteTask);
        }
        // Add task button at the end
        generateAddTaskBtn(taskGroup);
    }
}

function generateAddTaskBtn(div) {
    // For every project listed, put add task button at the end
    const task = document.createElement("div");
    task.classList.add("task");

    const addTaskBtn = document.createElement("div");
    addTaskBtn.classList.add("add-task");
    addTaskBtn.classList.add("add-task-button");

    const icon = document.createElement("i");
    icon.classList.add("icon-plus");

    addTaskBtn.append(icon);

    const textNode = document.createTextNode("Add task");
    addTaskBtn.append(textNode);

    task.append(addTaskBtn);
    div.append(task);
    addTaskEventListener(addTaskBtn);
}

function loadTodoIcons(div, priority, date, time, overdue) {
    if (priority) {
        const icon = document.createElement("i");
        icon.classList.add("icon-clock");
        icon.classList.add("priority");
        div.append(icon);
    }

    const dueDate = document.createElement("div");
    dueDate.id = "due-date";
    dueDate.textContent = `${date}  ${time}`;
    div.append(dueDate);

    if (overdue) {
        const icon = document.createElement("i");
        icon.classList.add("icon-attention-circled");
        const overdueDiv = document.createElement("div");
        overdueDiv.classList.add("overdue");
        overdueDiv.textContent = "Overdue";

        div.append(icon);
        div.append(overdueDiv);
    }
}
