import LoginPage from "./pages/loginPage.js"
import RegisterPage from "./pages/registerPage.js";
import ProfilePage from "./pages/profilePage.js";

export const routes = [
    {
        path: "/",
        page: LoginPage
    },
    {
        path: "/login",
        page: LoginPage
    },
    {
        path: "/register",
        page: RegisterPage
    },
    {
        path: "/profile",
        page: ProfilePage
    },
];