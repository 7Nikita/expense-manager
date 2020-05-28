import {Router} from "../router.js";

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
                            <li class="menu__item" id="header-transactions">Transactions</li>
                            <li class="menu__item" id="header-categories">Categories</li>
                            <li class="menu__item" id="header-statistics">Statistics</li>
                        </ul>
                    </nav>
                </div>
                <div class="user-block">
                    <img src="images/user.png" class="user-block__img"/>
                    <div class="user-block__title" id="header-username">${user ? user.displayName : username}</div>
                    <button class="button_logout" id="header-logout">Log out</button>
                </div>
            `
        } else {
            headerView = `
                <div class="user-block">
                    <nav class="menu">
                        <ul class="menu__list">
                            <li class="menu__item" id="header-login">Log In</li>
                            <li class="menu__item" id="header-signup">Sign Up</li>
                        </ul>
                    </nav>
                </div>   
            `
        }
        let view =  /*html*/`
            <header class="header header-space">
                <div class="logo">
                    <img class="logo__img" src="../../images/credit-card.png" width="40px" height="40px"/>
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
            const categoriesButton = document.getElementById("header-categories");
            categoriesButton.onclick = () => {
                Router._instance.navigate("/categories");
            }

            const statisticsButton = document.getElementById("header-statistics");

            const logoutButton = document.getElementById("header-logout");
            console.log(logoutButton);
            logoutButton.onclick = () => {
                firebase.auth().signOut();
                Router._instance.navigate("/login")
            };

            const usernameButton = document.getElementById("header-username");
            usernameButton.onclick = () => {
              Router._instance.navigate("/profile");
            };

        } else {
            const loginButton = document.getElementById("header-login");
            const registerButton = document.getElementById("header-signup");

            loginButton.onclick = () => {
                Router._instance.navigate("/login");
            };

            registerButton.onclick = () => {
                Router._instance.navigate("/register");
            };
        }

    }
}
export default header;