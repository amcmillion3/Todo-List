import {Task} from './task-constructor';
import {Project} from './project-constructor';

const domEvents = () => {
    const projectForm = document.getElementById('project-form');
    const addProjectButton = document.getElementById('add-project-button');
    const cancelProjectButton = document.getElementById('cancel-project-button');
    
    addProjectButton.addEventListener('click', addProject);
    cancelProjectButton.addEventListener('click', projectForm.reset());
    
    const LOCAL_STORAGE_PROJECT_KEY = 'todo.projects';
    const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'todo.selectedProjectID'

    let theProjectsList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
    let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY);
    
    function addProject(e) {
        e.preventDefault();
        let titleValue = {
            title: document.getElementById('project-form-title').value,
        };
        let newProject = new Project(titleValue.title);
        theProjectsList.push(newProject);
        displayProjects(theProjectsList);
        setStorage();
        projectForm.reset();
    };

    const projectsList = document.getElementById('projects-list');

    function displayProjects (theProjectsList) {
        while (projectsList.firstChild) {  
            projectsList.removeChild(projectsList.firstChild);
        };
        for(let i = 0; i < theProjectsList.length; i++) {
            let projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.dataset.id = i;
            if (projectCard.dataset.id === selectedProjectId) {
                projectCard.classList.add('active-project');
            };

            let projectTitle = document.createElement('p');
            projectTitle.textContent = `${theProjectsList[i].title}`;
            projectTitle.classList.add('project-title');
            projectTitle.dataset.id = i;
            projectCard.appendChild(projectTitle);

            let removeProjectButton = document.createElement('button');
            removeProjectButton.classList.add('fa', 'fa-times');
            removeProjectButton.setAttribute('type', 'submit');
            projectCard.appendChild(removeProjectButton);

            removeProject(projectCard, removeProjectButton);

            projectsList.appendChild(projectCard);

            theProjectsList[i].id = i;
        };
    };

    const taskHeader = document.getElementById('task-header');

    projectsList.addEventListener('click', e => {
        if (e.target.tagName.toLowerCase() === 'div' || e.target.tagName.toLowerCase() === 'p') {
            selectedProjectId = e.target.dataset.id;
        };
        const selectedProject = theProjectsList.find(project => project.id == selectedProjectId);
        let currentTaskList = selectedProject.taskArray;
        taskHeader.textContent = selectedProject.title;
        setStorage();
        displayProjects(theProjectsList);
        displayTasks(currentTaskList);
    });

    (function selectedProjectOnLoad() {
        const selectedProject = theProjectsList.find(project => project.id == selectedProjectId);
        let currentTaskList = selectedProject.taskArray;
        taskHeader.textContent = selectedProject.title;
        setStorage();
        displayProjects(theProjectsList);
        displayTasks(currentTaskList);
    })();

    function removeProject(projectCard, removeProjectButton) {
        removeProjectButton.addEventListener('click', (e) => {
            theProjectsList.splice(projectCard.dataset.id, 1);
            if (selectedProjectId === projectCard.dataset.id) {
                selectedProjectId = null;
            };
            displayProjects(theProjectsList);
            return theProjectsList;
        });
        setStorage();
    };

    const createDefaultProject = (() => {
        if (theProjectsList.some(project => project.title ==='Default')){
            return;
        } else {
            let defaultProjectTitle = 'Default';
            let defaultProject = new Project(defaultProjectTitle); 
            theProjectsList.push(defaultProject);
            displayProjects(theProjectsList);
            setStorage();
        }
    })();
    
    const taskForm = document.getElementById('task-form');
    const addTaskButton = document.getElementById('add-task-button');
    const cancelTaskButton = document.getElementById('cancel-task-button');

    addTaskButton.addEventListener('click', addTask);
    cancelTaskButton.addEventListener('click', taskForm.reset());
    
    function addTask(e) {
        e.preventDefault();
        const selectedProject = theProjectsList.find(project => project.id == selectedProjectId);
        if (selectedProjectId === null) {
            alert('Please select a project');
        } else {
            let currentTaskList = selectedProject.taskArray;
            let taskValues = {
                title: document.getElementById('task-form-title').value,
                description: document.getElementById('task-form-description').value,
                dueDate: document.getElementById('date-picker').value,
                priority: document.getElementById('priority-selector').value
            };
            let newTask = new Task(taskValues.title, taskValues.description, taskValues.dueDate, taskValues.priority);
            currentTaskList.push(newTask);
            displayTasks(currentTaskList);
            setStorage();
            taskForm.reset();
        };
    };

    function displayTasks (tasksList) {
        const taskCardsList = document.getElementById('cards');
        while (taskCardsList.firstChild) {
            taskCardsList.removeChild(taskCardsList.firstChild);
        };
        for(let i = 0; i < tasksList.length; i++) {
            let taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            taskCard.dataset.id = i;

            let taskTitle = document.createElement('p');
            taskTitle.textContent = `${tasksList[i].title}`;
            taskTitle.classList.add('task-title');
            taskCard.appendChild(taskTitle);

            let taskDescription = document.createElement('p');
            taskDescription.textContent = `${tasksList[i].description}`;
            taskDescription.classList.add('task-description');
            taskCard.appendChild(taskDescription);

            let taskDate = document.createElement('p');
            taskDate.textContent = `${tasksList[i].dueDate}`;
            taskDate.classList.add('task-date');
            taskCard.appendChild(taskDate);

            let taskPriority = document.createElement('p');
            taskPriority.textContent = `Priority: ${tasksList[i].priority}`;
            taskPriority.classList.add('task-priority');
            taskCard.appendChild(taskPriority);

            let removeTaskButton = document.createElement('button');
            removeTaskButton.classList.add('fa', 'fa-times');
            removeTaskButton.setAttribute('type', 'submit');
            taskCard.appendChild(removeTaskButton);

            removeTask(taskCard, removeTaskButton);

            taskCardsList.appendChild(taskCard);
        };
    };

    function removeTask(taskCard, removeTaskButton) {
        const selectedProject = theProjectsList.find(project => project.id == selectedProjectId);
        let currentTaskList = selectedProject.taskArray;
        removeTaskButton.addEventListener('click', (e) => {
            currentTaskList.splice(taskCard.dataset.id, 1);
            displayTasks(currentTaskList);
            return currentTaskList;
        });
        setStorage();
    };

    function setStorage() {
        localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(theProjectsList));
        localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId);
      };

      const restoreProjects = (() => {
        if(!localStorage.theProjectsList) {
            displayProjects(theProjectsList);
        }else {
            let objects = localStorage.getItem('theProjectsList') 
            objects = JSON.parse(objects);
            theProjectsList = objects;
            displayProjects(objects);
        }
      })();

      const restoreTasks = (() => {
          const selectedProject = theProjectsList.find(project => project.id == selectedProjectId);
          let currentTaskList = selectedProject.taskArray;
        if(!localStorage.currentTaskList) {
            displayTasks(currentTaskList);
        }else {
            let objects = localStorage.getItem('currentTaskList') 
            objects = JSON.parse(objects);
            currentTaskList = objects;
            displayTasks(objects);
        }
      })();
};

export {domEvents};