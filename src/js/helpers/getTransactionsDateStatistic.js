import {firebaseService} from "../services/index.js";

export async function getTransactionDateStatistic(user, fromDate, toDate) {
    const transactions = await firebaseService.getTransactionsFromDate(user, fromDate);
    var incomeTransactions = {};
    var incomeAmount = 0;
    var expenseTransactions = {};
    var expenseAmount = 0;
    for (const transaction of transactions) {
        if (transaction["date"] <= toDate) {
            if (transaction["type"] == "income") {
                incomeAmount += transaction["amount"];
                if (!incomeTransactions[transaction["category_id"]]) {
                    incomeTransactions[transaction["category_id"]] = transaction["amount"];
                } else {
                    incomeTransactions[transaction["category_id"]] += transaction["amount"];
                }
            } else {
                expenseAmount += transaction["amount"]
                if (!expenseTransactions[transaction["category_id"]]) {
                    expenseTransactions[transaction["category_id"]] = transaction["amount"];
                } else {
                    expenseTransactions[transaction["category_id"]] += transaction["amount"];
                }
            }
        }
    }

    return {
        "incomeTransactions": incomeTransactions,
        "incomeAmount": incomeAmount,
        "expenseTransactions": expenseTransactions,
        "expenseAmount": expenseAmount,
    };
}