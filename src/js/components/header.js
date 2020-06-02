import {Router} from "../router.js";
import {linkNavigationHelper} from "../helpers/linkNavigationHelper.js";

let header = {
    render: async () => {
        let user = firebase.auth().currentUser;
        let username = localStorage.getItem("username");
        let headerView;
        if (user) {
            headerView = `
                <div class="menu__actions">
                   <nav class="menu">
                        <ul class="menu__list">
                            <li class="menu__item"><a class="menu__item_link" href="/transactions" id="header-transactions">Transactions</a></li>
                            <li class="menu__item"><a class="menu__item_link" href="/categories" id="header-categories">Categories</a></li>
                            <li class="menu__item" ><a class="menu__item_link" href="/statistics/category" id="header-statistics">Statistics</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="user-block">
                    <img src="/images/user.png" class="user-block__img"/>
                    <div class="user-block__title" id="header-username">${user ? user.displayName : username}</div>
                    <button class="button_logout" id="header-logout">Log out</button>
                </div>
            `
        } else {
            headerView = `
                <div class="user-block">
                    <nav class="menu">
                        <ul class="menu__list">
                            <li class="menu__item"><a class="menu__item_link" href="/login" id="header-login">Log In</a></li>
                            <li class="menu__item"><a class="menu__item_link" href="/register" id="header-signup">Sign Up</a></li>
                        </ul>
                    </nav>
                </div>   
            `
        }
        let view =  /*html*/`
            <header class="header header-space">
                <div class="logo">
                    <img class="logo__img" src="/images/credit-card.png" width="40px" height="40px"/>
                    <div class="logo__title">$pender</div>
                </div>
                ${headerView}
            </header>
        `
        return view;
    },
    after_render: async () => {
        let user = firebase.auth().currentUser;
        if (user) {
            const transactionButton = document.getElementById("header-transactions");
            transactionButton.onclick = linkNavigationHelper;

            const categoriesButton = document.getElementById("header-categories");
            categoriesButton.onclick = linkNavigationHelper;
            const statisticsButton = document.getElementById("header-statistics");
            statisticsButton.onclick = linkNavigationHelper;

            const logoutButton = document.getElementById("header-logout");
            logoutButton.onclick = (event) => {
                firebase.auth().signOut();
                linkNavigationHelper(event);
            };

            const usernameButton = document.getElementById("header-username");
            usernameButton.onclick = linkNavigationHelper;

        } else {
            const loginButton = document.getElementById("header-login");
            const registerButton = document.getElementById("header-signup");

            loginButton.onclick = linkNavigationHelper;

            registerButton.onclick = linkNavigationHelper;
        }

    }
}
export default header;