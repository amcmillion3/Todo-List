const displayTitle = () => {
    const element = document.createElement('h1');
    element.id = 'display-title';
    element.textContent = 'Inbox';

    return element;
}

const displayTasks = () => {
    const element = document.createElement('div');
    element.classList.add('task-item');
}

