import {firebaseService} from "../services/index.js";

export const transactionStatisticComponent = (transaction) => {
    return {
        render: async () => {
            let isIncome = transaction["type"] == "income";
            let imageLink = transaction["image"] ? await firebaseService.retrieveImage(transaction["image"]) : "../../images/documents.png";
            let view =  /*html*/`
                    <div class="transaction ${isIncome ? "transaction-back-green" : "transaction-back-red"}">
                        <div class="head-block">
                            <span class="head-block__title">${transaction["amount"]}</span>
                        </div>
                        <div class="transaction__main">
                            <div>
                                <div class="transaction__text">${transaction["place"]}</div>
                                <div class="transaction__text">${transaction["description"]}</div>
                                <div class="transaction__text">${transaction["date"]}</div>
                            </div>
                            <div>
                                <img class="rounded__image" src="${imageLink}" height="82px" width="82px">
                            </div>
                        </div>
                    </div>
            `;
            return view;
        },
        after_render: async () => {
        }
    }
}

export default transactionStatisticComponent;