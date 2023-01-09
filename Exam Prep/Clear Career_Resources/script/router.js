import { page } from "./lib.js";
import { viewNav } from "./mainView.js";
import { viewCreate } from "./src/create.js";
import { viewDashboard } from "./src/dashboard.js";
import { viewDetails } from "./src/details.js";
import { viewEdit } from "./src/edit.js";
import { viewHome } from "./src/home.js";
import { viewLogin } from "./src/login.js";
import { viewLogout } from "./src/logout.js";
import { viewRegister } from "./src/register.js";

page(viewNav);
page('/index.html', '/');
page('/', viewHome);
page('/dashboard', viewDashboard);
page('/create', viewCreate);
page('/login', viewLogin);
page('/register', viewRegister);
page('/details/:id', viewDetails);
page('/edit/:id', viewEdit)
page('/logout', viewLogout);
page.start();