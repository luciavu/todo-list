import { addProject, addTodo } from "./app.js";
import { loadSection } from "./dom.js";

function loadDefaultView(user) {
    const all = document.getElementById("all");
    loadSection(user, all);
}

function loadDefaultTasks(user) {
    const defaultProjects = ["School", "Work", "Errands"];

    defaultProjects.forEach((projectName) => {
        const project = addProject(projectName, user);
        addTodo("Add a task", `29/10/24`, "12:00am", true, project, user);

        addTodo("Task 2", `28/10/24`, `12:00am`, true, project, user);
    });
}

export function loadDefault(user) {
    loadDefaultTasks(user);
    loadDefaultView(user);
}
