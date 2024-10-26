class Todo {
    constructor(description, dueDate, priority, completed, project = "school") {
        this.description = description;
        this.dueDate = dueDate;
        this.overdue = false;
        this.priority = priority;
        this.completed = completed;
        this.project = project;
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
}
