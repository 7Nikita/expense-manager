import {firebaseService} from "../services/index.js";
import {closeModal} from "../services/modalService.js";
import {selectCategoryComponent} from "../components/selectCategoryComponent.js";
import {Transaction} from "../models/transaction.js";

let AddTransactionModal = {
    render: async () => {
        let user = firebase.auth().currentUser;
        let categories = await firebaseService.getCategoriesList(user);
        let view =  /*html*/`
            <div class="content">
                <form class="form">
                    <span class="close-button" id="transaction-close-button">&times;</span> 
                    <div class="form__header">
                        <h3 class="form_title">Add</h3>
                    </div>
                    <div class="edit-box">
                        <input required type="text" class="edit-box__input" id="transaction-amount" placeholder="Amount">
                    </div>
                    <div class="edit-box">
                        <input required type="text" class="edit-box__input" id="transaction-place" placeholder="Place">
                    </div>
                    <div class="edit-box">
                        ${await selectCategoryComponent("edit-box__input", categories).render()}
                    </div>
                    <div class="edit-box">
                        <input required type="text" class="edit-box__input" id="transaction-description" placeholder="Description">
                    </div>
                    <div class="form__radio">
                        <div class="radio-btn">
                            <input type="radio" id="choice1" name="drone" value="income" checked class="radio-btn__input">
                            <label for="choice1" class="radio-btn__text">Income</label>
                        </div>
        
                        <div class="radio-btn">
                            <input type="radio" id="choice2" name="drone" value="expense" class="radio-btn__input">
                            <label for="choice2" class="radio-btn__text">Expense</label>
                        </div>
                    </div>
                    <div class="form__center-item">
                        <div class="b-date">
                            <img class="b-date__img" src="../../images/calendar.png"/>
                            <div class="b-date__picker">
                                <input required id="transaction-date-picker" type="date"/>
                            </div>
                        </div>
                    </div>
                    <div class="form__center-item">
                        <div class="choose-file">
                            <input type="file" accept="image/*" name="file" id="file" class="choose-file__input">
                            <label for="file" class="choose-file__label">
                                <i class="far fa-file-image"></i>
                                <span class="js-fileName">Choose image</span>
                            </label>
                        </div>
                    </div>
                    <div class="form__footer">
                        <button class="form__button">Add</button>
                    </div>
                </form>
            </div>
        `
        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;
        const transactionAmountInput = document.getElementById("transaction-amount");
        const transactionPlaceInput = document.getElementById("transaction-place");
        const transactionDescriptionInput = document.getElementById("transaction-description");
        const categorySelector = document.getElementById("category-selector");
        const transactionDatePicker = document.getElementById("transaction-date-picker");
        const incomeRadioButton = document.getElementById("choice1");
        const expenseRadioButton = document.getElementById("choice2");
        const imagePicker = document.getElementById("file");
        const form = document.querySelector("form");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const type = incomeRadioButton.checked ? "income" : "expense";
            const transaction = new Transaction({
                    amount: parseInt(transactionAmountInput.value),
                    place: transactionPlaceInput.value,
                    description: transactionDescriptionInput.value,
                    category_id: categorySelector.options[categorySelector.selectedIndex].id,
                    date: transactionDatePicker.value,
                    type: type,
                    image: imagePicker.files[0],
                }
            );
            await firebaseService.writeTransaction(user, transaction);
            closeModal();
        });
        const transactionCloseButton = document.getElementById("transaction-close-button");
        transactionCloseButton.addEventListener("click", (event) => {
            event.preventDefault();
            closeModal();
        });
    }

}
export default AddTransactionModal;