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

export {initialDomLoad};