import {firebaseService} from "../services/index.js";
import {presentModal} from "../services/modalService.js";
import AddTransactionModal from "../pages/addTransactionModal.js"
import TransactionComponent from "../components/transactionComponent.js";


let TransactionsPage = {
    render: async () => {
        let view =  /*html*/`
            <div>
                <div class="content">
                    <div class="table">
                        <ul class="table__main">
                        </ul>
                    </div>
                    <div class="table__footer">
                        <button class="table__add-btn" id="add-transaction-button"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
        `
        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;
        const tableMain = document.querySelector(".table__main");

        firebaseService.getTransactions(user, async (data) => {
            let innerView = ``;
            if (!data.length) {
                tableMain.innerHTML = innerView;
                return;
            }
            for (const transaction of data) {
                const transactionComponent = TransactionComponent(transaction);
                innerView += await transactionComponent.render();
                await transactionComponent.after_render();
            }
            tableMain.innerHTML = innerView;
        });

        const addTransactionsButton = document.getElementById("add-transaction-button");
        addTransactionsButton.addEventListener("click", () => {
            presentModal(AddTransactionModal);
        });

        tableMain.addEventListener("click", async (event) => {
            if (event.target.className.includes("head-block__btn")) {
                const transactionUid = event.target.getAttribute("data-href");
                await firebaseService.removeTransaction(user, transactionUid);
            } else if (event.target.className.includes("fas fa-trash")) {
                const transactionUid = event.target.parentNode.getAttribute("data-href");
                await firebaseService.removeTransaction(user, transactionUid);
            }
        });
    }
}
export default TransactionsPage;