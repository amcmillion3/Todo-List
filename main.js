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
        let newProject = new _project_constructor__WEBPACK_IMPORTED_MODULE_1__.Project(titleValue.title);
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
            let newTask = new _task_constructor__WEBPACK_IMPORTED_MODULE_0__.Task(taskValues.title, taskValues.description, taskValues.dueDate, taskValues.priority);
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
            main.appendChild(element);
        })();
        const menu = document.querySelector('.menu');

        const projectHeader = (() =>{
            const element = document.createElement('h3');
            element.classList.add('project-menu-title');
            element.textContent = 'Projects';
            menu.appendChild(element);
            element.insertAdjacentHTML('afterbegin', '<i class="fas fa-circle"></i>');
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
            element.insertAdjacentHTML('afterbegin', '<i class="fas fa-plus"></i>');
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
            input.required = true;
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
        const element = document.createElement('h3');
            element.classList.add('task-header');
            element.id = 'task-header';
            element.textContent = 'Current Project';
            taskContainer.appendChild(element);
            element.insertAdjacentHTML('afterbegin', '<i class="fas fa-circle"></i>');
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
        element.insertAdjacentHTML('afterbegin', '<i class="fas fa-plus"></i>');
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
        titleInput.required = true;
        taskForm.appendChild(titleInput);

        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.id = 'task-form-description';
        descriptionInput.name = 'task-form-description';
        descriptionInput.required = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ007O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIseURBQU87QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw0QkFBNEI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLHlCQUF5QjtBQUNuRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG1EQUFJO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsbUJBQW1CO0FBQzFEO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkMseUJBQXlCO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0MscUJBQXFCO0FBQzNEO0FBQ0E7O0FBRUE7QUFDQSxvREFBb0Qsc0JBQXNCO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7Ozs7Ozs7Ozs7Ozs7OztBQ3BNQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7OztBQzFMTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDUEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDTjs7QUFFdkMsNERBQWM7QUFDZCxzREFBUyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS1ldmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luaXRpYWwtZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Rhc2t9IGZyb20gJy4vdGFzay1jb25zdHJ1Y3Rvcic7XG5pbXBvcnQge1Byb2plY3R9IGZyb20gJy4vcHJvamVjdC1jb25zdHJ1Y3Rvcic7XG5cbmNvbnN0IGRvbUV2ZW50cyA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWZvcm0nKTtcbiAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGNvbnN0IGNhbmNlbFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLXByb2plY3QtYnV0dG9uJyk7XG4gICAgXG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFByb2plY3QpO1xuICAgIGNhbmNlbFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9qZWN0Rm9ybS5yZXNldCgpKTtcbiAgICBcbiAgICBjb25zdCBMT0NBTF9TVE9SQUdFX1BST0pFQ1RfS0VZID0gJ3RvZG8ucHJvamVjdHMnO1xuICAgIGNvbnN0IExPQ0FMX1NUT1JBR0VfU0VMRUNURURfUFJPSkVDVF9JRF9LRVkgPSAndG9kby5zZWxlY3RlZFByb2plY3RJRCdcblxuICAgIGxldCB0aGVQcm9qZWN0c0xpc3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfUFJPSkVDVF9LRVkpKSB8fCBbXTtcbiAgICBsZXQgc2VsZWN0ZWRQcm9qZWN0SWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX1NFTEVDVEVEX1BST0pFQ1RfSURfS0VZKTtcbiAgICBcbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgdGl0bGVWYWx1ZSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtLXRpdGxlJykudmFsdWUsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QodGl0bGVWYWx1ZS50aXRsZSk7XG4gICAgICAgIHRoZVByb2plY3RzTGlzdC5wdXNoKG5ld1Byb2plY3QpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHModGhlUHJvamVjdHNMaXN0KTtcbiAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgIH07XG5cbiAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMtbGlzdCcpO1xuXG4gICAgZnVuY3Rpb24gZGlzcGxheVByb2plY3RzICh0aGVQcm9qZWN0c0xpc3QpIHtcbiAgICAgICAgd2hpbGUgKHByb2plY3RzTGlzdC5maXJzdENoaWxkKSB7ICBcbiAgICAgICAgICAgIHByb2plY3RzTGlzdC5yZW1vdmVDaGlsZChwcm9qZWN0c0xpc3QuZmlyc3RDaGlsZCk7XG4gICAgICAgIH07XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGVQcm9qZWN0c0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwcm9qZWN0Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcHJvamVjdENhcmQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1jYXJkJyk7XG4gICAgICAgICAgICBwcm9qZWN0Q2FyZC5kYXRhc2V0LmlkID0gaTtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0Q2FyZC5kYXRhc2V0LmlkID09PSBzZWxlY3RlZFByb2plY3RJZCkge1xuICAgICAgICAgICAgICAgIHByb2plY3RDYXJkLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZS1wcm9qZWN0Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gYCR7dGhlUHJvamVjdHNMaXN0W2ldLnRpdGxlfWA7XG4gICAgICAgICAgICBwcm9qZWN0VGl0bGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10aXRsZScpO1xuICAgICAgICAgICAgcHJvamVjdFRpdGxlLmRhdGFzZXQuaWQgPSBpO1xuICAgICAgICAgICAgcHJvamVjdENhcmQuYXBwZW5kQ2hpbGQocHJvamVjdFRpdGxlKTtcblxuICAgICAgICAgICAgbGV0IHJlbW92ZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHJlbW92ZVByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmEnLCAnZmEtdGltZXMnKTtcbiAgICAgICAgICAgIHJlbW92ZVByb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgICAgICAgICAgcHJvamVjdENhcmQuYXBwZW5kQ2hpbGQocmVtb3ZlUHJvamVjdEJ1dHRvbik7XG5cbiAgICAgICAgICAgIHJlbW92ZVByb2plY3QocHJvamVjdENhcmQsIHJlbW92ZVByb2plY3RCdXR0b24pO1xuXG4gICAgICAgICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdENhcmQpO1xuXG4gICAgICAgICAgICB0aGVQcm9qZWN0c0xpc3RbaV0uaWQgPSBpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCB0YXNrSGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2staGVhZGVyJyk7XG5cbiAgICBwcm9qZWN0c0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2RpdicgfHwgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncCcpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdElkID0gZS50YXJnZXQuZGF0YXNldC5pZDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gdGhlUHJvamVjdHNMaXN0LmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LmlkID09IHNlbGVjdGVkUHJvamVjdElkKTtcbiAgICAgICAgbGV0IGN1cnJlbnRUYXNrTGlzdCA9IHNlbGVjdGVkUHJvamVjdC50YXNrQXJyYXk7XG4gICAgICAgIHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSBzZWxlY3RlZFByb2plY3QudGl0bGU7XG4gICAgICAgIHNldFN0b3JhZ2UoKTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKHRoZVByb2plY3RzTGlzdCk7XG4gICAgICAgIGRpc3BsYXlUYXNrcyhjdXJyZW50VGFza0xpc3QpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0Q2FyZCwgcmVtb3ZlUHJvamVjdEJ1dHRvbikge1xuICAgICAgICByZW1vdmVQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIHRoZVByb2plY3RzTGlzdC5zcGxpY2UocHJvamVjdENhcmQuZGF0YXNldC5pZCwgMSk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRQcm9qZWN0SWQgPT09IHByb2plY3RDYXJkLmRhdGFzZXQuaWQpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFByb2plY3RJZCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGlzcGxheVByb2plY3RzKHRoZVByb2plY3RzTGlzdCk7XG4gICAgICAgICAgICByZXR1cm4gdGhlUHJvamVjdHNMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgIH07XG4gICAgXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJyk7XG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1idXR0b24nKTtcbiAgICBjb25zdCBjYW5jZWxUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbC10YXNrLWJ1dHRvbicpO1xuXG4gICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFRhc2spO1xuICAgIGNhbmNlbFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0YXNrRm9ybS5yZXNldCgpKTtcbiAgICBcbiAgICBmdW5jdGlvbiBhZGRUYXNrKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSB0aGVQcm9qZWN0c0xpc3QuZmluZChwcm9qZWN0ID0+IHByb2plY3QuaWQgPT0gc2VsZWN0ZWRQcm9qZWN0SWQpO1xuICAgICAgICBpZiAoc2VsZWN0ZWRQcm9qZWN0SWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2Ugc2VsZWN0IGEgcHJvamVjdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRUYXNrTGlzdCA9IHNlbGVjdGVkUHJvamVjdC50YXNrQXJyYXk7XG4gICAgICAgICAgICBsZXQgdGFza1ZhbHVlcyA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybS10aXRsZScpLnZhbHVlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtLWRlc2NyaXB0aW9uJykudmFsdWUsXG4gICAgICAgICAgICAgICAgZHVlRGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGUtcGlja2VyJykudmFsdWUsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eS1zZWxlY3RvcicpLnZhbHVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IG5ld1Rhc2sgPSBuZXcgVGFzayh0YXNrVmFsdWVzLnRpdGxlLCB0YXNrVmFsdWVzLmRlc2NyaXB0aW9uLCB0YXNrVmFsdWVzLmR1ZURhdGUsIHRhc2tWYWx1ZXMucHJpb3JpdHkpO1xuICAgICAgICAgICAgY3VycmVudFRhc2tMaXN0LnB1c2gobmV3VGFzayk7XG4gICAgICAgICAgICBkaXNwbGF5VGFza3MoY3VycmVudFRhc2tMaXN0KTtcbiAgICAgICAgICAgIHNldFN0b3JhZ2UoKTtcbiAgICAgICAgICAgIHRhc2tGb3JtLnJlc2V0KCk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGRpc3BsYXlUYXNrcyAodGFza3NMaXN0KSB7XG4gICAgICAgIGNvbnN0IHRhc2tDYXJkc0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FyZHMnKTtcbiAgICAgICAgd2hpbGUgKHRhc2tDYXJkc0xpc3QuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGFza0NhcmRzTGlzdC5yZW1vdmVDaGlsZCh0YXNrQ2FyZHNMaXN0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGFza3NMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGFza0NhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRhc2tDYXJkLmNsYXNzTGlzdC5hZGQoJ3Rhc2stY2FyZCcpO1xuICAgICAgICAgICAgdGFza0NhcmQuZGF0YXNldC5pZCA9IGk7XG5cbiAgICAgICAgICAgIGxldCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBgJHt0YXNrc0xpc3RbaV0udGl0bGV9YDtcbiAgICAgICAgICAgIHRhc2tUaXRsZS5jbGFzc0xpc3QuYWRkKCd0YXNrLXRpdGxlJyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuXG4gICAgICAgICAgICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7dGFza3NMaXN0W2ldLmRlc2NyaXB0aW9ufWA7XG4gICAgICAgICAgICB0YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndGFzay1kZXNjcmlwdGlvbicpO1xuICAgICAgICAgICAgdGFza0NhcmQuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcblxuICAgICAgICAgICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgdGFza0RhdGUudGV4dENvbnRlbnQgPSBgJHt0YXNrc0xpc3RbaV0uZHVlRGF0ZX1gO1xuICAgICAgICAgICAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZCgndGFzay1kYXRlJyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG5cbiAgICAgICAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICB0YXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSBgUHJpb3JpdHk6ICR7dGFza3NMaXN0W2ldLnByaW9yaXR5fWA7XG4gICAgICAgICAgICB0YXNrUHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgndGFzay1wcmlvcml0eScpO1xuICAgICAgICAgICAgdGFza0NhcmQuYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KTtcblxuICAgICAgICAgICAgbGV0IHJlbW92ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHJlbW92ZVRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmEnLCAnZmEtdGltZXMnKTtcbiAgICAgICAgICAgIHJlbW92ZVRhc2tCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgICAgICAgICAgdGFza0NhcmQuYXBwZW5kQ2hpbGQocmVtb3ZlVGFza0J1dHRvbik7XG5cbiAgICAgICAgICAgIHJlbW92ZVRhc2sodGFza0NhcmQsIHJlbW92ZVRhc2tCdXR0b24pO1xuXG4gICAgICAgICAgICB0YXNrQ2FyZHNMaXN0LmFwcGVuZENoaWxkKHRhc2tDYXJkKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlVGFzayh0YXNrQ2FyZCwgcmVtb3ZlVGFza0J1dHRvbikge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSB0aGVQcm9qZWN0c0xpc3QuZmluZChwcm9qZWN0ID0+IHByb2plY3QuaWQgPT0gc2VsZWN0ZWRQcm9qZWN0SWQpO1xuICAgICAgICBsZXQgY3VycmVudFRhc2tMaXN0ID0gc2VsZWN0ZWRQcm9qZWN0LnRhc2tBcnJheTtcbiAgICAgICAgcmVtb3ZlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjdXJyZW50VGFza0xpc3Quc3BsaWNlKHRhc2tDYXJkLmRhdGFzZXQuaWQsIDEpO1xuICAgICAgICAgICAgZGlzcGxheVRhc2tzKGN1cnJlbnRUYXNrTGlzdCk7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFRhc2tMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRTdG9yYWdlKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX1BST0pFQ1RfS0VZLCBKU09OLnN0cmluZ2lmeSh0aGVQcm9qZWN0c0xpc3QpKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9TRUxFQ1RFRF9QUk9KRUNUX0lEX0tFWSwgc2VsZWN0ZWRQcm9qZWN0SWQpO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdG9yZVByb2plY3RzID0gKCgpID0+IHtcbiAgICAgICAgaWYoIWxvY2FsU3RvcmFnZS50aGVQcm9qZWN0c0xpc3QpIHtcbiAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0cyh0aGVQcm9qZWN0c0xpc3QpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBsZXQgb2JqZWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVQcm9qZWN0c0xpc3QnKSBcbiAgICAgICAgICAgIG9iamVjdHMgPSBKU09OLnBhcnNlKG9iamVjdHMpO1xuICAgICAgICAgICAgdGhlUHJvamVjdHNMaXN0ID0gb2JqZWN0cztcbiAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0cyhvYmplY3RzKTtcbiAgICAgICAgfVxuICAgICAgfSkoKTtcblxuICAgICAgY29uc3QgcmVzdG9yZVRhc2tzID0gKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSB0aGVQcm9qZWN0c0xpc3QuZmluZChwcm9qZWN0ID0+IHByb2plY3QuaWQgPT0gc2VsZWN0ZWRQcm9qZWN0SWQpO1xuICAgICAgICAgIGxldCBjdXJyZW50VGFza0xpc3QgPSBzZWxlY3RlZFByb2plY3QudGFza0FycmF5O1xuICAgICAgICBpZighbG9jYWxTdG9yYWdlLmN1cnJlbnRUYXNrTGlzdCkge1xuICAgICAgICAgICAgZGlzcGxheVRhc2tzKGN1cnJlbnRUYXNrTGlzdCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGxldCBvYmplY3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRUYXNrTGlzdCcpIFxuICAgICAgICAgICAgb2JqZWN0cyA9IEpTT04ucGFyc2Uob2JqZWN0cyk7XG4gICAgICAgICAgICBjdXJyZW50VGFza0xpc3QgPSBvYmplY3RzO1xuICAgICAgICAgICAgZGlzcGxheVRhc2tzKG9iamVjdHMpO1xuICAgICAgICB9XG4gICAgICB9KSgpO1xufTtcblxuZXhwb3J0IHtkb21FdmVudHN9OyIsImNvbnN0IGluaXRpYWxEb21Mb2FkID0gKCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuXG4gICAgY29uc3QgY3JlYXRlSGVhZGVyID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSAnaGVhZGVyJztcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBoZWFkZXJCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJylcbiAgICAgICAgO1xuICAgICAgICBjb25zdCB0aXRsZSA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndGl0bGUnKTtcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnVG9kbyBMaXN0JztcbiAgICAgICAgICAgIGhlYWRlckJhci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5hdkljb24gPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgICAgICAgICBlbGVtZW50LmlkID0gJ25hdi1pY29uJztcbiAgICAgICAgICAgIGhlYWRlckJhci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICBcbiAgICAgICAgY29uc3QgbmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdi1pY29uJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtZW51SWNvbiA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmYScsICdmYS1iYXJzJyk7XG4gICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pKCk7XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJyk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcblxuICAgIGNvbnN0IGNyZWF0ZU1lbnUgPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21lbnUnKTtcbiAgICAgICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkZXIgPSAoKCkgPT57XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1tZW51LXRpdGxlJyk7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ1Byb2plY3RzJztcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8aSBjbGFzcz1cImZhcyBmYS1jaXJjbGVcIj48L2k+Jyk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdHNMaXN0ID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSAncHJvamVjdHMtbGlzdCc7XG4gICAgICAgICAgICBtZW51LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSAnYWRkLW5ldy1wcm9qZWN0JztcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnQWRkIE5ldyBQcm9qZWN0JztcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPicpO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RGb3JtID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgICAgICBlbGVtZW50LmlkID0gJ3Byb2plY3QtZm9ybSc7XG4gICAgICAgICAgICBtZW51LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybScpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RGb3JtRWxlbWVudHMgPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIGlucHV0LmlkID0gJ3Byb2plY3QtZm9ybS10aXRsZSc7XG4gICAgICAgICAgICBpbnB1dC5uYW1lID0gJ3Byb2plY3QtZm9ybS10aXRsZSc7XG4gICAgICAgICAgICBpbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgYWRkQnV0dG9uLmlkID0gJ2FkZC1wcm9qZWN0LWJ1dHRvbic7XG4gICAgICAgICAgICBhZGRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgICAgICAgICAgYWRkQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICAgICAgICAgIHByb2plY3RGb3JtLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgY2FuY2VsQnV0dG9uLmlkID0gJ2NhbmNlbC1wcm9qZWN0LWJ1dHRvbic7XG4gICAgICAgICAgICBjYW5jZWxCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgICAgICAgICAgY2FuY2VsQnV0dG9uLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChjYW5jZWxCdXR0b24pO1xuICAgICAgICB9KSgpO1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBjcmVhdGVUYXNrQ29udGFpbmVyID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpO1xuICAgICAgICBlbGVtZW50LmlkID0gJ3Rhc2stY29udGFpbmVyJztcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgdGFza0hlYWRlciA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0YXNrLWhlYWRlcicpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICd0YXNrLWhlYWRlcic7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ0N1cnJlbnQgUHJvamVjdCc7XG4gICAgICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPGkgY2xhc3M9XCJmYXMgZmEtY2lyY2xlXCI+PC9pPicpO1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBjcmVhdGVDYXJkcyA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjYXJkcycpO1xuICAgICAgICBlbGVtZW50LmlkID0gJ2NhcmRzJztcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdidXR0b24nLCAnYWRkLXRhc2snKTtcbiAgICAgICAgZWxlbWVudC5pZCA9ICdhZGQtdGFzayc7XG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnQWRkIFRhc2snO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPicpO1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBhZGRUYXNrRm9ybSA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgIGVsZW1lbnQuaWQgPSAndGFzay1mb3JtJztcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJyk7XG5cbiAgICBjb25zdCB0YXNrRm9ybUVsZW1lbnRzID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRpdGxlSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgdGl0bGVJbnB1dC5pZCA9ICd0YXNrLWZvcm0tdGl0bGUnO1xuICAgICAgICB0aXRsZUlucHV0Lm5hbWUgPSAndGFzay1mb3JtLXRpdGxlJztcbiAgICAgICAgdGl0bGVJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xuXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBkZXNjcmlwdGlvbklucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQuaWQgPSAndGFzay1mb3JtLWRlc2NyaXB0aW9uJztcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dC5uYW1lID0gJ3Rhc2stZm9ybS1kZXNjcmlwdGlvbic7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbklucHV0KTtcblxuICAgICAgICBjb25zdCBkYXRlUGlja2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgZGF0ZVBpY2tlci50eXBlID0gJ2RhdGUnO1xuICAgICAgICBkYXRlUGlja2VyLmlkID0gJ2RhdGUtcGlja2VyJztcbiAgICAgICAgZGF0ZVBpY2tlci5uYW1lID0gJ2RhdGUtcGlja2VyJztcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQoZGF0ZVBpY2tlcik7XG5cbiAgICAgICAgY29uc3QgcHJpb3JpdHlTZWxlY3Rvckxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICAgICAgcHJpb3JpdHlTZWxlY3Rvckxpc3QuaWQgPSAncHJpb3JpdHktc2VsZWN0b3InO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdG9yTGlzdCk7XG5cbiAgICAgICAgY29uc3QgcHJpb3JpdHlBcnJheSA9IFsnTG93JywgJ01lZGl1bScsICdIaWdoJ107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gcHJpb3JpdHlBcnJheVtpXTtcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gcHJpb3JpdHlBcnJheVtpXTtcbiAgICAgICAgICAgIHByaW9yaXR5U2VsZWN0b3JMaXN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ1dHRvbi5pZCA9ICdhZGQtdGFzay1idXR0b24nO1xuICAgICAgICBhZGRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgICAgICBhZGRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIFRhc2snO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChhZGRCdXR0b24pO1xuXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjYW5jZWxCdXR0b24uaWQgPSAnY2FuY2VsLXRhc2stYnV0dG9uJztcbiAgICAgICAgY2FuY2VsQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICAgICAgY2FuY2VsQnV0dG9uLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbik7XG4gICAgfSkoKTtcbn07XG5cbmV4cG9ydCB7aW5pdGlhbERvbUxvYWR9OyIsImV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICB9O1xuICAgIHRhc2tBcnJheSA9IFtdO1xufTsiLCJleHBvcnQgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbixcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZSxcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XG4gICAgfTtcbn07ICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtpbml0aWFsRG9tTG9hZH0gZnJvbSAnLi9pbml0aWFsLWRvbSc7XG5pbXBvcnQge2RvbUV2ZW50c30gZnJvbSAnLi9kb20tZXZlbnRzJztcblxuaW5pdGlhbERvbUxvYWQoKTtcbmRvbUV2ZW50cygpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==