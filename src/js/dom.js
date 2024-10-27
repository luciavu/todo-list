import {
    addTaskEventListener,
    setupProjectEventListeners,
    setupTaskEventListeners,
} from "./events";

export function addDOMProject(project) {
    // Add project folder
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

    // Add project to list
    const formOptions = document.getElementById("project-select");
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    formOptions.append(option);
    console.log("added");
}

export function addTaskPopup(name) {
    const popup = document.querySelector(".add-task-popup");
    // Keep track of what project the task is under
    popup.classList.add(name);
    console.log("add task popup");
    popup.classList.add("visible");
}

export function addProjectPopup() {
    const popup = document.querySelector(".add-project-popup");
    console.log("add project popup");
    popup.classList.add("visible");
}

export function exitTaskPopup() {
    // Remove project tag
    const addTaskPopup = document.querySelector(".add-task-popup");
    addTaskPopup.classList.remove(addTaskPopup.classList[1]);

    const taskName = document.getElementById("form-taskname");
    const taskDate = document.getElementById("form-taskdate");
    const taskTime = document.getElementById("form-tasktime");
    const clearValues = [taskName, taskDate, taskTime];

    // Clear input values, hide popup
    clearValues.forEach((input) => {
        input.value = "";
    });
    addTaskPopup.classList.remove("visible");
}

export function exitProjectPopup() {
    const addProjectPopup = document.querySelector(".add-project-popup");
    const projectName = document.getElementById("form-projectname");
    // Clear input values, hide popup
    projectName.value = "";
    addProjectPopup.classList.remove("visible");
}

export function setActive(element) {
    // Toggle current active
    const currentActive = document.querySelector(".active");
    currentActive.classList.toggle("active");
    // Set new active
    element.classList.add("active");
}

export function updateTaskCount(user) {
    const taskCounter = document.querySelector("task-summary");
    taskCounter.textContent = user.taskSummary();
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
        const project = user.getProjectByName(group.id);
        console.log(project);
        loadProject(project, group.id);
        console.log("reloaded");
    } else {
        // Section
        loadSection(user, group);
    }
}

export function loadSection(user, section) {
    switch (section.id) {
        case "all":
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

    // Change to array
    if (!Array.isArray(projects)) {
        projects = [projects];
    }

    console.log(projects);
    for (let project of projects) {
        console.log(project);
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
            setupTaskEventListeners(project, todo, task, taskCheck, deleteTask);
        }

        taskContainer.append(taskGroup);
        main.append(taskContainer);

        // Add task button at the end
        generateAddTaskBtn(taskGroup, project.name);
    }
}

function generateAddTaskBtn(div, project) {
    // For every project listed, put add task button at the end
    const task = document.createElement("div");
    task.classList.add("task");

    const addTaskBtn = document.createElement("div");
    addTaskBtn.classList.add("add-task");
    addTaskBtn.classList.add("add-task-button");
    addTaskBtn.classList.add(project);

    const icon = document.createElement("i");
    icon.classList.add("icon-plus");

    addTaskBtn.append(icon);

    const textNode = document.createTextNode("Add task");
    addTaskBtn.append(textNode);

    task.append(addTaskBtn);
    div.append(task);
    addTaskEventListener(addTaskBtn, addTaskBtn.classList[2]);
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

export function removeTodo(project, todo, task) {
    const todoRef = project.getTodoById(todo.id);
    project.removeTodo(todoRef);

    task.remove();
}
