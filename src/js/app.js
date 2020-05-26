import {Router} from "./router.js";
import {routes} from "./routes.js";

firebase.auth()
    .onAuthStateChanged(() => {
            Router.init(routes);
        }
    );