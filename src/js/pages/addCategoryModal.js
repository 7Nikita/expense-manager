import {firebaseService} from "../services/index.js";
import {closeModal} from "../services/modalService.js";

let AddCategoryModal = {
    render: async () => {
        let view =  /*html*/`
            <div class="content">
                <form class="form">
                    <div class="form__header">
                        <h3 class="form_title">Add</h3>
                    </div>
        
                    <div class="edit-box">
                        <input id="category-title" type="text" class="edit-box__input" placeholder="Title">
                    </div>
        
                    <div class="edit-box">
                        <input id="category-desc" type="text" class="edit-box__input" placeholder="Description">
                    </div>
        
                    <div class="dropdown">
                        <button class="dropdown__btn">Color</button>
                        <div class="dropdown__content">
                            <button class="dropdown__item">Color 1</button>
                            <button class="dropdown__item">Color 2</button>
                            <button class="dropdown__item">Color 3</button>
                        </div>
                    </div>
        
                    <div class="form__footer">
                        <button id="add-category-button" class="form__button">Add</button>
                    </div>
                </form>
            </div>
        `
        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;
        const titleInput = document.getElementById("category-title");
        const descInput = document.getElementById("category-desc");
        const form = document.querySelector("form");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            await firebaseService.writeCategory(user, titleInput.value, descInput.value, null);
            closeModal();
        });
    }
}
export default AddCategoryModal;