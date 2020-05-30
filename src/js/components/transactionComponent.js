import {firebaseService} from "../services/index.js";

export const transactionComponent = (transaction) => {
    return {
        render: async () => {
            let user = firebase.auth().currentUser;
            let categories = await firebaseService.getCategoriesDict(user);
            let isIncome = transaction["type"] == "income";
            let view =  /*html*/`
                <li class="transaction" style="background: ${categories[transaction["category_id"]]["color"]};">
                    <div class="head-block">
                        <span class="head-block__title ${isIncome ? "head-block__title-green" : "head-block__title-red"}">
                                ${isIncome ? "+" : "-"}${transaction["amount"]}
                        </span>
                            <div class="head-block__right-corner">
                                <button class="head-block__btn"><i class="fas fa-trash" data-href="${transaction["uid"]}"></i></button>
                            </div>
                    </div>
                    <div class="transaction__main">
                            <div>
                                <div class="transaction__text">${transaction["place"]}</div>
                                <div class="transaction__text">${transaction["description"]}</div>
                                <div class="transaction__text">${transaction["date"]}</div>
                            </div>
                            <div>
                                <img src="../../images/documents.png" width="100px">
                            </div>
                    </div>
                </li>
            `;
            return view;
        },
        after_render: async () => {
        }
    }
}

export default transactionComponent;