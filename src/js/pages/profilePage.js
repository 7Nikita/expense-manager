let user;

let ProfilePage = {
    render: async () => {
        user = firebase.auth().currentUser;
        let view =  /*html*/`
            <div class="content">
                <div class="card">
                    <fieldset class="card_element">
                        <img class="card_element_img" src="./images/profile-pic.jpeg" alt="" height="300" width="300">
                    </fieldset>
        
                    <fieldset class="card_element">
                        <h3 class="card_element_title">${user.email}</h3>
                        <div>
                            <div class="definition">
                                <div class="definition_title">Email:</div>
                                <div class="definition_description">${user.email}</div>
                            </div>
                        </div>
       
                    </fieldset>
                </div>
            </div>
        `
        return view;
    },
    after_render: async () => {
    }
}

export default ProfilePage;