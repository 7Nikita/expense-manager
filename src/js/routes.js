import HomePage from "./pages/homePage.js";
import LoginPage from "./pages/loginPage.js"
import RegisterPage from "./pages/registerPage.js";
import ProfilePage from "./pages/profilePage.js";
import CategoriesPage from "./pages/categoriesPage.js";
import TransactionsPage from "./pages/transactionsPage.js";
import CategoryStatisticPage from "./pages/categoryStatisticPage.js";
import GlobalStatisticPage from "./pages/globalStatisticPage.js"

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
    },
    {
        path: "/transactions",
        page: TransactionsPage
    },
    {
        path: "/statistics/category",
        page: CategoryStatisticPage
    },
    {
        path: "/statistics/global",
        page: GlobalStatisticPage
    }
];