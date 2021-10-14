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
            // id: Date.now().toString()
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

    projectsList.addEventListener('click', e => {
        if (e.target.tagName.toLowerCase() === 'div' || e.target.tagName.toLowerCase() === 'p') {
            selectedProjectId = e.target.dataset.id;
        };
        const selectedProject = theProjectsList.find(project => project.id == selectedProjectId);
        let currentTaskList = selectedProject.taskArray;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ007O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix5REFBTztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDRCQUE0QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMseUJBQXlCO0FBQ25FO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG1EQUFJO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsbUJBQW1CO0FBQzFEO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkMseUJBQXlCO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0MscUJBQXFCO0FBQzNEO0FBQ0E7O0FBRUE7QUFDQSxvREFBb0Qsc0JBQXNCO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7Ozs7Ozs7Ozs7Ozs7OztBQ2xNQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7O0FDakxPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNMTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNQQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ042QztBQUNOOztBQUV2Qyw0REFBYztBQUNkLHNEQUFTLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLWV2ZW50cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5pdGlhbC1kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2stY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGFza30gZnJvbSAnLi90YXNrLWNvbnN0cnVjdG9yJztcbmltcG9ydCB7UHJvamVjdH0gZnJvbSAnLi9wcm9qZWN0LWNvbnN0cnVjdG9yJztcblxuY29uc3QgZG9tRXZlbnRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybScpO1xuICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QtYnV0dG9uJyk7XG4gICAgY29uc3QgY2FuY2VsUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWwtcHJvamVjdC1idXR0b24nKTtcbiAgICBcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkUHJvamVjdCk7XG4gICAgY2FuY2VsUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3RGb3JtLnJlc2V0KCkpO1xuICAgIFxuICAgIGNvbnN0IExPQ0FMX1NUT1JBR0VfUFJPSkVDVF9LRVkgPSAndG9kby5wcm9qZWN0cyc7XG4gICAgY29uc3QgTE9DQUxfU1RPUkFHRV9TRUxFQ1RFRF9QUk9KRUNUX0lEX0tFWSA9ICd0b2RvLnNlbGVjdGVkUHJvamVjdElEJ1xuXG4gICAgbGV0IHRoZVByb2plY3RzTGlzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9QUk9KRUNUX0tFWSkpIHx8IFtdO1xuICAgIGxldCBzZWxlY3RlZFByb2plY3RJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfU0VMRUNURURfUFJPSkVDVF9JRF9LRVkpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCB0aXRsZVZhbHVlID0ge1xuICAgICAgICAgICAgdGl0bGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWZvcm0tdGl0bGUnKS52YWx1ZSxcbiAgICAgICAgICAgIC8vIGlkOiBEYXRlLm5vdygpLnRvU3RyaW5nKClcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCh0aXRsZVZhbHVlLnRpdGxlKTtcbiAgICAgICAgdGhlUHJvamVjdHNMaXN0LnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cyh0aGVQcm9qZWN0c0xpc3QpO1xuICAgICAgICBzZXRTdG9yYWdlKCk7XG4gICAgICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cy1saXN0Jyk7XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5UHJvamVjdHMgKHRoZVByb2plY3RzTGlzdCkge1xuICAgICAgICB3aGlsZSAocHJvamVjdHNMaXN0LmZpcnN0Q2hpbGQpIHsgIFxuICAgICAgICAgICAgcHJvamVjdHNMaXN0LnJlbW92ZUNoaWxkKHByb2plY3RzTGlzdC5maXJzdENoaWxkKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoZVByb2plY3RzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHByb2plY3RDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBwcm9qZWN0Q2FyZC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWNhcmQnKTtcbiAgICAgICAgICAgIHByb2plY3RDYXJkLmRhdGFzZXQuaWQgPSBpO1xuICAgICAgICAgICAgaWYgKHByb2plY3RDYXJkLmRhdGFzZXQuaWQgPT09IHNlbGVjdGVkUHJvamVjdElkKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdENhcmQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlLXByb2plY3QnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBgJHt0aGVQcm9qZWN0c0xpc3RbaV0udGl0bGV9YDtcbiAgICAgICAgICAgIHByb2plY3RUaXRsZS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXRpdGxlJyk7XG4gICAgICAgICAgICBwcm9qZWN0VGl0bGUuZGF0YXNldC5pZCA9IGk7XG4gICAgICAgICAgICBwcm9qZWN0Q2FyZC5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpO1xuXG4gICAgICAgICAgICBsZXQgcmVtb3ZlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgcmVtb3ZlUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdmYScsICdmYS10aW1lcycpO1xuICAgICAgICAgICAgcmVtb3ZlUHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgICAgICAgICBwcm9qZWN0Q2FyZC5hcHBlbmRDaGlsZChyZW1vdmVQcm9qZWN0QnV0dG9uKTtcblxuICAgICAgICAgICAgcmVtb3ZlUHJvamVjdChwcm9qZWN0Q2FyZCwgcmVtb3ZlUHJvamVjdEJ1dHRvbik7XG5cbiAgICAgICAgICAgIHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0Q2FyZCk7XG5cbiAgICAgICAgICAgIHRoZVByb2plY3RzTGlzdFtpXS5pZCA9IGk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHByb2plY3RzTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2JyB8fCBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwJykge1xuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0SWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSB0aGVQcm9qZWN0c0xpc3QuZmluZChwcm9qZWN0ID0+IHByb2plY3QuaWQgPT0gc2VsZWN0ZWRQcm9qZWN0SWQpO1xuICAgICAgICBsZXQgY3VycmVudFRhc2tMaXN0ID0gc2VsZWN0ZWRQcm9qZWN0LnRhc2tBcnJheTtcbiAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHModGhlUHJvamVjdHNMaXN0KTtcbiAgICAgICAgZGlzcGxheVRhc2tzKGN1cnJlbnRUYXNrTGlzdCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3RDYXJkLCByZW1vdmVQcm9qZWN0QnV0dG9uKSB7XG4gICAgICAgIHJlbW92ZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhlUHJvamVjdHNMaXN0LnNwbGljZShwcm9qZWN0Q2FyZC5kYXRhc2V0LmlkLCAxKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFByb2plY3RJZCA9PT0gcHJvamVjdENhcmQuZGF0YXNldC5pZCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdElkID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkaXNwbGF5UHJvamVjdHModGhlUHJvamVjdHNMaXN0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGVQcm9qZWN0c0xpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRTdG9yYWdlKCk7XG4gICAgfTtcbiAgICBcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0nKTtcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWJ1dHRvbicpO1xuICAgIGNvbnN0IGNhbmNlbFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLXRhc2stYnV0dG9uJyk7XG5cbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkVGFzayk7XG4gICAgY2FuY2VsVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRhc2tGb3JtLnJlc2V0KCkpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGFkZFRhc2soZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHRoZVByb2plY3RzTGlzdC5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PSBzZWxlY3RlZFByb2plY3RJZCk7XG4gICAgICAgIGlmIChzZWxlY3RlZFByb2plY3RJZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgYWxlcnQoJ1BsZWFzZSBzZWxlY3QgYSBwcm9qZWN0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudFRhc2tMaXN0ID0gc2VsZWN0ZWRQcm9qZWN0LnRhc2tBcnJheTtcbiAgICAgICAgICAgIGxldCB0YXNrVmFsdWVzID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtLXRpdGxlJykudmFsdWUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0tZGVzY3JpcHRpb24nKS52YWx1ZSxcbiAgICAgICAgICAgICAgICBkdWVEYXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZS1waWNrZXInKS52YWx1ZSxcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5LXNlbGVjdG9yJykudmFsdWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgbmV3VGFzayA9IG5ldyBUYXNrKHRhc2tWYWx1ZXMudGl0bGUsIHRhc2tWYWx1ZXMuZGVzY3JpcHRpb24sIHRhc2tWYWx1ZXMuZHVlRGF0ZSwgdGFza1ZhbHVlcy5wcmlvcml0eSk7XG4gICAgICAgICAgICBjdXJyZW50VGFza0xpc3QucHVzaChuZXdUYXNrKTtcbiAgICAgICAgICAgIGRpc3BsYXlUYXNrcyhjdXJyZW50VGFza0xpc3QpO1xuICAgICAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgICAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZGlzcGxheVRhc2tzICh0YXNrc0xpc3QpIHtcbiAgICAgICAgY29uc3QgdGFza0NhcmRzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJkcycpO1xuICAgICAgICB3aGlsZSAodGFza0NhcmRzTGlzdC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0YXNrQ2FyZHNMaXN0LnJlbW92ZUNoaWxkKHRhc2tDYXJkc0xpc3QuZmlyc3RDaGlsZCk7XG4gICAgICAgIH07XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0YXNrc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0YXNrQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGFza0NhcmQuY2xhc3NMaXN0LmFkZCgndGFzay1jYXJkJyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5kYXRhc2V0LmlkID0gaTtcblxuICAgICAgICAgICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IGAke3Rhc2tzTGlzdFtpXS50aXRsZX1gO1xuICAgICAgICAgICAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGl0bGUnKTtcbiAgICAgICAgICAgIHRhc2tDYXJkLmFwcGVuZENoaWxkKHRhc2tUaXRsZSk7XG5cbiAgICAgICAgICAgIGxldCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt0YXNrc0xpc3RbaV0uZGVzY3JpcHRpb259YDtcbiAgICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRlc2NyaXB0aW9uJyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuXG4gICAgICAgICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICB0YXNrRGF0ZS50ZXh0Q29udGVudCA9IGAke3Rhc2tzTGlzdFtpXS5kdWVEYXRlfWA7XG4gICAgICAgICAgICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWRhdGUnKTtcbiAgICAgICAgICAgIHRhc2tDYXJkLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcblxuICAgICAgICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHRhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9IGBQcmlvcml0eTogJHt0YXNrc0xpc3RbaV0ucHJpb3JpdHl9YDtcbiAgICAgICAgICAgIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCd0YXNrLXByaW9yaXR5Jyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpO1xuXG4gICAgICAgICAgICBsZXQgcmVtb3ZlVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgcmVtb3ZlVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdmYScsICdmYS10aW1lcycpO1xuICAgICAgICAgICAgcmVtb3ZlVGFza0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5hcHBlbmRDaGlsZChyZW1vdmVUYXNrQnV0dG9uKTtcblxuICAgICAgICAgICAgcmVtb3ZlVGFzayh0YXNrQ2FyZCwgcmVtb3ZlVGFza0J1dHRvbik7XG5cbiAgICAgICAgICAgIHRhc2tDYXJkc0xpc3QuYXBwZW5kQ2hpbGQodGFza0NhcmQpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKHRhc2tDYXJkLCByZW1vdmVUYXNrQnV0dG9uKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHRoZVByb2plY3RzTGlzdC5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PSBzZWxlY3RlZFByb2plY3RJZCk7XG4gICAgICAgIGxldCBjdXJyZW50VGFza0xpc3QgPSBzZWxlY3RlZFByb2plY3QudGFza0FycmF5O1xuICAgICAgICByZW1vdmVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGN1cnJlbnRUYXNrTGlzdC5zcGxpY2UodGFza0NhcmQuZGF0YXNldC5pZCwgMSk7XG4gICAgICAgICAgICBkaXNwbGF5VGFza3MoY3VycmVudFRhc2tMaXN0KTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50VGFza0xpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRTdG9yYWdlKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldFN0b3JhZ2UoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfUFJPSkVDVF9LRVksIEpTT04uc3RyaW5naWZ5KHRoZVByb2plY3RzTGlzdCkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX1NFTEVDVEVEX1BST0pFQ1RfSURfS0VZLCBzZWxlY3RlZFByb2plY3RJZCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXN0b3JlUHJvamVjdHMgPSAoKCkgPT4ge1xuICAgICAgICBpZighbG9jYWxTdG9yYWdlLnRoZVByb2plY3RzTGlzdCkge1xuICAgICAgICAgICAgZGlzcGxheVByb2plY3RzKHRoZVByb2plY3RzTGlzdCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGxldCBvYmplY3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RoZVByb2plY3RzTGlzdCcpIFxuICAgICAgICAgICAgb2JqZWN0cyA9IEpTT04ucGFyc2Uob2JqZWN0cyk7XG4gICAgICAgICAgICB0aGVQcm9qZWN0c0xpc3QgPSBvYmplY3RzO1xuICAgICAgICAgICAgZGlzcGxheVByb2plY3RzKG9iamVjdHMpO1xuICAgICAgICB9XG4gICAgICB9KSgpO1xuXG4gICAgICBjb25zdCByZXN0b3JlVGFza3MgPSAoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHRoZVByb2plY3RzTGlzdC5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PSBzZWxlY3RlZFByb2plY3RJZCk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRUYXNrTGlzdCA9IHNlbGVjdGVkUHJvamVjdC50YXNrQXJyYXk7XG4gICAgICAgIGlmKCFsb2NhbFN0b3JhZ2UuY3VycmVudFRhc2tMaXN0KSB7XG4gICAgICAgICAgICBkaXNwbGF5VGFza3MoY3VycmVudFRhc2tMaXN0KTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgbGV0IG9iamVjdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFRhc2tMaXN0JykgXG4gICAgICAgICAgICBvYmplY3RzID0gSlNPTi5wYXJzZShvYmplY3RzKTtcbiAgICAgICAgICAgIGN1cnJlbnRUYXNrTGlzdCA9IG9iamVjdHM7XG4gICAgICAgICAgICBkaXNwbGF5VGFza3Mob2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG59O1xuXG5leHBvcnQge2RvbUV2ZW50c307IiwiY29uc3QgaW5pdGlhbERvbUxvYWQgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG5cbiAgICBjb25zdCBjcmVhdGVIZWFkZXIgPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdoZWFkZXInO1xuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGhlYWRlckJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKVxuICAgICAgICA7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdUb2RvIExpc3QnO1xuICAgICAgICAgICAgaGVhZGVyQmFyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9KSgpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbmF2SWNvbiA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSAnbmF2LWljb24nO1xuICAgICAgICAgICAgaGVhZGVyQmFyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9KSgpO1xuICAgIFxuICAgICAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2LWljb24nKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1lbnVJY29uID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZhJywgJ2ZhLWJhcnMnKTtcbiAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xuXG4gICAgY29uc3QgY3JlYXRlTWVudSA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWVudScpO1xuICAgICAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdEhlYWRlciA9ICgoKSA9PntcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LW1lbnUtdGl0bGUnKTtcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xuICAgICAgICAgICAgbWVudS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgJzxpIGNsYXNzPVwiZmFzIGZhLWNpcmNsZVwiPjwvaT4nKTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdwcm9qZWN0cy1saXN0JztcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdhZGQtbmV3LXByb2plY3QnO1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdBZGQgTmV3IFByb2plY3QnO1xuICAgICAgICAgICAgbWVudS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgJzxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+Jyk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgY29uc3QgYWRkUHJvamVjdEZvcm0gPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSAncHJvamVjdC1mb3JtJztcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtJyk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdEZvcm1FbGVtZW50cyA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICAgICAgaW5wdXQuaWQgPSAncHJvamVjdC1mb3JtLXRpdGxlJztcbiAgICAgICAgICAgIGlucHV0Lm5hbWUgPSAncHJvamVjdC1mb3JtLXRpdGxlJztcbiAgICAgICAgICAgIGlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHByb2plY3RGb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgICAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBhZGRCdXR0b24uaWQgPSAnYWRkLXByb2plY3QtYnV0dG9uJztcbiAgICAgICAgICAgIGFkZEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICAgICAgICBhZGRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIFByb2plY3QnO1xuICAgICAgICAgICAgcHJvamVjdEZvcm0uYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcblxuICAgICAgICAgICAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBjYW5jZWxCdXR0b24uaWQgPSAnY2FuY2VsLXByb2plY3QtYnV0dG9uJztcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICAgICAgICBjYW5jZWxCdXR0b24udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgICAgICAgICAgIHByb2plY3RGb3JtLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbik7XG4gICAgICAgIH0pKCk7XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IGNyZWF0ZVRhc2tDb250YWluZXIgPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Rhc2stY29udGFpbmVyJyk7XG4gICAgICAgIGVsZW1lbnQuaWQgPSAndGFzay1jb250YWluZXInO1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stY29udGFpbmVyJyk7XG5cbiAgICBjb25zdCBjcmVhdGVDYXJkcyA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjYXJkcycpO1xuICAgICAgICBlbGVtZW50LmlkID0gJ2NhcmRzJztcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdidXR0b24nLCAnYWRkLXRhc2snKTtcbiAgICAgICAgZWxlbWVudC5pZCA9ICdhZGQtdGFzayc7XG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnQWRkIFRhc2snO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPicpO1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBhZGRUYXNrRm9ybSA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgIGVsZW1lbnQuaWQgPSAndGFzay1mb3JtJztcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJyk7XG5cbiAgICBjb25zdCB0YXNrRm9ybUVsZW1lbnRzID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRpdGxlSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgdGl0bGVJbnB1dC5pZCA9ICd0YXNrLWZvcm0tdGl0bGUnO1xuICAgICAgICB0aXRsZUlucHV0Lm5hbWUgPSAndGFzay1mb3JtLXRpdGxlJztcbiAgICAgICAgdGl0bGVJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xuXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBkZXNjcmlwdGlvbklucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQuaWQgPSAndGFzay1mb3JtLWRlc2NyaXB0aW9uJztcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dC5uYW1lID0gJ3Rhc2stZm9ybS1kZXNjcmlwdGlvbic7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbklucHV0KTtcblxuICAgICAgICBjb25zdCBkYXRlUGlja2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgZGF0ZVBpY2tlci50eXBlID0gJ2RhdGUnO1xuICAgICAgICBkYXRlUGlja2VyLmlkID0gJ2RhdGUtcGlja2VyJztcbiAgICAgICAgZGF0ZVBpY2tlci5uYW1lID0gJ2RhdGUtcGlja2VyJztcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQoZGF0ZVBpY2tlcik7XG5cbiAgICAgICAgY29uc3QgcHJpb3JpdHlTZWxlY3Rvckxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICAgICAgcHJpb3JpdHlTZWxlY3Rvckxpc3QuaWQgPSAncHJpb3JpdHktc2VsZWN0b3InO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdG9yTGlzdCk7XG5cbiAgICAgICAgY29uc3QgcHJpb3JpdHlBcnJheSA9IFsnTG93JywgJ01lZGl1bScsICdIaWdoJ107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gcHJpb3JpdHlBcnJheVtpXTtcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gcHJpb3JpdHlBcnJheVtpXTtcbiAgICAgICAgICAgIHByaW9yaXR5U2VsZWN0b3JMaXN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ1dHRvbi5pZCA9ICdhZGQtdGFzay1idXR0b24nO1xuICAgICAgICBhZGRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgICAgICBhZGRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIFRhc2snO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChhZGRCdXR0b24pO1xuXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjYW5jZWxCdXR0b24uaWQgPSAnY2FuY2VsLXRhc2stYnV0dG9uJztcbiAgICAgICAgY2FuY2VsQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICAgICAgY2FuY2VsQnV0dG9uLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbik7XG4gICAgfSkoKTtcbn07XG5cbmV4cG9ydCB7aW5pdGlhbERvbUxvYWR9OyIsImV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICB9O1xuICAgIHRhc2tBcnJheSA9IFtdO1xufTsiLCJleHBvcnQgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbixcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZSxcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XG4gICAgfTtcbn07ICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtpbml0aWFsRG9tTG9hZH0gZnJvbSAnLi9pbml0aWFsLWRvbSc7XG5pbXBvcnQge2RvbUV2ZW50c30gZnJvbSAnLi9kb20tZXZlbnRzJztcblxuaW5pdGlhbERvbUxvYWQoKTtcbmRvbUV2ZW50cygpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==