import { addTodo } from "./app.js";
export function retrieveProjectDetails() {
    const projectName = document.getElementById("form-projectname");
    return projectName.value.replace(/ /g, ""); // Remove whitespace
}

export function retrieveTaskDetails(user) {
    const popup = document.querySelector(".add-task-popup");
    const taskName = document.getElementById("form-taskname").value;
    let projectName = document.getElementById("project-select").value;
    const taskDate = document.getElementById("form-taskdate").value;
    const taskTime = document.getElementById("form-tasktime").value;
    const priority = document.getElementById("is-priority").checked;

    // Only add task if name, date and time was filled out
    if (!taskName || !taskDate || !taskTime) {
        console.warn("Please fill out all fields.");
        return;
    }

    // If added main task directly from project, use project value instead
    if (document.querySelector(".form-project").classList.contains("invisible")) {
        projectName = popup.classList[1]; // Retrieve temporary project name tag
    }

    const project = user.getProjectByName(projectName);

    addTodo(taskName, taskDate, taskTime, priority, project, user);
}
