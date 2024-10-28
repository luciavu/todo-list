import { setupUserEventListeners } from "./events";
import { formatDate } from "./app.js";
import { isBefore } from "date-fns";

const todosMap = new WeakMap(); // Private todos property for Project

export class Todo {
    static idCounter = 0;

    constructor(description, dueDate, dueTime, priority, completed = false) {
        this.id = ++Todo.idCounter;
        this.description = description;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.priority = priority;
        this.completed = completed;
        this.overdue = this.checkOverdue();
    }

    toggleComplete() {
        this.completed = !this.completed;
        // No longer overdue once completed
        this.overdue = this.completed ? false : this.checkOverdue();
    }

    getDate() {
        return formatDate(this.dueDate, this.dueTime);
    }

    checkOverdue() {
        return isBefore(new Date(this.getDate()), new Date());
    }
}

export class Project {
    constructor(name) {
        this.name = name;
        todosMap.set(this, []);
    }

    addTodo(todo) {
        todosMap.get(this).push(todo);
    }

    get todos() {
        return todosMap.get(this);
    }

    removeTodo(todo) {
        const todos = todosMap.get(this);
        const updatedTodos = todos.filter((t) => t.id !== todo.id);
        todosMap.set(this, updatedTodos);
    }

    getTodoById(id) {
        return this.todos.find((todo) => todo.id === id);
    }
}

export class User {
    constructor(name, projects = []) {
        this.name = name;
        this.projects = projects;
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

    // Define JSON format
    toJSON() {
        return {
            name: this.name,
            projects: this.projects.map((project) => ({
                name: project.name,
                todos: project.todos,
            })),
        };
    }
}
