export const chartComponent = (stat) => { return `
                    <div class="m-stat__title">
                            <h3>Income</h3>
                        </div>
                        <div class="m-stat__main">
                            <div class="diagram">
                                <div class="diagram__main">
                                    <canvas id="income-chart"></canvas>
                                    <div class="m-stat__text">
                                        <div class="b-text b-text-green">
                                            <div class="b-text__item">${stat["incomeAmount"]}</div>
                                            <div class="b-text__item">Total Income</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-stat__title">
                            <h3>Expense</h3>
                        </div>
                        <div class="m-stat__main">
                            <div class="diagram">
                                <div class="diagram__main">
                                    <canvas id="expense-chart"></canvas>
                                    <div class="m-stat__text">
                                        <div class="b-text b-text-red">
                                            <div class="b-text__item">${stat["expenseAmount"]}</div>
                                            <div class="b-text__item">Total Expense</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            `;
}