import { addProject } from "./app.js";
import { Project } from "./models.js";
import {
    addDOMProject,
    loadSection,
    updateTaskCount,
    loadUsername,
} from "./dom.js";

export function loadDefaultView(user) {
    const all = document.getElementById("all");
    updateTaskCount(0);
    loadSection(user, all);
}

export function loadDefaultTasks(user) {
    const all = document.getElementById("all");
    const defaultProjects = ["School", "Work", "Errands"];

    defaultProjects.forEach((projectName) => {
        addProject(projectName, user);
    });
    loadSection(user, all);
}

export function loadExistingData(user) {
    loadUsername(user.name);
    user.getProjects().forEach((project) => {
        addDOMProject(project, user);
    });
}
