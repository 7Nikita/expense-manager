export function generateDataForChart(categoriesAmount, categories) {
    return {
        datasets: [{
            data: Object.values(categoriesAmount),
            backgroundColor: Object.keys(categoriesAmount).map(key => categories[key].color),

        }],
        labels: Object.keys(categoriesAmount).map(key => categories[key].title),
    }
}
