import HomePage from "./pages/homePage.js";
import LoginPage from "./pages/loginPage.js"
import RegisterPage from "./pages/registerPage.js";
import ProfilePage from "./pages/profilePage.js";
import CategoriesPage from "./pages/categoriesPage.js";

export const routes = [
    {
        path: "/",
        page: HomePage
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
    {
        path: "/categories",
        page: CategoriesPage
    }
];