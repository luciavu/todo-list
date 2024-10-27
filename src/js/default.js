import { addProject, addTodo } from "./app.js";
import { loadSection } from "./dom.js";

function loadDefaultView(user) {
    const all = document.getElementById("all");
    loadSection(user, all);
}

function loadDefaultUser(user) {
    const taskSummary = document.querySelector(".task-summary");
    taskSummary.textContent = user.taskSummary();
}

function loadDefaultTasks(user) {
    const defaultProjects = ["School", "Work", "Errands"];

    defaultProjects.forEach((projectName) => {
        const project = addProject(projectName, user);
        addTodo("Add a task", `28/10/24`, "12:00am", true, project);

        addTodo("Task 2", `28/10/24`, `12:00am`, true, project);
    });
}

export function loadDefault(user) {
    loadDefaultUser(user);
    loadDefaultTasks(user);
    loadDefaultView(user);
}
