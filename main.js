/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
            return element;
        })();

        body.appendChild(header);
        
        const title = () => {
            const element = document.createElement('h1');
            element.classList.add('title');
            element.textContent = 'Todo List';
            return element;
        };
        
        const navIcon = () => {
            const element = document.createElement('nav');
            element.classList.add('icon');
            element.id = 'nav-icon';
            return element;
        };
    
        const headerBar = document.getElementById('header');
        headerBar.appendChild(title());
        headerBar.appendChild(navIcon());
        
        const menuIcon = () => {
            const element = document.createElement('i');
            element.classList.add('fa', 'fa-bars');
            return element;
        }
    
        const nav = document.getElementById('nav-icon');
        nav.appendChild(menuIcon());
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

        const todayButton = (() => {
            const element = document.createElement('button');
            element.classList.add('button');
            element.id = 'today';
            element.textContent = 'Today';
            menu.appendChild(element);
            element.insertAdjacentHTML('afterbegin', '<i class="fas fa-calendar-day"></i>');
        })();

        const thisWeekButton = (() => {
            const element = document.createElement('button');
            element.classList.add('button');
            element.id = 'week';
            element.textContent = 'This Week';
            menu.appendChild(element);
            element.insertAdjacentHTML('afterbegin', '<i class="fas fa-calendar-week"></i>');
        })();
    })();
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



(0,_initial_dom__WEBPACK_IMPORTED_MODULE_0__.initialDomLoad)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7Ozs7VUM5RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ042QztBQUNEOztBQUU1Qyw0REFBYyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luaXRpYWwtZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbml0aWFsRG9tTG9hZCA9ICgpID0+IHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKTtcblxuICAgIGNvbnN0IGNyZWF0ZUhlYWRlciA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgICAgICAgICBlbGVtZW50LmlkID0gJ2hlYWRlcic7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0aXRsZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdUb2RvIExpc3QnO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuYXZJY29uID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgICAgICAgICBlbGVtZW50LmlkID0gJ25hdi1pY29uJztcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICBjb25zdCBoZWFkZXJCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJyk7XG4gICAgICAgIGhlYWRlckJhci5hcHBlbmRDaGlsZCh0aXRsZSgpKTtcbiAgICAgICAgaGVhZGVyQmFyLmFwcGVuZENoaWxkKG5hdkljb24oKSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtZW51SWNvbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZhJywgJ2ZhLWJhcnMnKTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXYtaWNvbicpO1xuICAgICAgICBuYXYuYXBwZW5kQ2hpbGQobWVudUljb24oKSk7XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJyk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcblxuICAgIGNvbnN0IGNyZWF0ZU1lbnUgPSAoKCkgPT4ge1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21lbnUnKTtcbiAgICAgICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gICAgICAgIGNvbnN0IGluYm94QnV0dG9uID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYnV0dG9uJywgJ2FjdGl2ZScpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICdpbmJveCc7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ0luYm94JztcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8aSBjbGFzcz1cImZhcyBmYS1pbmJveFwiPjwvaT4nKTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBjb25zdCB0b2RheUJ1dHRvbiA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZWxlbWVudC5pZCA9ICd0b2RheSc7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8aSBjbGFzcz1cImZhcyBmYS1jYWxlbmRhci1kYXlcIj48L2k+Jyk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgY29uc3QgdGhpc1dlZWtCdXR0b24gPSAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSAnd2Vlayc7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ1RoaXMgV2Vlayc7XG4gICAgICAgICAgICBtZW51LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPGkgY2xhc3M9XCJmYXMgZmEtY2FsZW5kYXItd2Vla1wiPjwvaT4nKTtcbiAgICAgICAgfSkoKTtcbiAgICB9KSgpO1xufTtcblxuZXhwb3J0IHtpbml0aWFsRG9tTG9hZH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2luaXRpYWxEb21Mb2FkfSBmcm9tICcuL2luaXRpYWwtZG9tJztcbmltcG9ydCB7Y29tcGFyZUFzYywgZm9ybWF0fSBmcm9tICdkYXRlLWZucyc7XG5cbmluaXRpYWxEb21Mb2FkKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9