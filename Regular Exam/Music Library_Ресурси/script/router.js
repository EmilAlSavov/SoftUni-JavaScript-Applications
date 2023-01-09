import { page } from "./lib.js";
import { viewCreate } from "./src/create.js";
import { viewDashboard } from "./src/dashboard.js";
import { viewDetails } from "./src/details.js";
import { viewEdit } from "./src/edit.js";
import { viewHome } from "./src/home.js";
import { viewLogin } from "./src/login.js";
import { viewLogout } from "./src/logout.js";
import { viewNav } from "./src/navigationBar.js";
import { viewRegister } from "./src/register.js";

page(viewNav);
page('/index.html', '/');
page("/", viewHome);
page('/create', viewCreate);
page('/dashboard', viewDashboard);
page('/details/:id', viewDetails);
page('/edit/:id', viewEdit);
page('/login', viewLogin);
page('/logout', viewLogout);
page('/register', viewRegister);

page.start()