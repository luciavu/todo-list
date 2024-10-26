import { addDOMProject } from "./dom.js";
import { Project } from "./models.js";

export function loadDefaultUser(user) {
    const taskSummary = document.querySelector(".task-summary");
    taskSummary.textContent = user.taskSummary();
}

export function loadDefaultTasks(user) {
    const defaultProjects = ["School", "Work", "Errands"];

    defaultProjects.forEach((projectName) => {
        const project = new Project(projectName);
        user.addNewProject(project);
        addDOMProject(project);
    });
}
