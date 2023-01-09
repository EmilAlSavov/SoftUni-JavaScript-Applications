import {page} from './lib.js';
import { viewNav } from './mainView.js';
import { viewCatalog } from './scr/catalog.js';
import { viewCreate } from './scr/create.js';
import { viewDetails } from './scr/details.js';
import { viewEdit } from './scr/edit.js';
import { viewHome } from "./scr/home.js";
import { viewLogin } from './scr/login.js';
import { viewLogout } from './scr/logout.js';
import { viewRegister } from './scr/register.js';
import { parseQuery, viewSearch } from './scr/search.js';

page(viewNav);
page(parseQuery);
page('/index.html', '/');
page('/', viewHome);
page('/catalog', viewCatalog);
page('/search', viewSearch);
page('/login', viewLogin);
page('/register', viewRegister);
page('/create', viewCreate);
page('/logout', viewLogout);
page('/details/:id', viewDetails);
page('/edit/:id', viewEdit)


page.start();