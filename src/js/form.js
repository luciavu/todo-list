export function retrieveProjectDetails() {
    const projectName = document.getElementById("form-projectname");
    console.log(projectName.value);
}

export function retrieveTaskDetails() {
    const taskName = document.getElementById("form-taskname").value;
    const taskDate = document.getElementById("form-taskdate").value;
    const taskTime = document.getElementById("form-tasktime").value;
    const priority = document.getElementById("is-priority").value;
    console.log(taskName, taskDate, taskTime, priority);
}
