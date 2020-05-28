let CategoriesPage = {
    render: async () => {
        let view =  /*html*/`
            <div class="table__footer">
                <button class="table__add-btn"><i class="fas fa-plus"></i></button>
            </div>
        `
        return view;
    },
    after_render: async () => {
    }
}
export default CategoriesPage;