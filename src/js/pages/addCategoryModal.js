import {firebaseService} from "../services/index.js";
import {closeModal} from "../services/modalService.js";
import {Category} from "../models/category.js";

let AddCategoryModal = {
    render: async () => {
        let view =  /*html*/`
            <div class="content">
                <form class="form">
                    <span class="close-button" id="category-close-button">&times;</span> 
                    <div class="form__header">
                        <h3 class="form_title">Add</h3>
                    </div>
        
                    <div class="edit-box">
                        <input required id="category-title" type="text" class="edit-box__input" placeholder="Title">
                    </div>
        
                    <div class="edit-box">
                        <input required id="category-desc" type="text" class="edit-box__input" placeholder="Description">
                    </div>
        
                    <div class="edit-box">
                        <input required id="category-color" type="color" class="edit-box__input" value="#e66465">
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
        const colorInput = document.getElementById("category-color");
        const form = document.querySelector("form");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const category = new Category(
                {
                    title: titleInput.value,
                    description: descInput.value,
                    color: colorInput.value
                }
            );

            await firebaseService.writeCategory(user, category);
            closeModal();
        });

        const categoryCloseButton = document.getElementById("category-close-button");
        categoryCloseButton.addEventListener("click", (event) => {
            event.preventDefault();
            closeModal();
        });
    }
}
export default AddCategoryModal;