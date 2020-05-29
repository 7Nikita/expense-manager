class FirebaseService {
    async readUserData({uid}) {
        const snapshot = await firebase.database().ref("users/").child(uid).once("value");
        const data = snapshot.val();
        return data;
    }

    usersRef() {
        return firebase.database().ref("/users");
    }

    async writeUserData({uid}, email, username, name, surname) {
        await this.usersRef().child(uid).set(
            {
                email: email,
                username: username,
                name: name,
                surname: surname,
            }
        );
    }

    categoryRef(uid) {
        return firebase.database().ref(`/category${uid}`);
    }

    async writeCategory({uid}, title, description, color) {
        /*
            Path is `/expense${uid}`, nor /expense/${uid}, because firebase
            can't add a new node to the list. In this way we need to copy
            already existing nodes and add the new one.
            When we remove one nesting level, we can just add new node
            to the list.
         */
        await this.categoryRef(uid).push(
            {
                title,
                description,
            }
        );
    }

    async getCategories({uid}) {
        const snapshot = await this.categoryRef(uid).once("value");
        const data = snapshot.val();
        return data;
    }

}

export default FirebaseService;