import {transactionStatisticComponent} from "./transactionStatisticComponent.js";

export const categoryStatisticComponent = async (statistic) => {

    let generateTransactionComponents = async (transactions) => {
        let innerView = ``;
        for (const transaction of transactions) {
            innerView += await transactionStatisticComponent(transaction).render();
        }
        return innerView
    }

    return `
        <div class="content">
            <div class="table">
                <div class="table__title">
                    <div class="b-text b-text-green">
                        <p class="b-text__item">${statistic["incomeAmount"]}<br>
                            Total Income</p>
                    </div>
                </div>
                <div class="table__main">
                    ${await generateTransactionComponents(statistic["incomeTransactions"])}
                </div>
            </div>
            <div class="table">
                <div class="table__title">
                    <div class="b-text b-text-red">
                        <p class="b-text__item">${statistic["expenseAmount"]}<br>
                            Total expense</p>
                    </div>
                </div>
                <div class="table__main">
                    ${await generateTransactionComponents(statistic["expenseTransactions"])}
                </div>
            </div>
        </div>
    `;
}