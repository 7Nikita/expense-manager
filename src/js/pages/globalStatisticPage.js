import {Router} from "../router.js";
import {chartComponent} from "../components/chartComponent.js"
import {getTransactionDateStatistic} from "../helpers/getTransactionsDateStatistic.js";
import {firebaseService} from "../services/index.js";
import {generateDataForChart} from "../helpers/generateDataForChart.js";
import {generatePieChart} from "../helpers/generatePieChart.js";

let GlobalStatisticPage = {
    render: async () => {
        let view =  /*html*/`
            <div class="header__category">
                <nav class="menu">
                    <ul class="menu__list">
                        <li class="menu__item">Global</li>
                        <li class="menu__item" id="statistic-category-button">Categories</li>
                    </ul>
                </nav>
            </div>
            
        <div class="m-stat">
                <form id="datepicker-form">
                    <div class="m-stat__date">
                        <div class="b-date">
                            <img class="b-date__img" src="../../images/calendar.png"/>
                            <div class="b-date__picker">
                                <input required id="from-date" type="date"/>
                            </div>
                            <div class="b-date__separator"></div>
                            <div class="b-date__picker">
                                <input required id="to-date" type="date"/>
                            </div>
                        </div>
                        <div class="stathead__item">
                            <button class="stathead__button" type="submit">Apply</button>
                        </div>
                    </div>
                </form>
                <div id="chart-container">
                </div>
        </div>
        `
        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;
        const statisticCategoryButton = document.getElementById("statistic-category-button");
        statisticCategoryButton.onclick = () => {
            Router._instance.navigate("/statistics/category");
        }
        const chartContainer = document.getElementById("chart-container");
        const datePickerForm = document.getElementById("datepicker-form");
        const fromDate = document.getElementById("from-date");
        const toDate = document.getElementById("to-date");
        datePickerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const stat = await getTransactionDateStatistic(user, fromDate.value, toDate.value);
            const categories = await firebaseService.getCategoriesDict(user);
            chartContainer.innerHTML = chartComponent(stat);
            const incomeChartCanvas = document.getElementById("income-chart");
            const expenseChartCanvas = document.getElementById("expense-chart");
            generatePieChart(incomeChartCanvas, generateDataForChart(stat["incomeTransactions"], categories));
            generatePieChart(expenseChartCanvas, generateDataForChart(stat["expenseTransactions"], categories));
        });
    }
}
export default GlobalStatisticPage;