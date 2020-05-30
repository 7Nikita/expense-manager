export const selectCategoryComponent = (className, options) => {

    function setOptions(items) {
        let view = ``;
        for (const item of items) {
            view += `<option id="${item["uid"]}">${item["title"]}</option>`
        }
        return view;
    }

    return {
        render: async () => {
            let view =  /*html*/`
                <select class="${className}" id="category-selector">${setOptions(options)}</select>
            `;
            return view;
        },
        after_render: async (category) => {
        }
    }
}

export default selectCategoryComponent;