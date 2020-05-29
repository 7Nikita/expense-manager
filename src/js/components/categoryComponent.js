export const categoryComponent = (content) => ({

        render: async (category) => {
            let view =  /*html*/`
                    <div class="transaction transaction-back-red">
                        <div class="head-block">
                            <span class="head-block__title">${category["title"]}</span>
                            <div class="head-block__right-corner">
                                <button class="head-block__btn"><i class="fas fa-edit"></i></button>
                                <button class="head-block__btn"><i class="fas fa-trash"></i></button>
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
)
export default categoryComponent;