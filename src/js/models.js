import { updateTaskCount } from "./dom";
import { setupUserEventListeners } from "./events";

export class Todo {
    constructor(description, dueDate, dueTime, priority, project) {
        this.description = description;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.overdue = false;
        this.priority = priority;
        this.completed = false;
        this.project = project;
    }
    // Logic for checking if overdue using dates
}

export class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    toString() {
        console.log(
            `I am project ${this.name} with ${this.todos.length} todos`
        );
    }
}

export class User {
    constructor(name, totalTasks = 0, projects) {
        this.name = name;
        this.totalTasks = totalTasks;
        this.projects = [];
        this.init();
    }

    init() {
        setupUserEventListeners(this);
    }

    setName(name) {
        this.name = name;
        console.log(this);
        return this.name;
    }

    getProjects() {
        return this.projects;
    }

    addNewProject(project) {
        this.projects.push(project);
        console.log(this.projects.length);
    }

    taskSummary() {
        return `${this.totalTasks} tasks remaining`;
    }

    // User adds a task
    incrementTasks() {
        this.totalTasks++;
        updateTaskCount(this.totalTasks);
    }

    // User completes or deletes a task
    decrementTasks() {
        this.totalTasks--;
        updateTaskCount(this.totalTasks);
    }
}