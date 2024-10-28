import { addDOMProject } from "./dom.js";
import { Project, Todo } from "./models.js";
import { isAfter, isSameDay } from "date-fns";

import { parse } from "date-fns";

export function addProject(name, user) {
    const project = new Project(name);
    user.addNewProject(project);
    addDOMProject(project);
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
    const todo = new Todo(description, dueDate, dueTime, priority, project);
    console.log(dueDate, dueTime);
    console.log(user);
    project.addTodo(todo);
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
    console.log(searchValue);
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
