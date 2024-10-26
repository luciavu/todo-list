export function setupMainEventListeners() {
    // Add task from sidebar/notes
    const sideAddTaskBtn = document.querySelector(".add-task");
    sideAddTaskBtn.addEventListener("click", () => {
        console.log("Add task button clicked");
    });

    // Add project
    const addProjectButton = document.querySelector(".add-project");
    addProjectButton.addEventListener("click", () => {
        console.log("Add project button clicked");
    });

    // Click on project folder
    const projectFolders = document.querySelectorAll(".project");
    for (let project of projectFolders) {
        project.addEventListener("click", () => {
            console.log(`${project.id} folder clicked`);
            // Switch active and change appearance on dom
        });
    }

    // Click on section
    const sections = document.querySelectorAll(".section");
    for (let section of sections) {
        section.addEventListener("click", () => {
            console.log(`${section.id} section clicked`);
            // Switch active and change appearance on dom
        });
    }

    // Search text input
    const searchbar = document.getElementById("search-bar");
    searchbar.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            this.blur();
        }
    });
    searchbar.addEventListener("blur", () => {
        console.log(`User searched for ${searchbar.value}`);
    });

    // Change name
    const username = document.getElementById("name");

    username.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            this.blur();
        }
    });
    username.addEventListener("blur", () => {
        console.log(`User changed their name to ${username.value}`);
    });

    // Sidebar collapse button
    const collapse = document.querySelector(".arrow");
    collapse.addEventListener("click", () => {
        console.log("User collapsed the sidebar");
    });
}

export function setupTaskEventListeners(task, completeBtn, deleteBtn) {
    deleteBtn.addEventListener("click", () => {
        // Remove task
        console.log("Remove task");
    });
    // Remove task from all, move to complete on refresh
    completeBtn.addEventListener("click", () => {
        console.log("Complete task");
    });
}

export function setupProjectEventListeners(project, addTaskBtn) {
    addTaskBtn.addEventListener("click", () => {
        console.log("User wants to add a task to a certain project. ");
    });
}
