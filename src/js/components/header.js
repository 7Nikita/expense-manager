import {Router} from "../router.js";

let header = {
    render: async () => {
        let user = firebase.auth().currentUser;
        let username = localStorage.getItem("username");
        let headerView;
        if (user) {
            headerView = `
                <div class="user-block">
                    <img src="images/user.png" class="user-block__img"/>
                    <div class="user-block__title">${user ? user.displayName : username}</div>
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
            return;
        }

        const loginButton = document.getElementById("header-login");
        const registerButton = document.getElementById("header-signup");

        loginButton.onclick = () => {
            Router._instance.navigate("/login");
        }

        registerButton.onclick =() => {
            Router._instance.navigate("/register");
        }
    }
}
export default header;