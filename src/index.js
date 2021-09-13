import {header, title, navIcon, menuIcon} from './initial-dom';
import {compareAsc, format} from 'date-fns';

const body = document.getElementById('content');

body.appendChild(header());

const headerBar = document.getElementById('header');

headerBar.appendChild(title());
headerBar.appendChild(navIcon());

const nav = document.getElementById('nav-icon');

nav.appendChild(menuIcon());