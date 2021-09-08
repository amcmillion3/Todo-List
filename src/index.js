import {header, title, navIcon, menuIcon} from './header';
import {compareAsc, format} from 'date-fns';
import {addToTasks} from './task-constructor';

const body = document.getElementById('content');

body.appendChild(header());

const headerBar = document.getElementById('header');

headerBar.appendChild(title());
headerBar.appendChild(navIcon());

const nav = document.getElementById('nav-icon');

nav.appendChild(menuIcon());