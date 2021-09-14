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

export {initialDomLoad};