import { addProject } from "./app.js";
import {
    addDOMProject,
    loadSection,
    updateTaskCount,
    loadUsername,
    addProjectOption,
} from "./dom.js";

export function loadDefaultView(user) {
    const allSection = document.getElementById("all");
    updateTaskCount(0);
    loadSection(user, allSection);
}

export function loadDefaultTasks(user) {
    const allSection = document.getElementById("all");
    const defaultProjects = ["School", "Work", "Errands"];

    defaultProjects.forEach((projectName) => {
        addProject(projectName, user);
    });
    loadSection(user, allSection);
}

export function loadUserData(user) {
    const allSection = document.getElementById("all");
    loadUsername(user.name);
    user.getProjects().forEach((project) => {
        addProjectOption(project);
        addDOMProject(project, user);
    });
    loadSection(user, allSection);
}
