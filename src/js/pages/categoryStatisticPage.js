import {firebaseService} from "../services/index.js";
import {categoryStatisticComponent} from "../components/categoryStatisticComponent.js";
import {getCategoryStatistic} from "../helpers/getCategoryStatistic.js";
import {selectCategoryComponent} from "../components/selectCategoryComponent.js";
import {Router} from "../router.js";

let CategoryStatisticPage = {
    render: async () => {
        let user = firebase.auth().currentUser;
        let categories = await firebaseService.getCategoriesList(user);
        let view =  /*html*/`
            <div class="header__category">
                <nav class="menu">
                    <ul class="menu__list">
                        <li class="menu__item" id="statistic-category-global">Global</li>
                        <li class="menu__item">Categories</li>
                    </ul>
                </nav>
            </div>
            
            <form class="stathead">
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
                        ${await selectCategoryComponent("edit-box__input", categories).render()}
                </div>
                <div class="stathead__item">
                    <button class="stathead__button" type="submit">Apply</button>
                </div>
            </form>
            <div id="statistic-container">
            </div>
        `
        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;
        const form = document.querySelector(".stathead");
        const statisticContainer = document.getElementById("statistic-container");
        const fromDate = document.getElementById("from-date");
        const toDate = document.getElementById("to-date");
        const categorySelector = document.getElementById("category-selector");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const selectedCategoryId = categorySelector.options[categorySelector.selectedIndex].id;
            const stat = await getCategoryStatistic(user, fromDate.value, toDate.valueOf,  selectedCategoryId);
            statisticContainer.innerHTML = await categoryStatisticComponent(stat);
        });

        const statisticCategoryGlobal = document.getElementById("statistic-category-global");
        statisticCategoryGlobal.onclick = () => {
            Router._instance.navigate("/statistics/global");
        }

    }
}
export default CategoryStatisticPage;