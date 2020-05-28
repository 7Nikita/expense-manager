import {Router} from "../router.js";
import {parseFrom} from "../helpers/parseForm.js";
import {firebaseService} from "../services/index.js";

let RegisterPage = {
    render: async () => {
        let view =  /*html*/`
            <div class="content">
                <form class="form">
                    <div class="form__header">
                        <h3 class="form_title">Create a free account</h3>
                    </div>
                    <div class="form__main-table">
                        <div class="edit-box">
                            <input required name="email" type="email" class="edit-box__input" placeholder="E-mail">
                        </div>
                        <div class="edit-box">
                            <input required name="username" type="text" class="edit-box__input" placeholder="Username">
                        </div>
                        <div class="edit-box">
                            <input required name="pass" type="password" minlength="6" class="edit-box__input" placeholder="Password">
                        </div>
                        <div class="edit-box">
                            <input required name="name" type="text" class="edit-box__input" placeholder="First Name">
                        </div>
                        <div class="edit-box">
                            <input required name="repeat-pass" type="password" minlength="6" class="edit-box__input" placeholder="Repeat Password">
                        </div>
                        <div class="edit-box">
                            <input required name="surname" type="text" class="edit-box__input" placeholder="Last Name">
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
                alert("Passwords do not match!");
            } else {
                registerUser(formValues);
            }
        });
    }
}

function registerUser(values) {
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(values["email"], values["pass"])
        .then((res) => {
            return res.user.updateProfile({displayName: values["username"]})
                .then(() => {
                    firebaseService.writeUserData(auth.currentUser, values["email"], values["username"], values["name"], values["surname"]);
                    localStorage.setItem("username", values["username"])
                    Router._instance.navigate("/profile");
                })
        }).catch(error => {
            alert(error);
        });
}

export default RegisterPage;