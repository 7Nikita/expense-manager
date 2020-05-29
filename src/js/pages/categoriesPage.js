import CategoryComponent from "../components/categoryComponent.js"
import {firebaseService} from "../services/index.js";
import AddCategoryModal from "../pages/addCategoryModal.js"
import {presentModal} from "../services/modalService.js";

let CategoriesPage = {
    render: async () => {
        let user = firebase.auth().currentUser;
        let categories = Object.values(await firebaseService.getCategories(user) ?? []);

        let createCategoryTable = async (categories) => {
            let innerView = ``;
            for (const category of categories) {
                const categoryComponent = CategoryComponent();
                innerView += await categoryComponent.render(category);
                await categoryComponent.after_render();

            }
            return innerView
        }

        let view =  /*html*/`
            <div class="content">
                <div class="table">
                    <div class="table__main">
                        ${await createCategoryTable(categories)}
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
        const addCategoriesButton = document.getElementById("add-categories-button");
        addCategoriesButton.onclick = () => {
            presentModal(AddCategoryModal);
        }
    }
}
export default CategoriesPage;