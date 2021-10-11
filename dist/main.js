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
    
    let theProjectsList = [];
    
    function addProject(e) {
        e.preventDefault();
        let titleValue = {
            title: document.getElementById('project-form-title').value
        };
        let newProject = new _project_constructor__WEBPACK_IMPORTED_MODULE_1__.Project(titleValue.title);
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
    };
    
    const taskForm = document.getElementById('task-form');
    const addTaskButton = document.getElementById('add-task-button');
    const cancelTaskButton = document.getElementById('cancel-task-button');

    addTaskButton.addEventListener('click', addTask);
    cancelTaskButton.addEventListener('click', taskForm.reset());
    
    let inboxTaskList = [];

    function addTask(e) {
        e.preventDefault();
        let taskValues = {
            title: document.getElementById('task-form-title').value,
            description: document.getElementById('task-form-description').value,
            dueDate: document.getElementById('date-picker').value,
            priority: document.getElementById('priority-selector').value
        };
        let newTask = new _task_constructor__WEBPACK_IMPORTED_MODULE_0__.Task(taskValues.title, taskValues.description, taskValues.dueDate, taskValues.priority);
        inboxTaskList.push(newTask);
        displayTasks(inboxTaskList);
        setStorage();
        taskForm.reset();
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
        removeTaskButton.addEventListener('click', (e) => {
            inboxTaskList.splice(taskCard.dataset.id, 1);
            displayTasks(inboxTaskList);
            return inboxTaskList;
        });
        setStorage();
    };

    function setStorage() {
        localStorage.setItem(`inboxTaskList`, JSON.stringify(inboxTaskList));
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

      const restoreTasks = (() => {
        if(!localStorage.inboxTaskList) {
            displayTasks(inboxTaskList);
        }else {
            let objects = localStorage.getItem('inboxTaskList') 
            objects = JSON.parse(objects);
            inboxTaskList = objects;
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

        const inboxButton = (() => {
            const element = document.createElement('button');
            element.classList.add('button', 'active');
            element.id = 'inbox';
            element.textContent = 'Inbox';
            menu.appendChild(element);
            element.insertAdjacentHTML('afterbegin', '<i class="fas fa-inbox"></i>');
        })();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ007O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix5REFBTztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNEJBQTRCO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyx5QkFBeUI7QUFDbkU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtREFBSTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QyxtQkFBbUI7QUFDMUQ7QUFDQTs7QUFFQTtBQUNBLDZDQUE2Qyx5QkFBeUI7QUFDdEU7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQyxxQkFBcUI7QUFDM0Q7QUFDQTs7QUFFQTtBQUNBLG9EQUFvRCxzQkFBc0I7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7Ozs7Ozs7Ozs7Ozs7OztBQ2hLQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7OztBQzFMTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDUEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDTjs7QUFFdkMsNERBQWM7QUFDZCxzREFBUyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS1ldmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luaXRpYWwtZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Rhc2t9IGZyb20gJy4vdGFzay1jb25zdHJ1Y3Rvcic7XG5pbXBvcnQge1Byb2plY3R9IGZyb20gJy4vcHJvamVjdC1jb25zdHJ1Y3Rvcic7XG5cbmNvbnN0IGRvbUV2ZW50cyA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWZvcm0nKTtcbiAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGNvbnN0IGNhbmNlbFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLXByb2plY3QtYnV0dG9uJyk7XG4gICAgXG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFByb2plY3QpO1xuICAgIGNhbmNlbFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9qZWN0Rm9ybS5yZXNldCgpKTtcbiAgICBcbiAgICBsZXQgdGhlUHJvamVjdHNMaXN0ID0gW107XG4gICAgXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHRpdGxlVmFsdWUgPSB7XG4gICAgICAgICAgICB0aXRsZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybS10aXRsZScpLnZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIGxldCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QodGl0bGVWYWx1ZS50aXRsZSk7XG4gICAgICAgIHRoZVByb2plY3RzTGlzdC5wdXNoKG5ld1Byb2plY3QpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHModGhlUHJvamVjdHNMaXN0KTtcbiAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5UHJvamVjdHMgKHRoZVByb2plY3RzTGlzdCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMtbGlzdCcpO1xuICAgICAgICB3aGlsZSAocHJvamVjdHNMaXN0LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHByb2plY3RzTGlzdC5yZW1vdmVDaGlsZChwcm9qZWN0c0xpc3QuZmlyc3RDaGlsZCk7XG4gICAgICAgIH07XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGVQcm9qZWN0c0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwcm9qZWN0Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcHJvamVjdENhcmQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1jYXJkJyk7XG4gICAgICAgICAgICBwcm9qZWN0Q2FyZC5kYXRhc2V0LmlkID0gaTtcblxuICAgICAgICAgICAgbGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IGAke3RoZVByb2plY3RzTGlzdFtpXS50aXRsZX1gO1xuICAgICAgICAgICAgcHJvamVjdFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGl0bGUnKTtcbiAgICAgICAgICAgIHByb2plY3RDYXJkLmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSk7XG5cbiAgICAgICAgICAgIGxldCByZW1vdmVQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICByZW1vdmVQcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ZhJywgJ2ZhLXRpbWVzJyk7XG4gICAgICAgICAgICByZW1vdmVQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcbiAgICAgICAgICAgIHByb2plY3RDYXJkLmFwcGVuZENoaWxkKHJlbW92ZVByb2plY3RCdXR0b24pO1xuXG4gICAgICAgICAgICByZW1vdmVQcm9qZWN0KHByb2plY3RDYXJkLCByZW1vdmVQcm9qZWN0QnV0dG9uKTtcblxuICAgICAgICAgICAgcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKHByb2plY3RDYXJkKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0Q2FyZCwgcmVtb3ZlUHJvamVjdEJ1dHRvbikge1xuICAgICAgICByZW1vdmVQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIHRoZVByb2plY3RzTGlzdC5zcGxpY2UocHJvamVjdENhcmQuZGF0YXNldC5pZCwgMSk7XG4gICAgICAgICAgICBkaXNwbGF5UHJvamVjdHModGhlUHJvamVjdHNMaXN0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGVQcm9qZWN0c0xpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRTdG9yYWdlKCk7XG4gICAgfTtcbiAgICBcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0nKTtcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWJ1dHRvbicpO1xuICAgIGNvbnN0IGNhbmNlbFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLXRhc2stYnV0dG9uJyk7XG5cbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkVGFzayk7XG4gICAgY2FuY2VsVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRhc2tGb3JtLnJlc2V0KCkpO1xuICAgIFxuICAgIGxldCBpbmJveFRhc2tMaXN0ID0gW107XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgdGFza1ZhbHVlcyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtLXRpdGxlJykudmFsdWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybS1kZXNjcmlwdGlvbicpLnZhbHVlLFxuICAgICAgICAgICAgZHVlRGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGUtcGlja2VyJykudmFsdWUsXG4gICAgICAgICAgICBwcmlvcml0eTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5LXNlbGVjdG9yJykudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG5ld1Rhc2sgPSBuZXcgVGFzayh0YXNrVmFsdWVzLnRpdGxlLCB0YXNrVmFsdWVzLmRlc2NyaXB0aW9uLCB0YXNrVmFsdWVzLmR1ZURhdGUsIHRhc2tWYWx1ZXMucHJpb3JpdHkpO1xuICAgICAgICBpbmJveFRhc2tMaXN0LnB1c2gobmV3VGFzayk7XG4gICAgICAgIGRpc3BsYXlUYXNrcyhpbmJveFRhc2tMaXN0KTtcbiAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5VGFza3MgKHRhc2tzTGlzdCkge1xuICAgICAgICBjb25zdCB0YXNrQ2FyZHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcmRzJyk7XG4gICAgICAgIHdoaWxlICh0YXNrQ2FyZHNMaXN0LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRhc2tDYXJkc0xpc3QucmVtb3ZlQ2hpbGQodGFza0NhcmRzTGlzdC5maXJzdENoaWxkKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRhc2tzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRhc2tDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5jbGFzc0xpc3QuYWRkKCd0YXNrLWNhcmQnKTtcbiAgICAgICAgICAgIHRhc2tDYXJkLmRhdGFzZXQuaWQgPSBpO1xuXG4gICAgICAgICAgICBsZXQgdGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgdGFza1RpdGxlLnRleHRDb250ZW50ID0gYCR7dGFza3NMaXN0W2ldLnRpdGxlfWA7XG4gICAgICAgICAgICB0YXNrVGl0bGUuY2xhc3NMaXN0LmFkZCgndGFzay10aXRsZScpO1xuICAgICAgICAgICAgdGFza0NhcmQuYXBwZW5kQ2hpbGQodGFza1RpdGxlKTtcblxuICAgICAgICAgICAgbGV0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke3Rhc2tzTGlzdFtpXS5kZXNjcmlwdGlvbn1gO1xuICAgICAgICAgICAgdGFza0Rlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGVzY3JpcHRpb24nKTtcbiAgICAgICAgICAgIHRhc2tDYXJkLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG5cbiAgICAgICAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHRhc2tEYXRlLnRleHRDb250ZW50ID0gYCR7dGFza3NMaXN0W2ldLmR1ZURhdGV9YDtcbiAgICAgICAgICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGF0ZScpO1xuICAgICAgICAgICAgdGFza0NhcmQuYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xuXG4gICAgICAgICAgICBsZXQgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgdGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gYFByaW9yaXR5OiAke3Rhc2tzTGlzdFtpXS5wcmlvcml0eX1gO1xuICAgICAgICAgICAgdGFza1ByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3Rhc2stcHJpb3JpdHknKTtcbiAgICAgICAgICAgIHRhc2tDYXJkLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eSk7XG5cbiAgICAgICAgICAgIGxldCByZW1vdmVUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICByZW1vdmVUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ZhJywgJ2ZhLXRpbWVzJyk7XG4gICAgICAgICAgICByZW1vdmVUYXNrQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcbiAgICAgICAgICAgIHRhc2tDYXJkLmFwcGVuZENoaWxkKHJlbW92ZVRhc2tCdXR0b24pO1xuXG4gICAgICAgICAgICByZW1vdmVUYXNrKHRhc2tDYXJkLCByZW1vdmVUYXNrQnV0dG9uKTtcblxuICAgICAgICAgICAgdGFza0NhcmRzTGlzdC5hcHBlbmRDaGlsZCh0YXNrQ2FyZCk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbW92ZVRhc2sodGFza0NhcmQsIHJlbW92ZVRhc2tCdXR0b24pIHtcbiAgICAgICAgcmVtb3ZlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBpbmJveFRhc2tMaXN0LnNwbGljZSh0YXNrQ2FyZC5kYXRhc2V0LmlkLCAxKTtcbiAgICAgICAgICAgIGRpc3BsYXlUYXNrcyhpbmJveFRhc2tMaXN0KTtcbiAgICAgICAgICAgIHJldHVybiBpbmJveFRhc2tMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRTdG9yYWdlKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgaW5ib3hUYXNrTGlzdGAsIEpTT04uc3RyaW5naWZ5KGluYm94VGFza0xpc3QpKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHRoZVByb2plY3RzTGlzdGAsIEpTT04uc3RyaW5naWZ5KHRoZVByb2plY3RzTGlzdCkpO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdG9yZVByb2plY3RzID0gKCgpID0+IHtcbiAgICAgICAgaWYoIWxvY2FsU3RvcmFnZS50aGVQcm9qZWN0c0xpc3QpIHtcbiAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0cyh0aGVQcm9qZWN0c0xpc3QpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBsZXQgb2JqZWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVQcm9qZWN0c0xpc3QnKSBcbiAgICAgICAgICAgIG9iamVjdHMgPSBKU09OLnBhcnNlKG9iamVjdHMpO1xuICAgICAgICAgICAgdGhlUHJvamVjdHNMaXN0ID0gb2JqZWN0cztcbiAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0cyhvYmplY3RzKTtcbiAgICAgICAgfVxuICAgICAgfSkoKTtcblxuICAgICAgY29uc3QgcmVzdG9yZVRhc2tzID0gKCgpID0+IHtcbiAgICAgICAgaWYoIWxvY2FsU3RvcmFnZS5pbmJveFRhc2tMaXN0KSB7XG4gICAgICAgICAgICBkaXNwbGF5VGFza3MoaW5ib3hUYXNrTGlzdCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGxldCBvYmplY3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2luYm94VGFza0xpc3QnKSBcbiAgICAgICAgICAgIG9iamVjdHMgPSBKU09OLnBhcnNlKG9iamVjdHMpO1xuICAgICAgICAgICAgaW5ib3hUYXNrTGlzdCA9IG9iamVjdHM7XG4gICAgICAgICAgICBkaXNwbGF5VGFza3Mob2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG59O1xuXG5leHBvcnQge2RvbUV2ZW50c307IiwiY29uc3QgaW5pdGlhbERvbUxvYWQgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG5cbiAgICBjb25zdCBjcmVhdGVIZWFkZXIgPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdoZWFkZXInO1xuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGhlYWRlckJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKVxuICAgICAgICA7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdUb2RvIExpc3QnO1xuICAgICAgICAgICAgaGVhZGVyQmFyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9KSgpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbmF2SWNvbiA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSAnbmF2LWljb24nO1xuICAgICAgICAgICAgaGVhZGVyQmFyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9KSgpO1xuICAgIFxuICAgICAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2LWljb24nKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1lbnVJY29uID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZhJywgJ2ZhLWJhcnMnKTtcbiAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xuXG4gICAgY29uc3QgY3JlYXRlTWVudSA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWVudScpO1xuICAgICAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG5cbiAgICAgICAgY29uc3QgaW5ib3hCdXR0b24gPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdidXR0b24nLCAnYWN0aXZlJyk7XG4gICAgICAgICAgICBlbGVtZW50LmlkID0gJ2luYm94JztcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnSW5ib3gnO1xuICAgICAgICAgICAgbWVudS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgJzxpIGNsYXNzPVwiZmFzIGZhLWluYm94XCI+PC9pPicpO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkZXIgPSAoKCkgPT57XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1tZW51LXRpdGxlJyk7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ1Byb2plY3RzJztcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8aSBjbGFzcz1cImZhcyBmYS1jaXJjbGVcIj48L2k+Jyk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdHNMaXN0ID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSAncHJvamVjdHMtbGlzdCc7XG4gICAgICAgICAgICBtZW51LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSAnYWRkLW5ldy1wcm9qZWN0JztcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnQWRkIE5ldyBQcm9qZWN0JztcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPicpO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RGb3JtID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgICAgICBlbGVtZW50LmlkID0gJ3Byb2plY3QtZm9ybSc7XG4gICAgICAgICAgICBtZW51LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybScpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RGb3JtRWxlbWVudHMgPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIGlucHV0LmlkID0gJ3Byb2plY3QtZm9ybS10aXRsZSc7XG4gICAgICAgICAgICBpbnB1dC5uYW1lID0gJ3Byb2plY3QtZm9ybS10aXRsZSc7XG4gICAgICAgICAgICBpbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgYWRkQnV0dG9uLmlkID0gJ2FkZC1wcm9qZWN0LWJ1dHRvbic7XG4gICAgICAgICAgICBhZGRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgICAgICAgICAgYWRkQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICAgICAgICAgIHByb2plY3RGb3JtLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgY2FuY2VsQnV0dG9uLmlkID0gJ2NhbmNlbC1wcm9qZWN0LWJ1dHRvbic7XG4gICAgICAgICAgICBjYW5jZWxCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgICAgICAgICAgY2FuY2VsQnV0dG9uLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChjYW5jZWxCdXR0b24pO1xuICAgICAgICB9KSgpO1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBjcmVhdGVUYXNrQ29udGFpbmVyID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpO1xuICAgICAgICBlbGVtZW50LmlkID0gJ3Rhc2stY29udGFpbmVyJztcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgY3JlYXRlQ2FyZHMgPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2FyZHMnKTtcbiAgICAgICAgZWxlbWVudC5pZCA9ICdjYXJkcyc7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYnV0dG9uJywgJ2FkZC10YXNrJyk7XG4gICAgICAgIGVsZW1lbnQuaWQgPSAnYWRkLXRhc2snO1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ0FkZCBUYXNrJztcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT4nKTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgYWRkVGFza0Zvcm0gPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBlbGVtZW50LmlkID0gJ3Rhc2stZm9ybSc7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybScpO1xuXG4gICAgY29uc3QgdGFza0Zvcm1FbGVtZW50cyA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICB0aXRsZUlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIHRpdGxlSW5wdXQuaWQgPSAndGFzay1mb3JtLXRpdGxlJztcbiAgICAgICAgdGl0bGVJbnB1dC5uYW1lID0gJ3Rhc2stZm9ybS10aXRsZSc7XG4gICAgICAgIHRpdGxlSW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZCh0aXRsZUlucHV0KTtcblxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICBkZXNjcmlwdGlvbklucHV0LmlkID0gJ3Rhc2stZm9ybS1kZXNjcmlwdGlvbic7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQubmFtZSA9ICd0YXNrLWZvcm0tZGVzY3JpcHRpb24nO1xuICAgICAgICBkZXNjcmlwdGlvbklucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dCk7XG5cbiAgICAgICAgY29uc3QgZGF0ZVBpY2tlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGRhdGVQaWNrZXIudHlwZSA9ICdkYXRlJztcbiAgICAgICAgZGF0ZVBpY2tlci5pZCA9ICdkYXRlLXBpY2tlcic7XG4gICAgICAgIGRhdGVQaWNrZXIubmFtZSA9ICdkYXRlLXBpY2tlcic7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKGRhdGVQaWNrZXIpO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5U2VsZWN0b3JMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIHByaW9yaXR5U2VsZWN0b3JMaXN0LmlkID0gJ3ByaW9yaXR5LXNlbGVjdG9yJztcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQocHJpb3JpdHlTZWxlY3Rvckxpc3QpO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5QXJyYXkgPSBbJ0xvdycsICdNZWRpdW0nLCAnSGlnaCddO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IHByaW9yaXR5QXJyYXlbaV07XG4gICAgICAgICAgICBvcHRpb24udGV4dCA9IHByaW9yaXR5QXJyYXlbaV07XG4gICAgICAgICAgICBwcmlvcml0eVNlbGVjdG9yTGlzdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhZGRCdXR0b24uaWQgPSAnYWRkLXRhc2stYnV0dG9uJztcbiAgICAgICAgYWRkQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICAgICAgYWRkQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBUYXNrJztcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcblxuICAgICAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2FuY2VsQnV0dG9uLmlkID0gJ2NhbmNlbC10YXNrLWJ1dHRvbic7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi50ZXh0Q29udGVudCA9ICdDYW5jZWwnO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChjYW5jZWxCdXR0b24pO1xuICAgIH0pKCk7XG59O1xuXG5leHBvcnQge2luaXRpYWxEb21Mb2FkfTsiLCJleHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgfTtcbiAgICB0YXNrQXJyYXkgPSBbXTtcbn07IiwiZXhwb3J0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24sXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGUsXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxuICAgIH07XG59OyAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7aW5pdGlhbERvbUxvYWR9IGZyb20gJy4vaW5pdGlhbC1kb20nO1xuaW1wb3J0IHtkb21FdmVudHN9IGZyb20gJy4vZG9tLWV2ZW50cyc7XG5cbmluaXRpYWxEb21Mb2FkKCk7XG5kb21FdmVudHMoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=