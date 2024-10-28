import { addDOMProject, updateTaskCount } from "./dom.js";
import { Project, Todo, User } from "./models.js";

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
