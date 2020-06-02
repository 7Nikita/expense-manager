let HomePage = {
    render: async () => {
        let view =  /*html*/`
            <section class="center-title">
                <h1> Welcome to $PENDER </h1>
            </section>
        `
        return view;
    },
    after_render: async () => {
    }
}
export default HomePage;