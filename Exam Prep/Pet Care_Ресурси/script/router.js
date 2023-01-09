import page from 'https://unpkg.com/page/page.mjs';
import { viewCreate } from './scr/create.js';
import { viewDashboard } from './scr/dashboard.js';
import { viewDelete } from './scr/delete.js';
import { viewDitails } from './scr/details.js';
import { viewEdit } from './scr/edit.js';
import { viewHome } from './scr/home.js';
import { viewLogin } from './scr/login.js';
import { onLogout } from './scr/logout.js';
import { viewRegister } from './scr/register.js';

page('/logout', onLogout, '/')
page('/index.html', '/');
page('/', viewHome);
page('/dashboard', viewDashboard);
page('/details/:id', viewDitails);
page('/edit/:id', viewEdit);
page('/delete/:id', viewDelete);
page('/login', viewLogin);
page('/register', viewRegister);
page('/create', viewCreate);

page.start();