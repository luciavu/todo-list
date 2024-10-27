import { addTodo } from "./app.js";
export function retrieveProjectDetails() {
    const projectName = document.getElementById("form-projectname");
    return projectName.value;
}

export function retrieveTaskDetails(user) {
    const projectSelect = document.querySelector(".form-project");
    const popup = document.querySelector(".add-task-popup");
    const taskName = document.getElementById("form-taskname").value;
    let projectName = document.getElementById("project-select").value;
    const taskDate = document.getElementById("form-taskdate").value;
    const taskTime = document.getElementById("form-tasktime").value;
    const priority = document.getElementById("is-priority").value;

    // If added main task directly from project, use project value instead
    if (projectSelect.classList.contains("invisible")) {
        projectName = popup.classList[1]; // Retrieve temporary project name tag
    }

    addTodo(
        taskName,
        taskDate,
        taskTime,
        priority,
        user.getProjectByName(projectName)
    );
    console.log(user.getProjectByName(projectName));
}
