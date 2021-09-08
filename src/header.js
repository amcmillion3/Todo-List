const header = () => {
    const element = document.createElement('header');
    element.id = 'header';

    return element;
};

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

const menuIcon = () => {
    const element = document.createElement('i');
    element.classList.add('fa', 'fa-bars');

    return element;
}

export {header, title, navIcon, menuIcon};