import {Task} from './task-constructor';
import {Project} from './project-constructor';

const domEvents = () => {
    const projectForm = document.getElementById('project-form');
    const addProjectButton = document.getElementById('add-project-button');
    const cancelProjectButton = document.getElementById('cancel-project-button');
    
    addProjectButton.addEventListener('click', addProject);
    cancelProjectButton.addEventListener('click', projectForm.reset());
    
    let theProjectsList = [];
    
    function addProject(e) {
        e.preventDefault();
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

            let projectTitle = document.createElement('p');
            projectTitle.textContent = `${theProjectsList[i].title}`;
            projectTitle.classList.add('project-title');
            projectCard.appendChild(projectTitle);

            let removeProjectButton = document.createElement('button');
            removeProjectButton.classList.add('fa', 'fa-times');
            removeProjectButton.setAttribute('type', 'submit');
            projectCard.appendChild(removeProjectButton);

            removeProject(projectCard, removeProjectButton);

            projectsList.appendChild(projectCard);
        };
    };

    function removeProject(projectCard, removeProjectButton) {
        removeProjectButton.addEventListener('click', (e) => {
            theProjectsList.splice(projectCard.dataset.id, 1);
            displayProjects(theProjectsList);
            return theProjectsList;
        });
        setStorage();
    }
    
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