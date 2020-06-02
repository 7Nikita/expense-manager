import {firebaseService} from "../services/index.js";

export async function getCategoryStatistic(user, fromDate, toDate, categoryId) {
    const transactions = await firebaseService.getTransactionsFromCategory(user, categoryId);
    var incomeTransactions = [];
    var incomeAmount = 0;
    var expenseTransactions = [];
    var expenseAmount = 0;
    for (const transaction of transactions) {
        if (fromDate <= transaction["date"] && transaction["date"] <= toDate) {
            if (transaction["type"] == "income") {
                incomeTransactions.push(transaction);
                incomeAmount += transaction["amount"];
            } else {
                expenseTransactions.push(transaction);
                expenseAmount += transaction["amount"];
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