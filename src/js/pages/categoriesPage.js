import CategoryComponent from "../components/categoryComponent.js"
import {firebaseService} from "../services/index.js";
import AddCategoryModal from "../pages/addCategoryModal.js"
import {presentModal} from "../services/modalService.js";

let CategoriesPage = {
    render: async () => {
        let view =  /*html*/`
            <div class="content">
                <div class="table">
                    <ul class="table__main"></ul>
                </div>
                <div class="table__footer">
                    <button id="add-categories-button" class="table__add-btn"><i class="fas fa-plus"></i></button>
                </div>
            </div>
        `
        return view;
    },
    after_render: async () => {

        const tableMain = document.querySelector(".table__main");
        const user = firebase.auth().currentUser;

        firebaseService.getCategories(user, async (data) => {
            let innerView = ``;
            if (!data.length) {
                tableMain.innerHTML = innerView;
                return;
            }
            for (const category of data) {
                const categoryComponent = CategoryComponent(category);
                innerView += await categoryComponent.render();
                await categoryComponent.after_render();
            }
            tableMain.innerHTML = innerView;
        });

        const addCategoriesButton = document.getElementById("add-categories-button");
        addCategoriesButton.addEventListener("click", () => {
            presentModal(AddCategoryModal);
        });
        tableMain.addEventListener("click", async (event) => {
            if (event.target.className.includes("head-block__btn")) {
                const categoryUid = event.target.getAttribute("data-href");
                await firebaseService.removeCategory(user, categoryUid);
            } else if (event.target.className.includes("fas fa-trash")) {
                const categoryUid = event.target.parentNode.getAttribute("data-href");
                await firebaseService.removeCategory(user, categoryUid);
            }
        });
    }
}
export default CategoriesPage;