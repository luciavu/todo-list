import { addDOMProject } from "./dom.js";
import { Project, Todo } from "./models.js";
import { isAfter, isSameDay } from "date-fns";
import { User } from "./models.js";
import { parse } from "date-fns";

export function recreateUserObject(userData) {
    const user = new User(userData.name);
    for (let project of userData.projects) {
        let projectObject = new Project(project.name);

        const projectTodos = project.todos;

        for (let todo of projectTodos) {
            const todoObject = new Todo(
                todo.description,
                todo.dueDate,
                todo.dueTime,
                todo.priority
            );
            projectObject.addTodo(todoObject);
        }

        user.addNewProject(projectObject);
    }
    console.log(user);
    return user;
}
export function saveDetails(user) {
    console.log(user);
    // Convert user object to JSON string
    const userDetails = JSON.stringify(user);
    console.log(userDetails);
    // Store in localStorage
    localStorage.setItem("user", userDetails);
}

export function addProject(name, user) {
    const project = new Project(name);
    if (
        user
            .getProjects()
            .some((existingProject) => existingProject.name === project.name)
    ) {
        // If already exists don't create new project
        return;
    }
    user.addNewProject(project);
    addDOMProject(project);
    saveDetails(user);
    console.log("saved", project);
    return project;
}

export function addTodo(
    description,
    dueDate,
    dueTime,
    priority,
    project,
    user
) {
    const todo = new Todo(description, dueDate, dueTime, priority);
    project.addTodo(todo);
    saveDetails(user);
    console.log("saved", todo, "in", project);
    console.log(localStorage.getItem("user"));
}

export function formatDate(dueDate, dueTime) {
    const dateString = `${dueDate} ${dueTime}`;
    const dateFormat = "dd/MM/yy hh:mma";

    // Todo date as date object
    const parsedDate = parse(dateString, dateFormat, new Date());
    return parsedDate;
}

export function getCompletedProjects(projects) {
    return projects
        .filter((project) =>
            project.getTodoList().some((todo) => todo.completed)
        )
        .map((project) => ({
            ...project,
            todos: project.getTodoList().filter((todo) => todo.completed),
        }));
}

export function getTodaysProjects(projects) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset today's date

    return projects
        .filter((project) =>
            project.getTodoList().some((todo) => {
                const todoDate = new Date(todo.getDate());
                return isSameDay(todoDate, today); // Check date is same as today
            })
        )
        .map((project) => ({
            ...project,
            todos: project.getTodoList().filter((todo) => {
                const todoDate = new Date(todo.getDate());
                return isSameDay(todoDate, today); // Filter todos
            }),
        }));
}

export function getScheduledProjects(projects) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return projects
        .filter((project) =>
            project.getTodoList().some((todo) => {
                const todoDate = new Date(todo.getDate());
                return isAfter(todoDate, today); // Check todo date is after today
            })
        )
        .map((project) => ({
            ...project,
            todos: project.getTodoList().filter((todo) => {
                const todoDate = new Date(todo.getDate());
                return isAfter(todoDate, today);
            }),
        }));
}

export function getSearchedProjects(projects, searchValue) {
    const lowerCaseSearchValue = searchValue.toLowerCase();

    return projects
        .filter((project) =>
            project
                .getTodoList()
                .some((todo) =>
                    todo.description
                        .toLowerCase()
                        .includes(lowerCaseSearchValue)
                )
        )
        .map((project) => ({
            ...project,
            todos: project
                .getTodoList()
                .filter((todo) =>
                    todo.description
                        .toLowerCase()
                        .includes(lowerCaseSearchValue)
                ),
        }));
}
