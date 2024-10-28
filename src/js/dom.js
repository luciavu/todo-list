import {
    addTaskEventListener,
    setupProjectEventListeners,
    addDeleteTodoEventListener,
    addDeleteProjectEventListener,
    addCompleteTodoEventListener,
} from "./events";

import {
    getScheduledProjects,
    getCompletedProjects,
    getTodaysProjects,
    getSearchedProjects,
} from "./app.js";

// Helper function for creating elements
function createElement(type, classNames = [], textContent = "") {
    const element = document.createElement(type);
    if (classNames.length) {
        element.classList.add(...classNames);
    }

    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

export function clearProjectFolder() {
    const projects = document.getElementsByClassName("project");
    Array.from(projects).forEach((project) => {
        project.remove();
    });
}

export function addProjectOption(project) {
    // Add project to list
    const formOptions = document.getElementById("project-select");
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    formOptions.append(option);
}

export function addDOMProject(project, user) {
    // Add project folder
    const projectFolder = document.querySelector(".project-scrollable");
    const projectDiv = createElement("div", ["project"]);
    projectDiv.id = project.name;

    const projectIcon = createElement("i", ["icon-folder"]);
    const projectName = createElement("div", ["project-name"], project.name);

    projectDiv.append(projectIcon, projectName);
    projectFolder.append(projectDiv);

    setupProjectEventListeners(projectDiv, project, user);
    reloadMain(user);
}

export function loadUsername(name) {
    const nameDiv = document.getElementById("name");
    nameDiv.placeholder = name;
}

export function addTaskPopup(name) {
    const popup = document.querySelector(".add-task-popup");
    // Keep track of what project the task is under
    popup.classList.add(name, "visible");
}

export function addProjectPopup() {
    const popup = document.querySelector(".add-project-popup");
    popup.classList.add("visible");
}

export function exitTaskPopup() {
    // Remove project tag
    const addTaskPopup = document.querySelector(".add-task-popup");
    addTaskPopup.classList.remove(addTaskPopup.classList[1]);
    const inputs = ["form-taskname", "form-taskdate", "form-tasktime"];

    // Clear input values, hide popup
    inputs.forEach((id) => {
        document.getElementById(id).value = "";
    });
    addTaskPopup.classList.remove(addTaskPopup.classList[1]);
    addTaskPopup.classList.remove("visible");
}

export function exitProjectPopup() {
    // Clear input values, hide popup
    const addProjectPopup = document.querySelector(".add-project-popup");
    document.getElementById("form-projectname").value = "";
    addProjectPopup.classList.remove("visible");
}

export function setActive(element) {
    const currActive = document.querySelector(".active");
    if (currActive) {
        currActive.classList.remove("active");
    }
    element.classList.add("active");
}

export function updateTaskCount(num) {
    const taskCounter = document.querySelector(".task-summary");
    const plural = num == 1 ? "" : "s";
    taskCounter.textContent = `${num} task${plural} remaining`;
}

export function toggleSidebar(isCollapsed) {
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector("main");

    if (isCollapsed) {
        sidebar.style.display = "none";
        main.style.display = "block";
    } else {
        sidebar.style.display = "block";
        main.style.display = "none";
    }
}

function clearTasks() {
    const tasks = document.querySelectorAll(".task-container");
    tasks.forEach((task) => task.remove());
}

export function hideProjectSelector() {
    const selection = document.querySelector(".form-project");
    selection.classList.add("invisible");
}

export function resetProjectSelector() {
    const selection = document.querySelector(".form-project");
    selection.classList.remove("invisible");
}

export function reloadMain(user) {
    const group = document.querySelector(".active");
    // If currently on project display, reload project
    if (group.classList.contains("project")) {
        loadProject(user.getProjectByName(group.id), group.id);
    } else {
        // Section
        loadSection(user, group);
    }
}

export function loadSection(user, section) {
    const projects = user.getProjects();

    // Replaced switch statement with mapping
    const sectionLoaders = {
        all: () => loadProject(projects, "All", user),
        today: () => loadProject(getTodaysProjects(projects), "Today", user),
        scheduled: () => loadProject(getScheduledProjects(projects), "Scheduled", user),
        completed: () => loadProject(getCompletedProjects(projects), "Completed", user),
        "search-bar": () => {
            const searchedProjects = getSearchedProjects(projects, section.value);
            loadProject(searchedProjects, `Search result for "${section.value}"`, user);
        },
    };

    const loadFunction = sectionLoaders[section.id];
    if (loadFunction) {
        loadFunction();
    }
}

export function loadProject(projects, mainHeading, user) {
    // Clear task display
    clearTasks();
    let counter = 0;
    const main = document.querySelector("main");
    document.querySelector(".section-heading").textContent = mainHeading;

    // Change to array
    if (!Array.isArray(projects)) {
        projects = [projects];
    }

    projects.forEach((project) => {
        const taskContainer = createElement("div", ["task-container"]);
        const taskGroup = createElement("div", ["task-project-group"]);
        const taskHeading = createElement("div", ["task-heading"], project.name);
        const projectDelete = createElement("i", ["icon-trash-empty", "delete-project"]);
        taskHeading.append(projectDelete);
        addDeleteProjectEventListener(projectDelete, project, user);
        taskGroup.append(taskHeading);

        project.todos.forEach((todo) => {
            const task = createElement("div", ["task"]);
            const deleteTask = createElement("i", ["icon-trash-empty", "delete-task"]);
            const taskMain = createElement("div", ["task-main"]);
            const taskCheck = createElement("i");
            const taskCheckFill = createElement("i", ["icon-circle"]);

            if (todo.completed) {
                taskCheck.classList.add("icon-circle-empty");
                if (mainHeading !== "Completed") {
                    return;
                }
            } else {
                taskCheck.classList.add("icon-circle-thin");
                taskCheckFill.classList.add("invisible");
                counter++;
            }
            taskCheck.classList.add("task-completed");
            addCompleteTodoEventListener(taskCheck, todo, user);

            const taskDetails = createElement("div", ["task-details"]);
            const details = createElement("div", ["task-description"], todo.description);
            const date = createElement("div", ["task-date"]);

            loadTodoIcons(date, todo.priority, todo.dueDate, todo.dueTime, todo.overdue);
            taskDetails.append(details, date);
            taskMain.append(taskCheck, taskCheckFill, taskDetails);
            task.append(taskMain, deleteTask);
            taskGroup.append(task);
            addDeleteTodoEventListener(deleteTask, project, todo, task, user);
        });
        taskContainer.append(taskGroup);
        main.append(taskContainer);
        generateAddTaskBtn(taskGroup, project.name); // Add task button at end
    });
    updateTaskCount(counter); // Update task summary
}

function generateAddTaskBtn(div, project) {
    // For every project listed, put add task button at the end
    const task = createElement("div", ["task"]);
    const addTaskBtn = createElement("div", ["add-task", "add-task-button", project]);
    const icon = createElement("i", ["icon-plus"]);
    const textNode = document.createTextNode("Add task");

    addTaskBtn.append(icon, textNode);
    task.append(addTaskBtn);
    div.append(task);
    addTaskEventListener(addTaskBtn, addTaskBtn.classList[2]);
}

function loadTodoIcons(div, priority, date, time, overdue) {
    if (priority) {
        const icon = createElement("i", ["icon-clock", "priority"]);
        div.append(icon);
    }
    const dueDate = createElement("div", "", `${date}  ${time}`);
    dueDate.id = "due-date";
    div.append(dueDate);

    if (overdue) {
        const icon = createElement("i", ["icon-attention-circled"]);
        const overdueDiv = createElement("div", ["overdue"], "Overdue");
        div.append(icon, overdueDiv);
    }
}

export function removeTodo(project, todo, task, user) {
    const projectObject = user.getProjectByName(project.name);
    const todoRef = projectObject.getTodoById(todo.id);
    let tempTotalTasks = parseInt(document.querySelector(".task-summary").textContent[0]);

    if (!todoRef.completed) {
        updateTaskCount(--tempTotalTasks);
    }
    projectObject.removeTodo(todoRef);
    task.remove();
}

export function toggleCompleteTodo(todo, icon) {
    const iconBackground = icon.nextSibling;
    todo.toggleComplete();

    // Update icon
    const isCompleted = todo.completed;
    icon.classList.toggle("icon-circle-thin", !isCompleted);
    icon.classList.toggle("icon-circle-empty", isCompleted);
    iconBackground.classList.toggle("invisible", !isCompleted);
    iconBackground.classList.toggle("visible", isCompleted);
}
