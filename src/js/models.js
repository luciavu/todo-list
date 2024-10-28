import { setupUserEventListeners } from "./events";
import { formatDate } from "./app.js";
import { isBefore } from "date-fns";

export class Todo {
    static idCounter = 0;

    constructor(description, dueDate, dueTime, priority, project) {
        this.id = ++Todo.idCounter;
        this.description = description;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.overdue = false;
        this.priority = priority;
        this.completed = false;
        this.project = project;
        this.init();
    }

    init() {
        this.isOverdue();
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    getDate() {
        return formatDate(this.dueDate, this.dueTime);
    }

    isOverdue() {
        // Get the current date
        const currentDate = new Date();

        if (isBefore(this.getDate(), currentDate)) {
            this.overdue = true;
        }
    }
}

export class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    getTodoList() {
        return this.todos;
    }

    removeTodo(todo) {
        this.getTodoList().pop(todo);
    }

    getTodoById(id) {
        return this.getTodoList().find((todo) => todo.id === id);
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
        return this.name;
    }

    getProjects() {
        return this.projects;
    }

    addNewProject(project) {
        this.projects.push(project);
    }

    getProjectByName(name) {
        return this.projects.find((project) => project.name === name);
    }
}
