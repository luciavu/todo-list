import { updateTaskCount } from "./dom";
import { setupUserEventListeners } from "./events";

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
    }

    toggleComplete() {
        this.completed = !this.completed;
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

    getTodoList() {
        return this.todos;
    }

    removeTodo(todo) {
        this.getTodoList().pop(todo);
    }

    getTodoById(id) {
        return this.getTodoList().find((todo) => todo.id === id);
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
        console.log(this.getProjects());
    }

    getProjectByName(name) {
        return this.projects.find((project) => project.name === name);
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

    getCompletedProjects() {
        return this.projects
            .filter((project) =>
                project.getTodoList().some((todo) => todo.completed)
            )
            .map((project) => ({
                ...project,
                todos: project.getTodoList().filter((todo) => todo.completed),
            }));
    }
}
