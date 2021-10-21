/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom-events.js":
/*!***************************!*\
  !*** ./src/dom-events.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domEvents": () => (/* binding */ domEvents)
/* harmony export */ });
/* harmony import */ var _task_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task-constructor */ "./src/task-constructor.js");
/* harmony import */ var _project_constructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-constructor */ "./src/project-constructor.js");



const domEvents = () => {
    const projectForm = document.getElementById('project-form');
    const addProjectButton = document.getElementById('add-project-button');
    const cancelProjectButton = document.getElementById('cancel-project-button');
    
    addProjectButton.addEventListener('click', addProject);
    cancelProjectButton.addEventListener('click', resetAndToggle);
    
    const LOCAL_STORAGE_PROJECT_KEY = 'todo.projects';
    const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'todo.selectedProjectID'

    let theProjectsList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
    let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY) || 0;
    
    function addProject(e) {
        e.preventDefault();
        let titleValue = {
            title: document.getElementById('project-form-title').value,
        };
        let newProject = new _project_constructor__WEBPACK_IMPORTED_MODULE_1__.Project(titleValue.title);
        theProjectsList.push(newProject);
        displayProjects(theProjectsList);
        setStorage();
        projectForm.reset();
        addProjectFormToggle();
    };

    const addNewProjectButton = document.getElementById('add-new-project');
    addNewProjectButton.addEventListener('click', addProjectFormToggle);

    function addProjectFormToggle() {
        if (projectForm.style.display === 'grid') {
            projectForm.style.display = 'none';
        } else {
            projectForm.style.display = 'grid';
        };
    };

    function resetAndToggle() {
        projectForm.reset();
        addProjectFormToggle();
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
            removeProjectButton.classList.add('remove-project-button', 'fa', 'fa-times', 'fa-lg');
            removeProjectButton.setAttribute('type', 'submit');
            if (projectCard.dataset.id === selectedProjectId) {
                removeProjectButton.classList.add('active-project');
            };
            projectCard.appendChild(removeProjectButton);

            removeProject(projectCard, removeProjectButton);

            projectsList.appendChild(projectCard);

            theProjectsList[i].id = i;

        };
    };
    
    const createDefaultProject = (() => {
        if (theProjectsList.some(project => project.title ==='Default')){
            return;
        } else {
            let defaultProjectTitle = 'Default';
            let defaultProject = new _project_constructor__WEBPACK_IMPORTED_MODULE_1__.Project(defaultProjectTitle); 
            theProjectsList.push(defaultProject);
            displayProjects(theProjectsList);
            setStorage();
        }
    })();

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

    function removeProject(projectCard, removeProjectButton) {
        removeProjectButton.addEventListener('click', (e) => {
            theProjectsList.splice(projectCard.dataset.id, 1);
            if (selectedProjectId === projectCard.dataset.id) {
                selectedProjectId = projectCard.dataset.id - 1;
            };
            displayProjects(theProjectsList);
            return theProjectsList;
        });
        setStorage();
    };


    (function selectedProjectOnLoad() {
        const selectedProject = theProjectsList.find(project => project.id == selectedProjectId);
        let currentTaskList = selectedProject.taskArray;
        taskHeader.textContent = selectedProject.title;
        setStorage();
        displayProjects(theProjectsList);
        displayTasks(currentTaskList);
    })();

    (function toggleHamburger() {
        const hamburger = document.getElementById('nav-icon');
        const projectContainer = document.getElementById('project-section-container');
        hamburger.addEventListener('click', () => {
            if (projectContainer.style.display === 'block') {
                projectContainer.style.display = 'none';
            } else {
                projectContainer.style.display = 'block';
            };
        });
    })();
    
    const taskForm = document.getElementById('task-form');
    const addTaskButton = document.getElementById('add-task-button');
    const cancelTaskButton = document.getElementById('cancel-task-button');

    addTaskButton.addEventListener('click', addTask);
    cancelTaskButton.addEventListener('click', taskResetAndToggle);
    
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
            let newTask = new _task_constructor__WEBPACK_IMPORTED_MODULE_0__.Task(taskValues.title, taskValues.description, taskValues.dueDate, taskValues.priority);
            currentTaskList.push(newTask);
            displayTasks(currentTaskList);
            setStorage();
            taskForm.reset();
            addTaskFormToggle();
        };
    };

    const addNewTaskButton = document.getElementById('add-task');
    addNewTaskButton.addEventListener('click', addTaskFormToggle);

    function addTaskFormToggle() {
        if (taskForm.style.display === 'grid') {
            taskForm.style.display = 'none';
        } else {
            taskForm.style.display = 'grid';
        };
    };

    function taskResetAndToggle() {
        taskForm.reset();
        addTaskFormToggle();
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
            taskTitle.classList.add('task-element', 'task-title');
            taskCard.appendChild(taskTitle);

            let taskDescription = document.createElement('p');
            taskDescription.textContent = `${tasksList[i].description}`;
            taskDescription.classList.add('task-element', 'task-description');
            taskCard.appendChild(taskDescription);

            let taskDate = document.createElement('p');
            taskDate.textContent = `${tasksList[i].dueDate}`;
            taskDate.classList.add('task-element', 'task-date');
            taskCard.appendChild(taskDate);

            let taskPriority = document.createElement('p');
            taskPriority.textContent = `Priority: ${tasksList[i].priority}`;
            taskPriority.classList.add('task-element', 'task-priority');
            taskCard.appendChild(taskPriority);

            let removeTaskButton = document.createElement('button');
            removeTaskButton.classList.add('task-element', 'remove-task-button', 'fa', 'fa-times', 'fa-lg');
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



/***/ }),

/***/ "./src/initial-dom.js":
/*!****************************!*\
  !*** ./src/initial-dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialDomLoad": () => (/* binding */ initialDomLoad)
/* harmony export */ });
const initialDomLoad = () => {
    const body = document.getElementById('content');

    const createHeader = (() => {
        const header = (() => {
            const element = document.createElement('header');
            element.id = 'header';
            body.appendChild(element);
        })();
        
        const headerBar = document.getElementById('header')
        ;
        const title = (() => {
            const element = document.createElement('h1');
            element.classList.add('title');
            element.textContent = 'Todo List';
            headerBar.appendChild(element);
        })();
        
        const navIcon = (() => {
            const element = document.createElement('nav');
            element.classList.add('icon');
            element.id = 'nav-icon';
            headerBar.appendChild(element);
        })();
    
        const nav = document.getElementById('nav-icon');
        
        const menuIcon = (() => {
            const element = document.createElement('i');
            element.classList.add('fa', 'fa-bars');
            nav.appendChild(element);
        })();
    })();

    const main = document.createElement('main');
    body.appendChild(main);

    const createMenu = (() => {
        const menuContainer = (() => {
            const element = document.createElement('section');
            element.classList.add('menu');
            element.id = 'project-section-container';
            main.appendChild(element);
        })();
        const menu = document.querySelector('.menu');

        const projectHeader = (() =>{
            const element = document.createElement('h2');
            element.classList.add('project-menu-title');
            element.textContent = 'Projects';
            menu.appendChild(element);
            element.insertAdjacentHTML('afterbegin', '<i class="fa fa-circle"></i>');
        })();

        const projectsList = (() => {
            const element = document.createElement('div');
            element.id = 'projects-list';
            menu.appendChild(element);
        })();

        const addProjectButton = (() => {
            const element = document.createElement('button');
            element.classList.add('button');
            element.id = 'add-new-project';
            element.textContent = 'Add New Project';
            menu.appendChild(element);
            element.insertAdjacentHTML('afterbegin', '<i class="fa fa-plus"></i>');
        })();

        const addProjectForm = (() => {
            const element = document.createElement('form');
            element.id = 'project-form';
            menu.appendChild(element);
        })();

        const projectForm = document.getElementById('project-form');

        const projectFormElements = (() => {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'project-form-title';
            input.name = 'project-form-title';
            input.placeholder = 'Project Title';
            projectForm.appendChild(input);

            const addButton = document.createElement('button');
            addButton.id = 'add-project-button';
            addButton.type = 'submit';
            addButton.textContent = 'Add Project';
            projectForm.appendChild(addButton);

            const cancelButton = document.createElement('button');
            cancelButton.id = 'cancel-project-button';
            cancelButton.type = 'submit';
            cancelButton.textContent = 'Cancel';
            projectForm.appendChild(cancelButton);
        })();
    })();

    const createTaskContainer = (() => {
        const element = document.createElement('section');
        element.classList.add('task-container');
        element.id = 'task-container';
        main.appendChild(element);
    })();

    const taskContainer = document.getElementById('task-container');

    const taskHeader = (() => {
        const element = document.createElement('h2');
            element.classList.add('task-header');
            element.id = 'task-header';
            element.textContent = 'Current Project';
            taskContainer.appendChild(element);
            element.insertAdjacentHTML('afterbegin', '<i class="fa fa-circle"></i>');
    })();

    const createCards = (() => {
        const element = document.createElement('div');
        element.classList.add('cards');
        element.id = 'cards';
        taskContainer.appendChild(element);
    })();

    const addTaskButton = (() => {
        const element = document.createElement('button');
        element.classList.add('button', 'add-task');
        element.id = 'add-task';
        element.textContent = 'Add Task';
        taskContainer.appendChild(element);
        element.insertAdjacentHTML('afterbegin', '<i class="fa fa-plus"></i>');
    })();

    const addTaskForm = (() => {
        const element = document.createElement('form');
        element.id = 'task-form';
        taskContainer.appendChild(element);
    })();

    const taskForm = document.getElementById('task-form');

    const taskFormElements = (() => {
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'task-form-title';
        titleInput.name = 'task-form-title';
        titleInput.placeholder = 'Task Title';
        taskForm.appendChild(titleInput);

        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.id = 'task-form-description';
        descriptionInput.name = 'task-form-description';
        descriptionInput.placeholder = 'Task Description';
        taskForm.appendChild(descriptionInput);

        const datePicker = document.createElement('input');
        datePicker.type = 'date';
        datePicker.id = 'date-picker';
        datePicker.name = 'date-picker';
        taskForm.appendChild(datePicker);

        const prioritySelectorList = document.createElement('select');
        prioritySelectorList.id = 'priority-selector';
        taskForm.appendChild(prioritySelectorList);

        const priorityArray = ['Low', 'Medium', 'High'];
        for(let i = 0; i < 3; i++) {
            const option = document.createElement('option');
            option.value = priorityArray[i];
            option.text = priorityArray[i];
            prioritySelectorList.appendChild(option);
        };

        const addButton = document.createElement('button');
        addButton.id = 'add-task-button';
        addButton.type = 'submit';
        addButton.textContent = 'Add Task';
        taskForm.appendChild(addButton);

        const cancelButton = document.createElement('button');
        cancelButton.id = 'cancel-task-button';
        cancelButton.type = 'submit';
        cancelButton.textContent = 'Cancel';
        taskForm.appendChild(cancelButton);
    })();
};



/***/ }),

/***/ "./src/project-constructor.js":
/*!************************************!*\
  !*** ./src/project-constructor.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
class Project {
    constructor(title) {
        this.title = title
    };
    taskArray = [];
};

/***/ }),

/***/ "./src/task-constructor.js":
/*!*********************************!*\
  !*** ./src/task-constructor.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority
    };
}; 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _initial_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial-dom */ "./src/initial-dom.js");
/* harmony import */ var _dom_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-events */ "./src/dom-events.js");



(0,_initial_dom__WEBPACK_IMPORTED_MODULE_0__.initialDomLoad)();
(0,_dom_events__WEBPACK_IMPORTED_MODULE_1__.domEvents)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzTE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0xPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ1BBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ047O0FBRXZDLDREQUFjO0FBQ2Qsc0RBQVMsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20tZXZlbnRzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbml0aWFsLWRvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUYXNrfSBmcm9tICcuL3Rhc2stY29uc3RydWN0b3InO1xuaW1wb3J0IHtQcm9qZWN0fSBmcm9tICcuL3Byb2plY3QtY29uc3RydWN0b3InO1xuXG5jb25zdCBkb21FdmVudHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtJyk7XG4gICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvamVjdC1idXR0b24nKTtcbiAgICBjb25zdCBjYW5jZWxQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIFxuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRQcm9qZWN0KTtcbiAgICBjYW5jZWxQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVzZXRBbmRUb2dnbGUpO1xuICAgIFxuICAgIGNvbnN0IExPQ0FMX1NUT1JBR0VfUFJPSkVDVF9LRVkgPSAndG9kby5wcm9qZWN0cyc7XG4gICAgY29uc3QgTE9DQUxfU1RPUkFHRV9TRUxFQ1RFRF9QUk9KRUNUX0lEX0tFWSA9ICd0b2RvLnNlbGVjdGVkUHJvamVjdElEJ1xuXG4gICAgbGV0IHRoZVByb2plY3RzTGlzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9QUk9KRUNUX0tFWSkpIHx8IFtdO1xuICAgIGxldCBzZWxlY3RlZFByb2plY3RJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfU0VMRUNURURfUFJPSkVDVF9JRF9LRVkpIHx8IDA7XG4gICAgXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHRpdGxlVmFsdWUgPSB7XG4gICAgICAgICAgICB0aXRsZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybS10aXRsZScpLnZhbHVlLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlVmFsdWUudGl0bGUpO1xuICAgICAgICB0aGVQcm9qZWN0c0xpc3QucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKHRoZVByb2plY3RzTGlzdCk7XG4gICAgICAgIHNldFN0b3JhZ2UoKTtcbiAgICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICAgICAgYWRkUHJvamVjdEZvcm1Ub2dnbGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgYWRkTmV3UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtbmV3LXByb2plY3QnKTtcbiAgICBhZGROZXdQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkUHJvamVjdEZvcm1Ub2dnbGUpO1xuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdEZvcm1Ub2dnbGUoKSB7XG4gICAgICAgIGlmIChwcm9qZWN0Rm9ybS5zdHlsZS5kaXNwbGF5ID09PSAnZ3JpZCcpIHtcbiAgICAgICAgICAgIHByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZXNldEFuZFRvZ2dsZSgpIHtcbiAgICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICAgICAgYWRkUHJvamVjdEZvcm1Ub2dnbGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzLWxpc3QnKTtcblxuICAgIGZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0cyAodGhlUHJvamVjdHNMaXN0KSB7XG4gICAgICAgIHdoaWxlIChwcm9qZWN0c0xpc3QuZmlyc3RDaGlsZCkgeyAgXG4gICAgICAgICAgICBwcm9qZWN0c0xpc3QucmVtb3ZlQ2hpbGQocHJvamVjdHNMaXN0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhlUHJvamVjdHNMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcHJvamVjdENhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHByb2plY3RDYXJkLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtY2FyZCcpO1xuICAgICAgICAgICAgcHJvamVjdENhcmQuZGF0YXNldC5pZCA9IGk7XG4gICAgICAgICAgICBpZiAocHJvamVjdENhcmQuZGF0YXNldC5pZCA9PT0gc2VsZWN0ZWRQcm9qZWN0SWQpIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0Q2FyZC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtcHJvamVjdCcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IGAke3RoZVByb2plY3RzTGlzdFtpXS50aXRsZX1gO1xuICAgICAgICAgICAgcHJvamVjdFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGl0bGUnKTtcbiAgICAgICAgICAgIHByb2plY3RUaXRsZS5kYXRhc2V0LmlkID0gaTtcbiAgICAgICAgICAgIHByb2plY3RDYXJkLmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSk7XG5cbiAgICAgICAgICAgIGxldCByZW1vdmVQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICByZW1vdmVQcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZS1wcm9qZWN0LWJ1dHRvbicsICdmYScsICdmYS10aW1lcycsICdmYS1sZycpO1xuICAgICAgICAgICAgcmVtb3ZlUHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgICAgICAgICBpZiAocHJvamVjdENhcmQuZGF0YXNldC5pZCA9PT0gc2VsZWN0ZWRQcm9qZWN0SWQpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVQcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZS1wcm9qZWN0Jyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcHJvamVjdENhcmQuYXBwZW5kQ2hpbGQocmVtb3ZlUHJvamVjdEJ1dHRvbik7XG5cbiAgICAgICAgICAgIHJlbW92ZVByb2plY3QocHJvamVjdENhcmQsIHJlbW92ZVByb2plY3RCdXR0b24pO1xuXG4gICAgICAgICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdENhcmQpO1xuXG4gICAgICAgICAgICB0aGVQcm9qZWN0c0xpc3RbaV0uaWQgPSBpO1xuXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBjcmVhdGVEZWZhdWx0UHJvamVjdCA9ICgoKSA9PiB7XG4gICAgICAgIGlmICh0aGVQcm9qZWN0c0xpc3Quc29tZShwcm9qZWN0ID0+IHByb2plY3QudGl0bGUgPT09J0RlZmF1bHQnKSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGVmYXVsdFByb2plY3RUaXRsZSA9ICdEZWZhdWx0JztcbiAgICAgICAgICAgIGxldCBkZWZhdWx0UHJvamVjdCA9IG5ldyBQcm9qZWN0KGRlZmF1bHRQcm9qZWN0VGl0bGUpOyBcbiAgICAgICAgICAgIHRoZVByb2plY3RzTGlzdC5wdXNoKGRlZmF1bHRQcm9qZWN0KTtcbiAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0cyh0aGVQcm9qZWN0c0xpc3QpO1xuICAgICAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHRhc2tIZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1oZWFkZXInKTtcblxuICAgIHByb2plY3RzTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2JyB8fCBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwJykge1xuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0SWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSB0aGVQcm9qZWN0c0xpc3QuZmluZChwcm9qZWN0ID0+IHByb2plY3QuaWQgPT0gc2VsZWN0ZWRQcm9qZWN0SWQpO1xuICAgICAgICBsZXQgY3VycmVudFRhc2tMaXN0ID0gc2VsZWN0ZWRQcm9qZWN0LnRhc2tBcnJheTtcbiAgICAgICAgdGFza0hlYWRlci50ZXh0Q29udGVudCA9IHNlbGVjdGVkUHJvamVjdC50aXRsZTtcbiAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHModGhlUHJvamVjdHNMaXN0KTtcbiAgICAgICAgZGlzcGxheVRhc2tzKGN1cnJlbnRUYXNrTGlzdCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3RDYXJkLCByZW1vdmVQcm9qZWN0QnV0dG9uKSB7XG4gICAgICAgIHJlbW92ZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhlUHJvamVjdHNMaXN0LnNwbGljZShwcm9qZWN0Q2FyZC5kYXRhc2V0LmlkLCAxKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFByb2plY3RJZCA9PT0gcHJvamVjdENhcmQuZGF0YXNldC5pZCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdElkID0gcHJvamVjdENhcmQuZGF0YXNldC5pZCAtIDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGlzcGxheVByb2plY3RzKHRoZVByb2plY3RzTGlzdCk7XG4gICAgICAgICAgICByZXR1cm4gdGhlUHJvamVjdHNMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgIH07XG5cblxuICAgIChmdW5jdGlvbiBzZWxlY3RlZFByb2plY3RPbkxvYWQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHRoZVByb2plY3RzTGlzdC5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PSBzZWxlY3RlZFByb2plY3RJZCk7XG4gICAgICAgIGxldCBjdXJyZW50VGFza0xpc3QgPSBzZWxlY3RlZFByb2plY3QudGFza0FycmF5O1xuICAgICAgICB0YXNrSGVhZGVyLnRleHRDb250ZW50ID0gc2VsZWN0ZWRQcm9qZWN0LnRpdGxlO1xuICAgICAgICBzZXRTdG9yYWdlKCk7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cyh0aGVQcm9qZWN0c0xpc3QpO1xuICAgICAgICBkaXNwbGF5VGFza3MoY3VycmVudFRhc2tMaXN0KTtcbiAgICB9KSgpO1xuXG4gICAgKGZ1bmN0aW9uIHRvZ2dsZUhhbWJ1cmdlcigpIHtcbiAgICAgICAgY29uc3QgaGFtYnVyZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdi1pY29uJyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zZWN0aW9uLWNvbnRhaW5lcicpO1xuICAgICAgICBoYW1idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvamVjdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfSkoKTtcbiAgICBcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0nKTtcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWJ1dHRvbicpO1xuICAgIGNvbnN0IGNhbmNlbFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLXRhc2stYnV0dG9uJyk7XG5cbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkVGFzayk7XG4gICAgY2FuY2VsVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRhc2tSZXNldEFuZFRvZ2dsZSk7XG4gICAgXG4gICAgZnVuY3Rpb24gYWRkVGFzayhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gdGhlUHJvamVjdHNMaXN0LmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LmlkID09IHNlbGVjdGVkUHJvamVjdElkKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkUHJvamVjdElkID09PSBudWxsKSB7XG4gICAgICAgICAgICBhbGVydCgnUGxlYXNlIHNlbGVjdCBhIHByb2plY3QnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50VGFza0xpc3QgPSBzZWxlY3RlZFByb2plY3QudGFza0FycmF5O1xuICAgICAgICAgICAgbGV0IHRhc2tWYWx1ZXMgPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0tdGl0bGUnKS52YWx1ZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybS1kZXNjcmlwdGlvbicpLnZhbHVlLFxuICAgICAgICAgICAgICAgIGR1ZURhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlLXBpY2tlcicpLnZhbHVlLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHktc2VsZWN0b3InKS52YWx1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBuZXdUYXNrID0gbmV3IFRhc2sodGFza1ZhbHVlcy50aXRsZSwgdGFza1ZhbHVlcy5kZXNjcmlwdGlvbiwgdGFza1ZhbHVlcy5kdWVEYXRlLCB0YXNrVmFsdWVzLnByaW9yaXR5KTtcbiAgICAgICAgICAgIGN1cnJlbnRUYXNrTGlzdC5wdXNoKG5ld1Rhc2spO1xuICAgICAgICAgICAgZGlzcGxheVRhc2tzKGN1cnJlbnRUYXNrTGlzdCk7XG4gICAgICAgICAgICBzZXRTdG9yYWdlKCk7XG4gICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgYWRkVGFza0Zvcm1Ub2dnbGUoKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgYWRkTmV3VGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzaycpO1xuICAgIGFkZE5ld1Rhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRUYXNrRm9ybVRvZ2dsZSk7XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrRm9ybVRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRhc2tGb3JtLnN0eWxlLmRpc3BsYXkgPT09ICdncmlkJykge1xuICAgICAgICAgICAgdGFza0Zvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2tGb3JtLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCc7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHRhc2tSZXNldEFuZFRvZ2dsZSgpIHtcbiAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgYWRkVGFza0Zvcm1Ub2dnbGUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZGlzcGxheVRhc2tzICh0YXNrc0xpc3QpIHtcbiAgICAgICAgY29uc3QgdGFza0NhcmRzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJkcycpO1xuICAgICAgICB3aGlsZSAodGFza0NhcmRzTGlzdC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0YXNrQ2FyZHNMaXN0LnJlbW92ZUNoaWxkKHRhc2tDYXJkc0xpc3QuZmlyc3RDaGlsZCk7XG4gICAgICAgIH07XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0YXNrc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0YXNrQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGFza0NhcmQuY2xhc3NMaXN0LmFkZCgndGFzay1jYXJkJyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5kYXRhc2V0LmlkID0gaTtcblxuICAgICAgICAgICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IGAke3Rhc2tzTGlzdFtpXS50aXRsZX1gO1xuICAgICAgICAgICAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZWxlbWVudCcsICd0YXNrLXRpdGxlJyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuXG4gICAgICAgICAgICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7dGFza3NMaXN0W2ldLmRlc2NyaXB0aW9ufWA7XG4gICAgICAgICAgICB0YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndGFzay1lbGVtZW50JywgJ3Rhc2stZGVzY3JpcHRpb24nKTtcbiAgICAgICAgICAgIHRhc2tDYXJkLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG5cbiAgICAgICAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHRhc2tEYXRlLnRleHRDb250ZW50ID0gYCR7dGFza3NMaXN0W2ldLmR1ZURhdGV9YDtcbiAgICAgICAgICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZWxlbWVudCcsICd0YXNrLWRhdGUnKTtcbiAgICAgICAgICAgIHRhc2tDYXJkLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcblxuICAgICAgICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHRhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9IGBQcmlvcml0eTogJHt0YXNrc0xpc3RbaV0ucHJpb3JpdHl9YDtcbiAgICAgICAgICAgIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCd0YXNrLWVsZW1lbnQnLCAndGFzay1wcmlvcml0eScpO1xuICAgICAgICAgICAgdGFza0NhcmQuYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KTtcblxuICAgICAgICAgICAgbGV0IHJlbW92ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHJlbW92ZVRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZCgndGFzay1lbGVtZW50JywgJ3JlbW92ZS10YXNrLWJ1dHRvbicsICdmYScsICdmYS10aW1lcycsICdmYS1sZycpO1xuICAgICAgICAgICAgcmVtb3ZlVGFza0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5hcHBlbmRDaGlsZChyZW1vdmVUYXNrQnV0dG9uKTtcblxuICAgICAgICAgICAgcmVtb3ZlVGFzayh0YXNrQ2FyZCwgcmVtb3ZlVGFza0J1dHRvbik7XG5cbiAgICAgICAgICAgIHRhc2tDYXJkc0xpc3QuYXBwZW5kQ2hpbGQodGFza0NhcmQpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKHRhc2tDYXJkLCByZW1vdmVUYXNrQnV0dG9uKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHRoZVByb2plY3RzTGlzdC5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PSBzZWxlY3RlZFByb2plY3RJZCk7XG4gICAgICAgIGxldCBjdXJyZW50VGFza0xpc3QgPSBzZWxlY3RlZFByb2plY3QudGFza0FycmF5O1xuICAgICAgICByZW1vdmVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGN1cnJlbnRUYXNrTGlzdC5zcGxpY2UodGFza0NhcmQuZGF0YXNldC5pZCwgMSk7XG4gICAgICAgICAgICBkaXNwbGF5VGFza3MoY3VycmVudFRhc2tMaXN0KTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50VGFza0xpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRTdG9yYWdlKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldFN0b3JhZ2UoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfUFJPSkVDVF9LRVksIEpTT04uc3RyaW5naWZ5KHRoZVByb2plY3RzTGlzdCkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX1NFTEVDVEVEX1BST0pFQ1RfSURfS0VZLCBzZWxlY3RlZFByb2plY3RJZCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXN0b3JlUHJvamVjdHMgPSAoKCkgPT4ge1xuICAgICAgICBpZighbG9jYWxTdG9yYWdlLnRoZVByb2plY3RzTGlzdCkge1xuICAgICAgICAgICAgZGlzcGxheVByb2plY3RzKHRoZVByb2plY3RzTGlzdCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGxldCBvYmplY3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RoZVByb2plY3RzTGlzdCcpIFxuICAgICAgICAgICAgb2JqZWN0cyA9IEpTT04ucGFyc2Uob2JqZWN0cyk7XG4gICAgICAgICAgICB0aGVQcm9qZWN0c0xpc3QgPSBvYmplY3RzO1xuICAgICAgICAgICAgZGlzcGxheVByb2plY3RzKG9iamVjdHMpO1xuICAgICAgICB9XG4gICAgICB9KSgpO1xuXG4gICAgICBjb25zdCByZXN0b3JlVGFza3MgPSAoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHRoZVByb2plY3RzTGlzdC5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PSBzZWxlY3RlZFByb2plY3RJZCk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRUYXNrTGlzdCA9IHNlbGVjdGVkUHJvamVjdC50YXNrQXJyYXk7XG4gICAgICAgIGlmKCFsb2NhbFN0b3JhZ2UuY3VycmVudFRhc2tMaXN0KSB7XG4gICAgICAgICAgICBkaXNwbGF5VGFza3MoY3VycmVudFRhc2tMaXN0KTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgbGV0IG9iamVjdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFRhc2tMaXN0JykgXG4gICAgICAgICAgICBvYmplY3RzID0gSlNPTi5wYXJzZShvYmplY3RzKTtcbiAgICAgICAgICAgIGN1cnJlbnRUYXNrTGlzdCA9IG9iamVjdHM7XG4gICAgICAgICAgICBkaXNwbGF5VGFza3Mob2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG59O1xuXG5leHBvcnQge2RvbUV2ZW50c307IiwiY29uc3QgaW5pdGlhbERvbUxvYWQgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG5cbiAgICBjb25zdCBjcmVhdGVIZWFkZXIgPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdoZWFkZXInO1xuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGhlYWRlckJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKVxuICAgICAgICA7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdUb2RvIExpc3QnO1xuICAgICAgICAgICAgaGVhZGVyQmFyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9KSgpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbmF2SWNvbiA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSAnbmF2LWljb24nO1xuICAgICAgICAgICAgaGVhZGVyQmFyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9KSgpO1xuICAgIFxuICAgICAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2LWljb24nKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1lbnVJY29uID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZhJywgJ2ZhLWJhcnMnKTtcbiAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xuXG4gICAgY29uc3QgY3JlYXRlTWVudSA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWVudScpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdwcm9qZWN0LXNlY3Rpb24tY29udGFpbmVyJztcbiAgICAgICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkZXIgPSAoKCkgPT57XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1tZW51LXRpdGxlJyk7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ1Byb2plY3RzJztcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8aSBjbGFzcz1cImZhIGZhLWNpcmNsZVwiPjwvaT4nKTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdwcm9qZWN0cy1saXN0JztcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdhZGQtbmV3LXByb2plY3QnO1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdBZGQgTmV3IFByb2plY3QnO1xuICAgICAgICAgICAgbWVudS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgJzxpIGNsYXNzPVwiZmEgZmEtcGx1c1wiPjwvaT4nKTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBjb25zdCBhZGRQcm9qZWN0Rm9ybSA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdwcm9qZWN0LWZvcm0nO1xuICAgICAgICAgICAgbWVudS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWZvcm0nKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0Rm9ybUVsZW1lbnRzID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICBpbnB1dC5pZCA9ICdwcm9qZWN0LWZvcm0tdGl0bGUnO1xuICAgICAgICAgICAgaW5wdXQubmFtZSA9ICdwcm9qZWN0LWZvcm0tdGl0bGUnO1xuICAgICAgICAgICAgaW5wdXQucGxhY2Vob2xkZXIgPSAnUHJvamVjdCBUaXRsZSc7XG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgYWRkQnV0dG9uLmlkID0gJ2FkZC1wcm9qZWN0LWJ1dHRvbic7XG4gICAgICAgICAgICBhZGRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgICAgICAgICAgYWRkQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICAgICAgICAgIHByb2plY3RGb3JtLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgY2FuY2VsQnV0dG9uLmlkID0gJ2NhbmNlbC1wcm9qZWN0LWJ1dHRvbic7XG4gICAgICAgICAgICBjYW5jZWxCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgICAgICAgICAgY2FuY2VsQnV0dG9uLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChjYW5jZWxCdXR0b24pO1xuICAgICAgICB9KSgpO1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBjcmVhdGVUYXNrQ29udGFpbmVyID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpO1xuICAgICAgICBlbGVtZW50LmlkID0gJ3Rhc2stY29udGFpbmVyJztcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgdGFza0hlYWRlciA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0YXNrLWhlYWRlcicpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICd0YXNrLWhlYWRlcic7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ0N1cnJlbnQgUHJvamVjdCc7XG4gICAgICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPGkgY2xhc3M9XCJmYSBmYS1jaXJjbGVcIj48L2k+Jyk7XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IGNyZWF0ZUNhcmRzID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NhcmRzJyk7XG4gICAgICAgIGVsZW1lbnQuaWQgPSAnY2FyZHMnO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicsICdhZGQtdGFzaycpO1xuICAgICAgICBlbGVtZW50LmlkID0gJ2FkZC10YXNrJztcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdBZGQgVGFzayc7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgJzxpIGNsYXNzPVwiZmEgZmEtcGx1c1wiPjwvaT4nKTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgYWRkVGFza0Zvcm0gPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBlbGVtZW50LmlkID0gJ3Rhc2stZm9ybSc7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybScpO1xuXG4gICAgY29uc3QgdGFza0Zvcm1FbGVtZW50cyA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICB0aXRsZUlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIHRpdGxlSW5wdXQuaWQgPSAndGFzay1mb3JtLXRpdGxlJztcbiAgICAgICAgdGl0bGVJbnB1dC5uYW1lID0gJ3Rhc2stZm9ybS10aXRsZSc7XG4gICAgICAgIHRpdGxlSW5wdXQucGxhY2Vob2xkZXIgPSAnVGFzayBUaXRsZSc7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xuXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBkZXNjcmlwdGlvbklucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQuaWQgPSAndGFzay1mb3JtLWRlc2NyaXB0aW9uJztcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dC5uYW1lID0gJ3Rhc2stZm9ybS1kZXNjcmlwdGlvbic7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQucGxhY2Vob2xkZXIgPSAnVGFzayBEZXNjcmlwdGlvbic7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xuXG4gICAgICAgIGNvbnN0IGRhdGVQaWNrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBkYXRlUGlja2VyLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIGRhdGVQaWNrZXIuaWQgPSAnZGF0ZS1waWNrZXInO1xuICAgICAgICBkYXRlUGlja2VyLm5hbWUgPSAnZGF0ZS1waWNrZXInO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChkYXRlUGlja2VyKTtcblxuICAgICAgICBjb25zdCBwcmlvcml0eVNlbGVjdG9yTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBwcmlvcml0eVNlbGVjdG9yTGlzdC5pZCA9ICdwcmlvcml0eS1zZWxlY3Rvcic7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0b3JMaXN0KTtcblxuICAgICAgICBjb25zdCBwcmlvcml0eUFycmF5ID0gWydMb3cnLCAnTWVkaXVtJywgJ0hpZ2gnXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBwcmlvcml0eUFycmF5W2ldO1xuICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBwcmlvcml0eUFycmF5W2ldO1xuICAgICAgICAgICAgcHJpb3JpdHlTZWxlY3Rvckxpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYWRkQnV0dG9uLmlkID0gJ2FkZC10YXNrLWJ1dHRvbic7XG4gICAgICAgIGFkZEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgVGFzayc7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG5cbiAgICAgICAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi5pZCA9ICdjYW5jZWwtdGFzay1idXR0b24nO1xuICAgICAgICBjYW5jZWxCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgICAgICBjYW5jZWxCdXR0b24udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKTtcbiAgICB9KSgpO1xufTtcblxuZXhwb3J0IHtpbml0aWFsRG9tTG9hZH07IiwiZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgIH07XG4gICAgdGFza0FycmF5ID0gW107XG59OyIsImV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uLFxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlLFxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICB9O1xufTsgIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2luaXRpYWxEb21Mb2FkfSBmcm9tICcuL2luaXRpYWwtZG9tJztcbmltcG9ydCB7ZG9tRXZlbnRzfSBmcm9tICcuL2RvbS1ldmVudHMnO1xuXG5pbml0aWFsRG9tTG9hZCgpO1xuZG9tRXZlbnRzKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9