import CategoryComponent from "../components/categoryComponent.js"
import {firebaseService} from "../services/index.js";
import AddCategoryModal from "../pages/addCategoryModal.js"
import {presentModal} from "../services/modalService.js";

let CategoriesPage = {
    render: async () => {
        let view =  /*html*/`
            <div class="content">
                <div class="table">
                    <div class="table__main">
                    </div>
                </div>
            </div>
            <div class="table__footer">
                <button id="add-categories-button" class="table__add-btn"><i class="fas fa-plus"></i></button>
            </div>
        `
        return view;
    },
    after_render: async () => {

        const tableMain = document.querySelector(".table__main");
        let user = firebase.auth().currentUser;
        // let categories = Object.values(await firebaseService.getCategories(user) ?? []);

        firebaseService.getCategories(user, async (data) => {
            if (!data.length) { return; }
            let innerView = ``;
            for (const category of data) {
                const categoryComponent = CategoryComponent(category);
                innerView += await categoryComponent.render();
                await categoryComponent.after_render();
            }
            tableMain.innerHTML = innerView;
        });

        const addCategoriesButton = document.getElementById("add-categories-button");
        addCategoriesButton.onclick = () => {
            presentModal(AddCategoryModal);
        }
        tableMain.addEventListener("click", async (event) => {
            if (event.target.className.includes("fas fa-trash")) {
                const categoryUid = event.target.getAttribute("data-href");
                const user = firebase.auth().currentUser;
                await firebaseService.removeCategory(user, categoryUid);
            }
        });
    }
}
export default CategoriesPage;