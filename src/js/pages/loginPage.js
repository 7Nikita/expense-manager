import {Router} from "../router.js";
import {parseFrom} from "../helpers/parseForm.js";

let LoginPage = {
    render: async () => {
        let view =  /*html*/`
                <div class="content">
                    <form class="form">
                        <div class="form__header">
                            <h3 class="form_title">Log In</h3>
                        </div>
            
                        <div class="edit-box">
                            <input required name="email" type="text" class="edit-box__input" placeholder="E-mail">
                        </div>
            
                        <div class="edit-box">
                            <input required name="pass" type="password" class="edit-box__input" placeholder="Password">
                        </div>
            
                        <div class="form__footer">
                            <button class="form__button">Log In</button>
                        </div>
                    </form>
                </div>
        `
        return view;
    },
    after_render: async () => {
        let form = document.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let formValues = parseFrom(form);
            loginUser(formValues["email"], formValues["pass"]);
        });
    }
}

function loginUser(email, pass) {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            Router._instance.navigate("/profile");
        })
        .catch(error => {
            alert(error);
        });
}

export default LoginPage;