import { addDOMProject } from "./dom.js";
import { Project, Todo, User } from "./models.js";
import { isAfter, isSameDay } from "date-fns";
import { parse } from "date-fns";

export function recreateUserObject(userData) {
    const user = new User(userData.name);
    userData.projects.forEach((project) => {
        const projectObject = new Project(project.name);
        const projectTodos = project.todos;

        projectTodos.forEach((todo) => {
            const todoObject = new Todo(
                todo.description,
                todo.dueDate,
                todo.dueTime,
                todo.priority,
                todo.completed
            );
            projectObject.addTodo(todoObject);
        });
        user.addNewProject(projectObject);
    });
    return user;
}

export function saveDetails(user) {
    // Store user JSON in localStorage
    localStorage.setItem("user", JSON.stringify(user));
}

export function addProject(name, user) {
    const project = new Project(name);
    if (user.getProjects().some((existingProject) => existingProject.name === project.name)) {
        // If already exists don't create new project
        return;
    }
    user.addNewProject(project);
    addDOMProject(project);
    saveDetails(user);
    return project;
}

export function addTodo(description, date, time, priority, project, user) {
    const todo = new Todo(description, date, time, priority);
    project.addTodo(todo);
    saveDetails(user);
}

export function formatDate(dueDate, dueTime) {
    const dateString = `${dueDate} ${dueTime}`;
    const dateFormat = "yyyy-MM-dd HH:mm";
    return parse(dateString, dateFormat, new Date());
}

export function getCompletedProjects(projects) {
    return projects
        .filter((project) => project.getTodoList().some((todo) => todo.completed))
        .map((project) => ({
            ...project,
            todos: project.getTodoList().filter((todo) => todo.completed),
        }));
}

export function getTodaysProjects(projects) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return projects
        .filter((project) =>
            project
                .getTodoList()
                .some((todo) => isSameDay(new Date(todo.getDate()), today) && !todo.completed)
        )
        .map((project) => ({
            ...project,
            todos: project
                .getTodoList()
                .filter(
                    (todo) => isSameDay(new Date(todo.getDate()), today) && !todo.completed
                ),
        }));
}

export function getScheduledProjects(projects) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return projects
        .filter((project) =>
            project
                .getTodoList()
                .some((todo) => isAfter(new Date(todo.getDate()), today) && !todo.completed)
        )
        .map((project) => ({
            ...project,
            todos: project.getTodoList().filter((todo) => {
                const todoDate = new Date(todo.getDate());
                return isAfter(todoDate, today) && !todo.completed;
            }),
        }));
}

export function getSearchedProjects(projects, searchValue) {
    const lowerCaseSearchValue = searchValue.toLowerCase();

    return projects
        .filter((project) =>
            project
                .getTodoList()
                .some(
                    (todo) =>
                        todo.description.toLowerCase().includes(lowerCaseSearchValue) &&
                        !todo.completed
                )
        )
        .map((project) => ({
            ...project,
            todos: project
                .getTodoList()
                .filter(
                    (todo) =>
                        todo.description.toLowerCase().includes(lowerCaseSearchValue) &&
                        !todo.completed
                ),
        }));
}
