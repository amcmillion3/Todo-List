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
        localStorage.setItem(`theProjectsList`, JSON.stringify(theProjectsList));
        localStorage.setItem(`inboxTaskList`, JSON.stringify(inboxTaskList));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ007O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix5REFBTztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNEJBQTRCO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyx5QkFBeUI7QUFDbkU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtREFBSTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QyxtQkFBbUI7QUFDMUQ7QUFDQTs7QUFFQTtBQUNBLDZDQUE2Qyx5QkFBeUI7QUFDdEU7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQyxxQkFBcUI7QUFDM0Q7QUFDQTs7QUFFQTtBQUNBLG9EQUFvRCxzQkFBc0I7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7Ozs7Ozs7Ozs7Ozs7OztBQ2hLQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7OztBQzFMTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0pPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ1BBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ047O0FBRXZDLDREQUFjO0FBQ2Qsc0RBQVMsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20tZXZlbnRzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbml0aWFsLWRvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUYXNrfSBmcm9tICcuL3Rhc2stY29uc3RydWN0b3InO1xuaW1wb3J0IHtQcm9qZWN0fSBmcm9tICcuL3Byb2plY3QtY29uc3RydWN0b3InO1xuXG5jb25zdCBkb21FdmVudHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtJyk7XG4gICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvamVjdC1idXR0b24nKTtcbiAgICBjb25zdCBjYW5jZWxQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIFxuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRQcm9qZWN0KTtcbiAgICBjYW5jZWxQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdEZvcm0ucmVzZXQoKSk7XG4gICAgXG4gICAgbGV0IHRoZVByb2plY3RzTGlzdCA9IFtdO1xuICAgIFxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCB0aXRsZVZhbHVlID0ge1xuICAgICAgICAgICAgdGl0bGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWZvcm0tdGl0bGUnKS52YWx1ZVxuICAgICAgICB9O1xuICAgICAgICBsZXQgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlVmFsdWUudGl0bGUpO1xuICAgICAgICB0aGVQcm9qZWN0c0xpc3QucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKHRoZVByb2plY3RzTGlzdCk7XG4gICAgICAgIHNldFN0b3JhZ2UoKTtcbiAgICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZGlzcGxheVByb2plY3RzICh0aGVQcm9qZWN0c0xpc3QpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzLWxpc3QnKTtcbiAgICAgICAgd2hpbGUgKHByb2plY3RzTGlzdC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBwcm9qZWN0c0xpc3QucmVtb3ZlQ2hpbGQocHJvamVjdHNMaXN0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhlUHJvamVjdHNMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcHJvamVjdENhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHByb2plY3RDYXJkLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtY2FyZCcpO1xuICAgICAgICAgICAgcHJvamVjdENhcmQuZGF0YXNldC5pZCA9IGk7XG5cbiAgICAgICAgICAgIGxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBgJHt0aGVQcm9qZWN0c0xpc3RbaV0udGl0bGV9YDtcbiAgICAgICAgICAgIHByb2plY3RUaXRsZS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXRpdGxlJyk7XG4gICAgICAgICAgICBwcm9qZWN0Q2FyZC5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpO1xuXG4gICAgICAgICAgICBsZXQgcmVtb3ZlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgcmVtb3ZlUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdmYScsICdmYS10aW1lcycpO1xuICAgICAgICAgICAgcmVtb3ZlUHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgICAgICAgICBwcm9qZWN0Q2FyZC5hcHBlbmRDaGlsZChyZW1vdmVQcm9qZWN0QnV0dG9uKTtcblxuICAgICAgICAgICAgcmVtb3ZlUHJvamVjdChwcm9qZWN0Q2FyZCwgcmVtb3ZlUHJvamVjdEJ1dHRvbik7XG5cbiAgICAgICAgICAgIHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0Q2FyZCk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbW92ZVByb2plY3QocHJvamVjdENhcmQsIHJlbW92ZVByb2plY3RCdXR0b24pIHtcbiAgICAgICAgcmVtb3ZlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGVQcm9qZWN0c0xpc3Quc3BsaWNlKHByb2plY3RDYXJkLmRhdGFzZXQuaWQsIDEpO1xuICAgICAgICAgICAgZGlzcGxheVByb2plY3RzKHRoZVByb2plY3RzTGlzdCk7XG4gICAgICAgICAgICByZXR1cm4gdGhlUHJvamVjdHNMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0U3RvcmFnZSgpO1xuICAgIH07XG4gICAgXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJyk7XG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1idXR0b24nKTtcbiAgICBjb25zdCBjYW5jZWxUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbC10YXNrLWJ1dHRvbicpO1xuXG4gICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFRhc2spO1xuICAgIGNhbmNlbFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0YXNrRm9ybS5yZXNldCgpKTtcbiAgICBcbiAgICBsZXQgaW5ib3hUYXNrTGlzdCA9IFtdO1xuXG4gICAgZnVuY3Rpb24gYWRkVGFzayhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHRhc2tWYWx1ZXMgPSB7XG4gICAgICAgICAgICB0aXRsZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybS10aXRsZScpLnZhbHVlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0tZGVzY3JpcHRpb24nKS52YWx1ZSxcbiAgICAgICAgICAgIGR1ZURhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlLXBpY2tlcicpLnZhbHVlLFxuICAgICAgICAgICAgcHJpb3JpdHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eS1zZWxlY3RvcicpLnZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIGxldCBuZXdUYXNrID0gbmV3IFRhc2sodGFza1ZhbHVlcy50aXRsZSwgdGFza1ZhbHVlcy5kZXNjcmlwdGlvbiwgdGFza1ZhbHVlcy5kdWVEYXRlLCB0YXNrVmFsdWVzLnByaW9yaXR5KTtcbiAgICAgICAgaW5ib3hUYXNrTGlzdC5wdXNoKG5ld1Rhc2spO1xuICAgICAgICBkaXNwbGF5VGFza3MoaW5ib3hUYXNrTGlzdCk7XG4gICAgICAgIHNldFN0b3JhZ2UoKTtcbiAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZGlzcGxheVRhc2tzICh0YXNrc0xpc3QpIHtcbiAgICAgICAgY29uc3QgdGFza0NhcmRzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJkcycpO1xuICAgICAgICB3aGlsZSAodGFza0NhcmRzTGlzdC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0YXNrQ2FyZHNMaXN0LnJlbW92ZUNoaWxkKHRhc2tDYXJkc0xpc3QuZmlyc3RDaGlsZCk7XG4gICAgICAgIH07XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0YXNrc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0YXNrQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGFza0NhcmQuY2xhc3NMaXN0LmFkZCgndGFzay1jYXJkJyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5kYXRhc2V0LmlkID0gaTtcblxuICAgICAgICAgICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IGAke3Rhc2tzTGlzdFtpXS50aXRsZX1gO1xuICAgICAgICAgICAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGl0bGUnKTtcbiAgICAgICAgICAgIHRhc2tDYXJkLmFwcGVuZENoaWxkKHRhc2tUaXRsZSk7XG5cbiAgICAgICAgICAgIGxldCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt0YXNrc0xpc3RbaV0uZGVzY3JpcHRpb259YDtcbiAgICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRlc2NyaXB0aW9uJyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuXG4gICAgICAgICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICB0YXNrRGF0ZS50ZXh0Q29udGVudCA9IGAke3Rhc2tzTGlzdFtpXS5kdWVEYXRlfWA7XG4gICAgICAgICAgICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWRhdGUnKTtcbiAgICAgICAgICAgIHRhc2tDYXJkLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcblxuICAgICAgICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHRhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9IGBQcmlvcml0eTogJHt0YXNrc0xpc3RbaV0ucHJpb3JpdHl9YDtcbiAgICAgICAgICAgIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCd0YXNrLXByaW9yaXR5Jyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpO1xuXG4gICAgICAgICAgICBsZXQgcmVtb3ZlVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgcmVtb3ZlVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdmYScsICdmYS10aW1lcycpO1xuICAgICAgICAgICAgcmVtb3ZlVGFza0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgICAgICAgICB0YXNrQ2FyZC5hcHBlbmRDaGlsZChyZW1vdmVUYXNrQnV0dG9uKTtcblxuICAgICAgICAgICAgcmVtb3ZlVGFzayh0YXNrQ2FyZCwgcmVtb3ZlVGFza0J1dHRvbik7XG5cbiAgICAgICAgICAgIHRhc2tDYXJkc0xpc3QuYXBwZW5kQ2hpbGQodGFza0NhcmQpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKHRhc2tDYXJkLCByZW1vdmVUYXNrQnV0dG9uKSB7XG4gICAgICAgIHJlbW92ZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaW5ib3hUYXNrTGlzdC5zcGxpY2UodGFza0NhcmQuZGF0YXNldC5pZCwgMSk7XG4gICAgICAgICAgICBkaXNwbGF5VGFza3MoaW5ib3hUYXNrTGlzdCk7XG4gICAgICAgICAgICByZXR1cm4gaW5ib3hUYXNrTGlzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFN0b3JhZ2UoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0U3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHRoZVByb2plY3RzTGlzdGAsIEpTT04uc3RyaW5naWZ5KHRoZVByb2plY3RzTGlzdCkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgaW5ib3hUYXNrTGlzdGAsIEpTT04uc3RyaW5naWZ5KGluYm94VGFza0xpc3QpKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJlc3RvcmVQcm9qZWN0cyA9ICgoKSA9PiB7XG4gICAgICAgIGlmKCFsb2NhbFN0b3JhZ2UudGhlUHJvamVjdHNMaXN0KSB7XG4gICAgICAgICAgICBkaXNwbGF5UHJvamVjdHModGhlUHJvamVjdHNMaXN0KTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgbGV0IG9iamVjdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlUHJvamVjdHNMaXN0JykgXG4gICAgICAgICAgICBvYmplY3RzID0gSlNPTi5wYXJzZShvYmplY3RzKTtcbiAgICAgICAgICAgIHRoZVByb2plY3RzTGlzdCA9IG9iamVjdHM7XG4gICAgICAgICAgICBkaXNwbGF5UHJvamVjdHMob2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG5cbiAgICAgIGNvbnN0IHJlc3RvcmVUYXNrcyA9ICgoKSA9PiB7XG4gICAgICAgIGlmKCFsb2NhbFN0b3JhZ2UuaW5ib3hUYXNrTGlzdCkge1xuICAgICAgICAgICAgZGlzcGxheVRhc2tzKGluYm94VGFza0xpc3QpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBsZXQgb2JqZWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbmJveFRhc2tMaXN0JykgXG4gICAgICAgICAgICBvYmplY3RzID0gSlNPTi5wYXJzZShvYmplY3RzKTtcbiAgICAgICAgICAgIGluYm94VGFza0xpc3QgPSBvYmplY3RzO1xuICAgICAgICAgICAgZGlzcGxheVRhc2tzKG9iamVjdHMpO1xuICAgICAgICB9XG4gICAgICB9KSgpO1xufTtcblxuZXhwb3J0IHtkb21FdmVudHN9OyIsImNvbnN0IGluaXRpYWxEb21Mb2FkID0gKCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuXG4gICAgY29uc3QgY3JlYXRlSGVhZGVyID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSAnaGVhZGVyJztcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBoZWFkZXJCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJylcbiAgICAgICAgO1xuICAgICAgICBjb25zdCB0aXRsZSA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndGl0bGUnKTtcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnVG9kbyBMaXN0JztcbiAgICAgICAgICAgIGhlYWRlckJhci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5hdkljb24gPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgICAgICAgICBlbGVtZW50LmlkID0gJ25hdi1pY29uJztcbiAgICAgICAgICAgIGhlYWRlckJhci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcbiAgICBcbiAgICAgICAgY29uc3QgbmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdi1pY29uJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtZW51SWNvbiA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmYScsICdmYS1iYXJzJyk7XG4gICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pKCk7XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJyk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcblxuICAgIGNvbnN0IGNyZWF0ZU1lbnUgPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21lbnUnKTtcbiAgICAgICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gICAgICAgIGNvbnN0IGluYm94QnV0dG9uID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYnV0dG9uJywgJ2FjdGl2ZScpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdpbmJveCc7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ0luYm94JztcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8aSBjbGFzcz1cImZhcyBmYS1pbmJveFwiPjwvaT4nKTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gKCgpID0+e1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtbWVudS10aXRsZScpO1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG4gICAgICAgICAgICBtZW51LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPGkgY2xhc3M9XCJmYXMgZmEtY2lyY2xlXCI+PC9pPicpO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RzTGlzdCA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBlbGVtZW50LmlkID0gJ3Byb2plY3RzLWxpc3QnO1xuICAgICAgICAgICAgbWVudS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBlbGVtZW50LmlkID0gJ2FkZC1uZXctcHJvamVjdCc7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ0FkZCBOZXcgUHJvamVjdCc7XG4gICAgICAgICAgICBtZW51LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT4nKTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBjb25zdCBhZGRQcm9qZWN0Rm9ybSA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdwcm9qZWN0LWZvcm0nO1xuICAgICAgICAgICAgbWVudS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWZvcm0nKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0Rm9ybUVsZW1lbnRzID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICBpbnB1dC5pZCA9ICdwcm9qZWN0LWZvcm0tdGl0bGUnO1xuICAgICAgICAgICAgaW5wdXQubmFtZSA9ICdwcm9qZWN0LWZvcm0tdGl0bGUnO1xuICAgICAgICAgICAgaW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgcHJvamVjdEZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gICAgICAgICAgICBjb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGFkZEJ1dHRvbi5pZCA9ICdhZGQtcHJvamVjdC1idXR0b24nO1xuICAgICAgICAgICAgYWRkQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICAgICAgICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChhZGRCdXR0b24pO1xuXG4gICAgICAgICAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbi5pZCA9ICdjYW5jZWwtcHJvamVjdC1idXR0b24nO1xuICAgICAgICAgICAgY2FuY2VsQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbi50ZXh0Q29udGVudCA9ICdDYW5jZWwnO1xuICAgICAgICAgICAgcHJvamVjdEZvcm0uYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKTtcbiAgICAgICAgfSkoKTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgY3JlYXRlVGFza0NvbnRhaW5lciA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndGFzay1jb250YWluZXInKTtcbiAgICAgICAgZWxlbWVudC5pZCA9ICd0YXNrLWNvbnRhaW5lcic7XG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1jb250YWluZXInKTtcblxuICAgIGNvbnN0IGNyZWF0ZUNhcmRzID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NhcmRzJyk7XG4gICAgICAgIGVsZW1lbnQuaWQgPSAnY2FyZHMnO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicsICdhZGQtdGFzaycpO1xuICAgICAgICBlbGVtZW50LmlkID0gJ2FkZC10YXNrJztcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdBZGQgVGFzayc7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgJzxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+Jyk7XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IGFkZFRhc2tGb3JtID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgZWxlbWVudC5pZCA9ICd0YXNrLWZvcm0nO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0nKTtcblxuICAgIGNvbnN0IHRhc2tGb3JtRWxlbWVudHMgPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGl0bGVJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICB0aXRsZUlucHV0LmlkID0gJ3Rhc2stZm9ybS10aXRsZSc7XG4gICAgICAgIHRpdGxlSW5wdXQubmFtZSA9ICd0YXNrLWZvcm0tdGl0bGUnO1xuICAgICAgICB0aXRsZUlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XG5cbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dC5pZCA9ICd0YXNrLWZvcm0tZGVzY3JpcHRpb24nO1xuICAgICAgICBkZXNjcmlwdGlvbklucHV0Lm5hbWUgPSAndGFzay1mb3JtLWRlc2NyaXB0aW9uJztcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xuXG4gICAgICAgIGNvbnN0IGRhdGVQaWNrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBkYXRlUGlja2VyLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIGRhdGVQaWNrZXIuaWQgPSAnZGF0ZS1waWNrZXInO1xuICAgICAgICBkYXRlUGlja2VyLm5hbWUgPSAnZGF0ZS1waWNrZXInO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChkYXRlUGlja2VyKTtcblxuICAgICAgICBjb25zdCBwcmlvcml0eVNlbGVjdG9yTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBwcmlvcml0eVNlbGVjdG9yTGlzdC5pZCA9ICdwcmlvcml0eS1zZWxlY3Rvcic7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0b3JMaXN0KTtcblxuICAgICAgICBjb25zdCBwcmlvcml0eUFycmF5ID0gWydMb3cnLCAnTWVkaXVtJywgJ0hpZ2gnXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBwcmlvcml0eUFycmF5W2ldO1xuICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBwcmlvcml0eUFycmF5W2ldO1xuICAgICAgICAgICAgcHJpb3JpdHlTZWxlY3Rvckxpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYWRkQnV0dG9uLmlkID0gJ2FkZC10YXNrLWJ1dHRvbic7XG4gICAgICAgIGFkZEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgVGFzayc7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG5cbiAgICAgICAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi5pZCA9ICdjYW5jZWwtdGFzay1idXR0b24nO1xuICAgICAgICBjYW5jZWxCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgICAgICBjYW5jZWxCdXR0b24udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKTtcbiAgICB9KSgpO1xufTtcblxuZXhwb3J0IHtpbml0aWFsRG9tTG9hZH07IiwiZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgIH07XG59OyIsImV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uLFxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlLFxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICB9O1xufTsgIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2luaXRpYWxEb21Mb2FkfSBmcm9tICcuL2luaXRpYWwtZG9tJztcbmltcG9ydCB7ZG9tRXZlbnRzfSBmcm9tICcuL2RvbS1ldmVudHMnO1xuXG5pbml0aWFsRG9tTG9hZCgpO1xuZG9tRXZlbnRzKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9