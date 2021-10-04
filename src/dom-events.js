import {Task} from './task-constructor';
import {Project} from './project-constructor';

const domEvents = () => {
    const addProjectButton = document.getElementById('add-project-button');
    
    addProjectButton.addEventListener('click', addProject);
    
    let theProjectsList = [];
    
    function addProject(e) {
        e.preventDefault();
        const projectForm = document.getElementById('project-form');
        let titleValue = {
            title: document.getElementById('project-form-title').value
        };
        let newProject = new Project(titleValue.title);
        theProjectsList.push(newProject);
        displayProjects(theProjectsList);
        setStorage();
        projectForm.reset();
    };

    function displayProjects (theProjectsList) {
        const projectsList = document.getElementById('projects-list');
        while (projectsList.firstChild) {
            projectsList.removeChild(projectsList.firstChild);
        };
        for(let i = 0; i < theProjectsList.length; i++) {
            let projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.dataset.id = i;
            projectCard.textContent = `${theProjectsList[i].title}`;
            projectsList.appendChild(projectCard);
        };
    };
    
    function setStorage() {
        localStorage.setItem(`theProjectsList`, JSON.stringify(theProjectsList));
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
};

export {domEvents};