import {Router} from "../router.js";
import {parseFrom} from "../helpers/parseForm.js";

let RegisterPage = {
    render: async () => {
        let view =  /*html*/`
            <div class="content">
                <form class="form">
                    <div class="form__header">
                        <h3 class="form_title">Create a free account</h3>
                    </div>
                    <div>
                        <div class="edit-box">
                            <input required name="email" type="email" class="edit-box__input" placeholder="E-mail">
                        </div>
                        <div class="edit-box">
                            <input required name="pass" type="password" min="6" class="edit-box__input" placeholder="Password">
                        </div>
                        <div class="edit-box">
                            <input required name="repeat-pass" type="password" min="6" class="edit-box__input" placeholder="Repeat Password">
                        </div>
                    </div>
                    <div class="form__footer">
                        <button class="form__button form__button-large">Register</button>
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
            if (formValues["pass"] != formValues["repeat-pass"]) {
                alert("Passwords do not match!")
            } else {
                registerUser(formValues["email"], formValues["pass"]);
            }
        });
    }
}

function registerUser(email, pass) {
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, pass)
        .then(() => {
            Router._instance.navigate("/");
        })
        .catch(error => {
            console.error(error);
        })
}

export default RegisterPage;