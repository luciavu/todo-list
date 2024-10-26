import { addDOMProject } from "./dom.js";
import { Project, Todo, User } from "./models.js";

export function addProject(name, user) {
    const project = new Project(name);
    user.addNewProject(project);
    addDOMProject(project);
}

export function addTodo(description, dueDate, dueTime, priority, project) {
    const todo = new Todo(description, dueDate, dueTime, priority, project);
    project.add(todo);
}
