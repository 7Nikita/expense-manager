export const categoryComponent = (category) => {
    return {
        render: async () => {
            let view =  /*html*/`
                    <div class="transaction" style="background: ${category["color"]};">
                        <div class="head-block">
                            <span class="head-block__title">${category["title"]}</span>
                            <div class="head-block__right-corner">
                                <button class="head-block__btn" id="category-component-delete" data-href="${category["uid"]}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>

                        </div>
                        <div class="transaction__main transaction__main-center">
                            <p class="transaction__text">${category["description"]}</p>
                        </div>
                    </div>
            `;
            return view;
        },
        after_render: async () => {
        }
    }
}

export default categoryComponent;