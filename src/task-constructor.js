import { format } from "date-fns";

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority
    };
}; 

const addToTasks = (e) => {
    e.preventDefault();
    let tasks = [];
    format.style.display = 'none';
    taskValues = {
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-description').value,
        dueDate: document.getElementById('task-date').value,
        priority: document.getElementById('task-priority').value
    };
    let newTask = new Task(taskValues.title, taskValues.description, taskValues.dueDate, taskValues.priority);
    tasks.push(newTask);
    displayTasks(tasks);
};

export {addToTasks};